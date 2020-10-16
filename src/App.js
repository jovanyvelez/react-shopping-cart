import React from 'react';
import data from './data.json'
import Productos from './components/ProductosComponent'
import Filter from './components/Filter';
import Carrito from './components/Carrito';


class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
      productos: data.productos,
      productosCarrito: [],
      talla:"",
      ordenar:"",
    }
  }

  

  sacarDelCarrito = (producto)=>{
    const productosCarrito = this.state.productosCarrito.slice()
    this.setState(
      {productosCarrito:productosCarrito.filter(x => x._id !== producto._id)})
    
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
  }

  ordenarProductos = (e)=>{
    console.log(e.target.value)
    const ordenar = e.target.value
    switch (ordenar) {
      case 'lowest':
        this.setState({
          ordenar:ordenar,
          productos: this.state.productos.sort((a,b)=>a.precio-b.precio)
        })
        break
      case 'highest':
        this.setState({
          ordenar:ordenar,
          productos: this.state.productos.sort((a,b)=>b.precio-a.precio)
        })
        break;
      default:
          this.setState({
            ordenar:ordenar,
            productos: this.state.productos.sort((a,b)=>
              a._id<b._id?-1:1
            )
          })
    }
    
  }
    

  filtrarProductos = (e)=>{
    if(e.target.value===""){
      this.setState({talla: e.target.value, 
        productos: data.productos})
    }else
    {
      this.setState({talla: e.target.value, 
        productos: data.productos.filter(
          producto => producto.tallasDisponibles.indexOf(e.target.value)>=0)})
      console.log(e.target.value)
      }
  } 

  
  render (){
    return (
      <div className="grid-container">
        <header>
          <a href="/">Carro de compras</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.productos.length}
                      talla={this.state.talla}
                      ordenar={this.state.ordenar}
                      filtrarProductos= {this.filtrarProductos}
                      ordenarProductos= {this.ordenarProductos}
              />
              <Productos productos = {this.state.productos}
                         agregarAlCarrito={this.agregarAlCarrito}
              />
            </div>
            <div className="sidebar">
              <Carrito  productosCarrito={this.state.productosCarrito}
                        sacarDelCarrito={this.sacarDelCarrito}/>
            </div>
          </div>
        </main>
        <footer>allright is reserved.</footer>
      </div>
    );
  }
}

export default App;
