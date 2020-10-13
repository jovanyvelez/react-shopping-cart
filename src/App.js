import React from 'react';
import data from './data.json'
import Productos from './components/ProductosComponent'
import Filter from './components/Filter';


class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
      productos: data.productos,
      talla:"",
      ordenar:"",
    }
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
    


    
 /*    const sort = e.target.value;
    this.setState((state) => ({
      sort: sort,
      productos: this.state.productos
        .slice()
        .sort((a,b)=>
          sort==="lowest"
          ?a.precio > b.precio
            ? 1
            :-1
          :sort === "highest"
          ? a.precio>b.precio
            ? 1
            :-1 
          : a._id > b._id
            ? 1
            :-1
        ),
    })); */
   //implement


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
  } //implement

  
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
              <Productos productos = {this.state.productos}/>
            </div>
            <div className="sidebar">
              Items carrito
            </div>
          </div>
        </main>
        <footer>allright is reserved.</footer>
      </div>
    );
  }
}

export default App;
