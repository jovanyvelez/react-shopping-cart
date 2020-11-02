import React from 'react';
import Productos from './components/ProductosComponent'
import Filter from './components/Filter';
import Carrito from './components/Carrito';
import store from './store'
import { Provider } from 'react-redux';


class App extends React.Component {
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
                <Productos/>
              </div>
              <div className="sidebar">
                <Carrito/>
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