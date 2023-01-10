import { toyService } from "../services/toyService.jsx";
import { store } from "./store.js";
import { SET_IS_LOADING, SET_TOYS, UPDATE_TOY,ADD_TOY, UNDO_REMOVE_TOY,REMOVE_TOY } from "./toy.reducer.js";


export function loadToys(filterBy, sortBy){
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy,sortBy)
        .then((toy)=> {
            store.dispatch({type: SET_TOYS, toy})
        })
        .catch(err => {
            console.log('Had issues loading toys', err)
            throw err
        })
        .finally(()=>{
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })

}


export function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save toy:', err)
            throw err
        })
}

export function removeToy(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId)
        .catch(err => {
            store.dispatch({ type: UNDO_REMOVE_TOY })
            console.log('Had issues Removing toy', err)
            throw err
        })
}