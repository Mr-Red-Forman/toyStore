
export const SET_TOYS = 'SET_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const UPDATE_TOY = 'UPDATE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UNDO_REMOVE_TOY = 'UNDO_REMOVE_TOY'
export const CURRENT_FILTERBY = 'CURRENT_FILTERBY'
export const CURRENT_SORTBY = 'CURRENT_SORTBY'


const initialState = {
    toys:[],
    lastRemovedToy: null,
    isLoading: false,
    // filtrBy:toyService.getDefaultFilter()
    filterBy:{
        toy: '',
        price: 0,
        labels:[]
    },
    sortBy:{
        by:'toy',
        descending:1
    }
}

export function toyReducer(state = initialState, action) {

    let toys
    let lastRemovedToy

    switch (action.type) {
        case SET_TOYS:
            return {...state, toys:action.toy}
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        case REMOVE_TOY:
            lastRemovedToy = state.toys.find(c => c._id === action.toyId)
            toys = state.toys.filter(c => c._id !== action.toyId)
            return { ...state, toys, lastRemovedToy }

        case UNDO_REMOVE_TOY:
            ({ lastRemovedToy } = state)
            toys = [lastRemovedToy, ...state.toys]
            return { ...state, toys, lastRemovedToy: null }
            // ADD_TO_CART

        // filter
        case CURRENT_FILTERBY:
            return {...state, filterBy: action.filterBy}
        case CURRENT_SORTBY:
            return {...state, sortBy: action.sortBy}

    default:
        return state
    }

}