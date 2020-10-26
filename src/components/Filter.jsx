import React, { Component } from 'react'
import {connect} from 'react-redux'
import {filtrarProductos, ordenarProductos} from '../actions/productActions'


class Filter extends Component {
    render() {
        return (
            !this.props.productosFiltrados?(
            <div>loading...</div>
            ):(
            <div className="filtro">
                <div className="filtro-resultado">{this.props.productosFiltrados.length} Productos</div>
                <div className="filtro-orden">
                    Ordenar{" "}
                    <select value={this.props.ordenar} onChange={(e)=>this.props.ordenarProductos(this.props.productosFiltrados, e.target.value)}>
                        <option value="latestCo">Todo</option>
                        <option value="menorPrecio">Menor a mayor</option>
                        <option value="mayorPrecio">Mayor a menor</option>
                    </select>
                </div>
                <div className="filtro-talla">
                    Filtrar{" "}   
                    <select value={this.props.talla} onChange={ (e)=> this.props.filtrarProductos(this.props.productos, e.target.value)}>
                        <option value="">ALL</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>)
        )
    }
}

export default connect(
    (state) => ({
      talla: state.productos.talla,
      ordenar: state.productos.ordenar,
      productos: state.productos.productos,
      productosFiltrados: state.productos.productosFiltrados,
    }),
    {
      filtrarProductos,
      ordenarProductos,
    }
  )(Filter);