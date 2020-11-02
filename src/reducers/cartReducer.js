import { AGREGAR_AL_CARRO,SACAR_DEL_CARRO} from "../types";

export const cartReducer = (
    state = {productosCarro: JSON.parse(localStorage.getItem("productosCarro") || "[]")}, action) => {

    switch (action.type){
        case AGREGAR_AL_CARRO:
            return {productosCarro: action.payload.productosCarro };
        case SACAR_DEL_CARRO:
            return {productosCarro: action.payload.productosCarro };
        default:
            return state;
    }
}