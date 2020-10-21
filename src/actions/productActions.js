import { FETCH_PRODUCTOS } from "../types"

export const fetchProductos = () => async (dispatch)=>{

    const res = await fetch("/api/productos");
    const data = await res.json();
    dispatch({type: FETCH_PRODUCTOS,
            payload: data});
}