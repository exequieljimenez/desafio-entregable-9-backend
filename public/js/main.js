const socket = io.connect();

socket.on('productos', productos => {makeHtmlTable(productos)})

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({productos})
            document.getElementById('productos').innerHTML = html
        })
}