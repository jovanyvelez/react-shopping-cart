import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'

export default class Carrito extends Component {

    constructor(props){
        super(props)
        this.state={
            nombre: "",
            email: "",
            direccion: "",
            mostrarConfirmacion: false
        }
    }

    handleInput = (e)=>{
        
        console.log(e.target)
        this.setState({[e.target.name]: e.target.value})
    } 
    
    crearOrden = (e) => {
        e.preventDefault()
        const orden = {
            nombre: this.state.nombre,
            email: this.email,
            direccion: this.direccion,
            productosCarrito: this.props.productosCarrito,
        }
        this.props.crearOrden(orden)
    }

    render() {
        const {productosCarrito}= this.props
        return (
            <div>
                <div>
                    {productosCarrito.length === 0?<div className= "carro carro-encabezado">No hay compras</div>
                    : <div className= "carro carro-encabezado">Seleccionados {productosCarrito.length} productos {" "}</div>}   
                </div>

                <div className="carro">
                    <Fade left cascade>
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
                    </Fade>
                </div>
                {productosCarrito.length !== 0 && (
                    <div>    
                        <div className="carro">
                            <div className="total">
                                <div>
                                    Total:{" "} 
                                    {formatCurrency(
                                        productosCarrito.reduce( (a,c) => a+(c.precio*c.cantidad), 0)
                                    )}
                                </div>
                                <button 
                                    onClick={()=>{
                                        this.setState({mostrarConfirmacion: true})
                                        }} 
                                        className="button primary">
                                    Hacer compra
                                </button>    
                            </div>
                        </div> 
                        {this.state.mostrarConfirmacion &&(
                            <div className="carro">
                                <Fade right cascade>
                                    <form onSubmit={this.crearOrden}>
                                        <ul className="form-container">
                                            <li>
                                                <label>Email</label>
                                                <input 
                                                type="email" 
                                                name="email"
                                                required 
                                                onChange={this.handleInput}/>
                                            </li>
                                            <li>
                                                <label>Nombre</label>
                                                <input 
                                                type="text"
                                                name="nombre" 
                                                required 
                                                onChange={this.handleInput}/>
                                            </li>
                                            <li>
                                                <label>Direccion</label>
                                                <input 
                                                type="text"
                                                name="direccion" 
                                                required 
                                                onChange={this.handleInput}/>
                                            </li>
                                            <li>
                                                <button type="submit" className="button primary">  
                                                    Enviar
                                                </button>
                                            </li>
                                        </ul>
                                    </form>
                                </Fade>    
                            </div>
                        )}
                    </div>
                )}            
            </div>
        )
    }
}
