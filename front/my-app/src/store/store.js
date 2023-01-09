import { combineReducers, legacy_createStore as createStore } from 'redux'


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(): undefined


const rootReducer = combineReducers({
   
})


export const store = createStore(rootReducer, middleware)
