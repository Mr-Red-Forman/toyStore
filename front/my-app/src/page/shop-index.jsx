import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

import { useEffect } from 'react'

import { toyReducer } from "../store/toy.reducer"
import { store } from '../store/store'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, saveToy, removeToy } from '../store/toy.action'
import { CURRENT_FILTERBY,CURRENT_SORTBY } from '../store/toy.reducer.js'
import { toyService } from '../services/toyService'

import { ToyFilter } from '../cmps/toys-filter'
import { ToyList } from '../cmps/toy-list'
import { SortBy } from '../cmps/sortBy'


export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const filter = useSelector((storeState) => storeState.toyModule.filterBy)
    const sort = useSelector((storeState) => storeState.toyModule.sortBy)
    
    const dispatch = useDispatch()

    useEffect(() => {
        onLoadToys(filter)
    }, [filter, sort])

    function onLoadToys(filterBy = toyService.getDefaultFilter()) {
        loadToys(filterBy,sort)
            .then(() => {
                showSuccessMsg('Toys loaded')
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }

    function onAddToy(toyToSave = null) {
        toyToSave = !toyToSave ? toyToSave : toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function onSetFilter(filterBy) {
        store.dispatch({ type: CURRENT_FILTERBY, filterBy })
    }
    function onSetSort(sortBy) {
        store.dispatch({ type: CURRENT_SORTBY, sortBy })
    }

    // console.log('sort:', sort)

    return (
        // <h1>shopindex</h1>
        <main>
            <ToyFilter onSetFilter={onSetFilter} />
            <SortBy 
            sort={sort}
            onSetSort={onSetSort}
            />
            <button onClick={onAddToy}>Add random toy</button>


            {isLoading && <p>Loading...</p>}

            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
            />


        </main>
    )
}