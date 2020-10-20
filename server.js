const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

//Esta línea representa la aplicacion de servidor
const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/react-shopping-cart-db",
{useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true,
})
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log('error en la base de datos'));

/* const Schema = mongoose.Schema

const ProductoSchema = Schema({
    _id : {type: String, default: shortid.generate },
    imagen: String,
    nombre: String,
    descripcion: String,
    tallasDisponibles: [String],
    precio: Number, 
    })

    const Producto = mongoose.model(
        "productos",ProductoSchema); */

const Producto = mongoose.model(
    "productos", 
    new mongoose.Schema({
    _id : {type: String, default: shortid.generate },
    imagen: String,
    nombre: String,
    descripcion: String,
    tallasDisponibles: [String],
    precio: Number, 
    })
);

app.get("/api/productos", async (req, res)=>{
    const productos = await Producto.find({});
    res.send(productos);
});

app.post("/api/productos", async (req, res)=> {

    const newProducto = new Producto(req.body);
    const savedProducto = await newProducto.save();
    res.send(savedProducto);
});

app.delete("/api/productos/:id", async (req, res) => {
    const deletedProducto = await Producto.findByIdAndDelete(req.params.id);
    res.send(deletedProducto);
})

const port = process.env.PORT || 5000;

//Arranca el servidor
app.listen(port, ()=>console.log("serve at http://localhost/5000"));
