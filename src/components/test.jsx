import React, { Component } from 'react'
import formatCurrency from '../util'

export default class Products extends Component {
    render() {
        return (
            <div>
                <ul className="productos">
                    {this.props.productos.map(producto => (
                        <li key={producto._id}>
                            <div className="jcard">
                                <a href={"#" + producto._id}>
                                    <img className="jimagen" src={producto.imagen} alt={producto.nombre}/>
                                    <p>{producto.nombre}</p>
                                </a>
                                <div className="jcontainer">
                                    <div>{formatCurrency(producto.precio)}</div> 
                                    <button className="button primary" >
                                            Add To Cart
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
