import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import { connect } from 'react-redux'
import {fetchProductos} from '../actions/productActions'
import { agregarAlCarro } from '../actions/cartActions'


class Productos extends Component {
       

    constructor(props){
        super(props)
        this.state={
            producto:null
        }
    }

    componentDidMount(){
        this.props.fetchProductos()
    }
    
    abrirModal = (producto) => {
        this.setState({producto})
    }   

    cerrarModal = () => {
        this.setState({producto:null})
    }

    render() {
        const {producto} = this.state
        return (
            <div>
                <Fade bottom cascade>
                    {!this.props.productos ? (<div>Loading...</div>
                        ):(<ul className="productos">
                            {this.props.productos.map(producto => (
                                <li key={producto._id}>
                                    <div className="producto">
                                        <a href={"#" + producto._id}
                                                    onClick={() => this.abrirModal(producto)}>
                                            <img src={producto.imagen} alt={producto.nombre}></img>
                                            <p>{producto.nombre}</p>
                                        </a>
                                        <div className="producto-precio">
                                            <div>{formatCurrency(producto.precio)}</div>
                                            <button onClick={()=>this.props.agregarAlCarro(producto)} className="button primary" >
                                                Comprar
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                ))
                            }
                        </ul>)
                    }
                    
                </Fade>
                {
                    producto &&(
                        <Modal isOpen={true} onRequestClose={this.cerrarModal}>
                            <Zoom>
                                <button className="cerrar-modal" onClick= {this.cerrarModal}>
                                    x
                                </button>
                                <div className="producto-detalles">
                                    <img src={producto.imagen} alt={producto.nombre}/>
                                    <div className="producto-detalles-descripcion">
                                        <p>
                                            <strong>{producto.nombre}</strong>
                                        </p>
                                        <p>
                                            {producto.descripcion}
                                        </p>
                                        <p>
                                            Tallas Disponibles:
                                            {producto.tallasDisponibles.map( x => (
                                                <span>
                                                  {" "} 
                                                    <button className="button">{x}</button>
                                                </span>
                                            ))}
                                        </p>
                                        <div className="producto-precio">
                                            <div>
                                                Total :{formatCurrency(producto.precio)}
                                            </div>
                                            <button 
                                                className="button primary"
                                                onClick={() => {
                                                    this.props.agregarAlCarro(producto)
                                                    this.cerrarModal()
                                                }}>
                                                Agregar al carrito
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>  
        )
    }
}


export default connect((state)=>({productos: state.productos.productosFiltrados}), {
    fetchProductos, agregarAlCarro
})(Productos)
