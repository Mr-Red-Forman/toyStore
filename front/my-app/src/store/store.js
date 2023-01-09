import { combineReducers, legacy_createStore as createStore } from 'redux'


const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()


const rootReducer = combineReducers({
   
})


export const store = createStore(rootReducer, middleware)
