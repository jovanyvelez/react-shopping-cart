import { CREAR_ORDEN, LIMPIAR_ORDEN } from "../types";


const ordenReducer = (state={}, action)=>{
    switch(action.type){
        case CREAR_ORDEN:
            return {orden: action.payload}
        case LIMPIAR_ORDEN:
            return {orden: null}
        default:
            return state
            
    }
}

export {ordenReducer}