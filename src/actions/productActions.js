import { FETCH_PRODUCTOS, FILTRAR_PRODUCTOS_POR_TALLA, ORDENAR_PRODUCTOS_POR_PRECIO } from "../types"

export const fetchProductos = () => async (dispatch)=>{
    const res = await fetch("/api/productos");
    const data = await res.json();
    dispatch({type: FETCH_PRODUCTOS,
            payload: data});
};

export const filtrarProductos = (productos,talla) => (dispatch)=>{

    dispatch({
        type:FILTRAR_PRODUCTOS_POR_TALLA,
        payload:{
            talla:talla,
            productos: talla === ""? productos:
            productos.filter(x => x.tallasDisponibles.indexOf(talla)>=0)
        }
    });             
};  

export const ordenarProductos = (productosFiltrados, ordenar) => (dispatch) => {
    
    const productosOrdenados = productosFiltrados.slice();

    switch (ordenar) {
      case 'menorPrecio':
        productosOrdenados.sort((a,b)=>a.precio-b.precio);
        break
      case 'mayorPrecio':
        productosOrdenados.sort((a,b)=>b.precio-a.precio);
        break;
      default:
        productosOrdenados.sort((a,b)=> a._id<b._id?-1:1) ;
        break;
    }
    
    dispatch({
        type: ORDENAR_PRODUCTOS_POR_PRECIO,
        payload: {
            ordenar: ordenar,
            productos: productosOrdenados
        }
    })

}