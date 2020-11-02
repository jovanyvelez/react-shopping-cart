import { AGREGAR_AL_CARRO, SACAR_DEL_CARRO} from "../types";

export const agregarAlCarro = (producto) => (dispatch, getState) => {
    
    const productosCarro = getState().carro.productosCarro.slice();
    let yaExiste = false;

    productosCarro.forEach( (x) => {
        if(x._id === producto._id){
            x.cantidad++;
            yaExiste = true;
        }
    });
    if(!yaExiste){
        productosCarro.push({...producto, cantidad:1});
    }
    
    dispatch({type: AGREGAR_AL_CARRO, payload:{productosCarro}});

    localStorage.setItem("productosCarro", JSON.stringify(productosCarro));
}

export const sacarDelCarro = (producto) => (dispatch, getState) => {
    const productosCarro = getState()
      .carro.productosCarro.slice()
        .filter((x)=> x._id !== producto._id);
    dispatch({ type: SACAR_DEL_CARRO, payload: { productosCarro } });
    localStorage.setItem("productosCarro", JSON.stringify(productosCarro));
}

