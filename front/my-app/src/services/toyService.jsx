import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
// const BASE_URL = 'toy/'

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
const toysName = ['Bicycle', 'train', 'doll', 'ball', 'kite', 'rubber', 'airplane']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy = getDefaultFilter(), sortBy) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            // console.log('toys:', toys)
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regex.test(toy.vendor))
            }
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }

            // if (filterBy.labels) {
                if (filterBy.labels?.length > 0) {
                    toys = toys.filter(toys => {
                        return toys.labels.some(r=> filterBy.labels.indexOf(r) >= 0)
                        })
                    
                }
            // }
            if (sortBy.by && toys.length>0){
                if (typeof(toys[0][sortBy.by])==='string'){
                    // console.log('string:')
                    toys=toys.sort((b1, b2) => b1[sortBy.by.toLowerCase()].localeCompare(b2[sortBy.by.toLowerCase()]) * sortBy.descending)
                }else{
                    toys=toys.sort((b1, b2) => (b1[sortBy.by] - b2[sortBy.by]) * sortBy.descending)
                }
            }

            return toys
        }
        )
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    // return httpService.delete(BASE_URL + toyId)
    return storageService.remove(STORAGE_KEY, toyId)

}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
        // return httpService.put(BASE_URL, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        // return httpService.post(BASE_URL, toy)
        return storageService.post(STORAGE_KEY, toy)

    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: 0, labels: [] }
}
function getEmptyToy() {
    return {
        toy: '',
        price: 0,
        labels: [],
        inStock:0
    }
}

function getRandomToy() {
    return {
        toy: toysName.splice(utilService.getRandomIntInclusive(0, toysName.length - 1), 1).join(''),
        price: utilService.getRandomIntInclusive(0, 100),
        labels: labels.splice(utilService.getRandomIntInclusive(0, labels.length - 1), 1),
        createdAt: Date.now(),
        inStock: 10
    }
}
