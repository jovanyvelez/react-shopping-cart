import React, { Component } from 'react'
import formatCurrency from '../util'

export default class Carrito extends Component {
    render() {
        const {productosCarrito}= this.props
        return (
            <div>
                <div>
                    {productosCarrito.length === 0?<div className= "carro carro-encabezado">No hay compras</div>
                    : <div className= "carro carro-encabezado">Seleccionados {productosCarrito.length} productos {" "}</div>}   
                </div>

                <div className="carro">
                    <ul className="carro-articulos">
                        {productosCarrito.map(producto=>(
                            <li key={producto._id}>
                                <div>
                                    <img src={producto.imagen} alt={producto.nombre}></img>  
                                </div>
                                <div>
                                    <div>
                                        {producto.nombre}
                                    </div>
                                    <div className="rigth">
                                        {formatCurrency(producto.precio)} x {producto.cantidad} {" "}
                                        <button onClick={()=> this.props.sacarDelCarrito(producto)}>
                                            Quitar
                                        </button>
                                    </div>                                    
                                </div>
                            </li>
                        ))}
                    </ul>  
                </div>
                {productosCarrito.length !== 0 && (
                    <div className="carro">
                        <div className="total">
                            <div>
                                Total:{" "} {formatCurrency(
                                    productosCarrito.reduce( (a,c) => a+(c.precio*c.cantidad), 0)
                                )}
                            </div>   
                        </div>
                        <button className="button primary">
                            Comprar
                        </button>
                    </div> 
                )}            
            </div>
        )
    }
}
