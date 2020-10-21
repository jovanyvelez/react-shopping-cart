const { FETCH_PRODUCTOS } = require("../types");

export const productsReducer = (state={},action)=>{

    switch(action.type){
        case FETCH_PRODUCTOS:
            return{productos: action.payload};
        default:
            return state;
    }
} 