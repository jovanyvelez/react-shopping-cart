const { FETCH_PRODUCTOS, ORDENAR_PRODUCTOS_POR_PRECIO, FILTRAR_PRODUCTOS_POR_TALLA } = require("../types");

export const productsReducer = (state={},action)=>{

    switch(action.type){
        case ORDENAR_PRODUCTOS_POR_PRECIO:
            return {...state,
                    ordenar: action.payload.ordenar,
                    productosFiltrados: action.payload.productos};
        case FILTRAR_PRODUCTOS_POR_TALLA:
            return {...state,
                talla: action.payload.talla,
                productosFiltrados: action.payload.productos};
        case FETCH_PRODUCTOS:
            return{productos: action.payload, productosFiltrados: action.payload};
        default:
            return state;
    }
} 