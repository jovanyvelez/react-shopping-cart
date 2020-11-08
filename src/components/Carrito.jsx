import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux'
import Zoom from 'react-reveal/Zoom'
import Modal from 'react-modal'
import { sacarDelCarro } from '../actions/cartActions'
import { crearOrden, limpiarOrden } from '../actions/orderActions'





class Carrito extends Component {

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
        
        this.setState({[e.target.name]: e.target.value})
    } 
    
    crearOrden = (e) => {
        e.preventDefault()
      
        const orden = {
            nombre: this.state.nombre,
            email: this.state.email,
            direccion: this.state.direccion,
            productosCarro: this.props.productosCarro,
            total: this.props.productosCarro.reduce((a,c)=> (a + c.precio*c.cantidad), 0 )
        }
        this.props.crearOrden(orden)
    }

    closeModal = () => {

        this.props.limpiarOrden()
    }

    render() {
        const {productosCarro, orden} = this.props
        return (
            <div>
                <div>
                    {productosCarro.length === 0?<div className= "carro carro-encabezado">No hay compras</div>
                    : <div className= "carro carro-encabezado">Seleccionados {productosCarro.length} productos {" "}</div>}   
                </div>

                {orden && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="cerrar-modal" onClick={this.cerrarModal}>x</button>
                            <div className="orden-detalle">
                                <h3 className="mensaje-exitoso">Su orden ha sido creada</h3>
                                <h2>Orden {orden._id}</h2>
                                <ul>
                                    <li>
                                        <div>Nombre</div>
                                        <div>{orden.nombre}</div>
                                    </li>
                                    <li>
                                        <div>E-mail</div>
                                        <div>{orden.email}</div>
                                    </li>
                                    <li>
                                        <div>Direccion</div>
                                        <div>{orden.direccion}</div>
                                    </li>
                                    <li>
                                        <div>Fecha:</div>
                                        <div>{orden.createdAt}</div>
                                    </li>
                                    <li>
                                        <div>Total</div>
                                        <div>{formatCurrency(orden.total)}</div>
                                    </li>
                                    <li>
                                        <div>Productos:</div>
                                        <div>
                                            {orden.productosCarro.map((x) => (
                                                <div>
                                                    {x.cantidad } {" "} {x.nombre}
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Zoom>
                </Modal>)}

                <div className="carro">
                    <Fade left cascade>
                        <ul className="carro-articulos">
                            {productosCarro.map(producto=>(
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
                                            <button onClick={()=> this.props.sacarDelCarro(producto)}>
                                                Quitar
                                            </button>
                                        </div>                                    
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
                {productosCarro.length !== 0 && (
                    <div>    
                        <div className="carro">
                            <div className="total">
                                <div>
                                    Total:{" "} 
                                    {formatCurrency(
                                        productosCarro.reduce( (a,c) => a+(c.precio*c.cantidad), 0)
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

export default connect(
    (state) => ({
        orden: state.orden.orden,
        productosCarro: state.carro.productosCarro
    }),
     {sacarDelCarro, crearOrden, limpiarOrden}
     )(Carrito)
