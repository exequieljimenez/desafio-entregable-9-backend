const express = require("express");
const faker = require('faker')

const {Server: HttpServer} = require('http');
const {Server: Socket} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const producto1 = {nombre: faker.commerce.product(), precio: faker.commerce.price(), imagen: faker.image.imageUrl()}

function productosRandom() {
    return {
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(),
        imagen: faker.image.imageUrl()
    }
}

function crearProductos() {
    const productosFaker = [];
    for (let i = 0; i < 5; i++) {
        productosFaker.push(productosRandom())
    }
    return productosFaker
}

io.on('connection', socket => {
    socket.emit('productos', crearProductos())
    
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))