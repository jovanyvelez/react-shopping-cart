import { CREAR_ORDEN, LIMPIAR_CARRO, LIMPIAR_ORDEN } from "../types"

export const crearOrden = (orden) => (dispatch) => {

    fetch("/api/ordenes",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
            },
        body: JSON.stringify(orden)
    }).then((res)=>res.json())
    .then(data =>{
        dispatch({type: CREAR_ORDEN, payload: data})     
        localStorage.clear("productosCarro")
        dispatch({type: LIMPIAR_CARRO})
        
        })
}

export const limpiarOrden = () => (dispatch) => {
    dispatch({type: LIMPIAR_ORDEN})
}