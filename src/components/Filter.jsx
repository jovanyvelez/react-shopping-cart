import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filtro">
                <div className="filtro-resultado">{this.props.count} Productos</div>
                <div className="filtro-orden">
                    Ordenar{" "}
                    <select value={this.props.ordenar} onChange={this.props.ordenarProductos}>
                        <option value="latestCo">Todo</option>
                        <option value="lowest">Menor a mayor</option>
                        <option value="highest">Mayor a menor</option>
                    </select>
                </div>
                <div className="filtro-talla">
                    Filtrar{" "}   
                    <select value={this.props.talla} onChange={this.props.filtrarProductos}>
                        <option value="">ALL</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
        )
    }
}
