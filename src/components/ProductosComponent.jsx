import React, { Component } from 'react'
import formatCurrency from '../util'

export default class Products extends Component {
    render() {
        return (
            <div>
                <ul className="productos">
                    {this.props.productos.map(producto => (
                        <li key={producto._id}>
                            <div className="producto">
                                <a href={"#" + producto._id}>
                                    <img src={producto.imagen} alt={producto.nombre}></img>
                                    <p>{producto.nombre}</p>
                                </a>
                                <div className="producto-precio">
                                    <div>{formatCurrency(producto.precio)}</div>
                                    <button onClick={()=>this.props.agregarAlCarrito(producto)} className="button primary" >
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </li>
                        ))
                    }
                </ul>
            </div>  
        )
    }
}
