import React from 'react';
import data from './data.json'
import Productos from './components/ProductosComponent'


class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
      productos: data.productos,
      talla:"",
      ordenar:"",

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
