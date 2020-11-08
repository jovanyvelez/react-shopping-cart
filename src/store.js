import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { productsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer'
import { ordenReducer } from './reducers/ordenReducers';

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(combineReducers({
                productos: productsReducer,
                carro: cartReducer,
                orden: ordenReducer
            }),
                initialState,
                composeEnhancer(applyMiddleware(thunk))
                );

export default store; 