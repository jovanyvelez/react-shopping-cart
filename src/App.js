import React from 'react';
import Productos from './components/ProductosComponent'
import Filter from './components/Filter';
import Carrito from './components/Carrito';
import store from './store'
import { Provider } from 'react-redux';


class App extends React.Component {
  
  constructor(){
    super()
    this.state = {
      productosCarrito: localStorage.getItem("productosCarrito") 
      ? JSON.parse(localStorage.getItem("productosCarrito"))
      : [],
    }
  }

  crearOrden = (orden) => {
    alert(orden.nombre)
  }

  sacarDelCarrito = (producto)=>{
    const productosCarrito = this.state.productosCarrito.slice()
    const nuevoCarrito= productosCarrito.filter(x => x._id !== producto._id)
    this.setState(
      {productosCarrito: nuevoCarrito})
      localStorage.setItem("productosCarrito",JSON.stringify(nuevoCarrito))
  }

  agregarAlCarrito = (producto) => {
    const productosCarrito = this.state.productosCarrito.slice()
    let yaEstaEnCarro = false
    productosCarrito.forEach(item => {
      if(item._id === producto._id){
        item.cantidad++
        yaEstaEnCarro = true
      }
    })
    if(!yaEstaEnCarro){

      productosCarrito.push({...producto, cantidad:1})       
    }
    this.setState({productosCarrito})
    localStorage.setItem("productosCarrito",JSON.stringify(productosCarrito))
    //console.log(JSON.parse(localStorage.getItem("productosCarrito")))
  }
  
  render (){
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">Carro de compras</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter/>
                <Productos agregarAlCarrito={this.agregarAlCarrito}/>
              </div>
              <div className="sidebar">
                <Carrito  productosCarrito={this.state.productosCarrito}
                          sacarDelCarrito={this.sacarDelCarrito}
                          crearOrden={this.crearOrden}/>
              </div>
            </div>
          </main>
          <footer>allright is reserved.</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
