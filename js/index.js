const juegos = [
    { id: 1, nombre: 'GOD OF WAR', consola: 'Ps4', precio: 10000, cantidad: 1, img: '../images/God of War.jpg' },
    { id: 2, nombre: 'THE LAST OF US', consola: 'Ps4', precio: 12000, cantidad: 1, img: '../images/The Last of Us.jpg' },
    { id: 3, nombre: 'FIFA 2022', consola: 'Ps4', precio: 17000, cantidad: 1, img: '../images/FIFA 22.jpg' },
    { id: 4, nombre: 'F1 2021', consola: 'Ps4', precio: 13000, cantidad: 1, img: '../images/F1 2021.jpg' },
    { id: 5, nombre: 'ELDEN RING', consola: 'Ps5', precio: 20000, cantidad: 1, img: '../images/Elden Ring.jpg' },
    { id: 6, nombre: 'HORIZON FORBIDDEN WEST', consola: 'Ps5', precio: 25000, cantidad: 1, img: '../images/Horizon Forbidden West.jpg' },
    { id: 7, nombre: 'GRAN TURISMO 7', consola: 'Ps5', precio: 23000, cantidad: 1, img: '../images/Gran Turismo 7.jpg' },
    { id: 8, nombre: 'DEMONS SOUL', consola: 'Ps5', precio: 18000, cantidad: 1, img: '../images/Demons Soul.jpg' }
]

const contenedorTodosLosJuegos = document.getElementById("contenedorTodosLosJuegos")
const contenedorJuegosDisponibles = document.getElementById('contenedorJuegosDisponibles')
const tituloTodosLosJuegos = document.getElementById('tituloTodosLosJuegos')
const tituloJuegosCarrito = document.getElementById('tituloJuegosCarrito')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const fragment2 = document.createDocumentFragment()
const btnComprar = document.getElementsByClassName('btn-comprar')
const templateCarrito = document.getElementById('template-carrito').content
const listaCarrito = document.getElementById('lista-carrito')
const listadoCarrito = document.getElementById('items-carrito')
const carCarrito = document.getElementById('car-carrito')
const tBodyCarrito = document.getElementById('tbody-carrito')
const total = document.getElementById('total')
const titulo = document.getElementById('titulo')
const juegoCarrito = []
let totalCompra = 0
titulosAgregados = ''


// --------- Evento para click en comprar ---------------------------------------------//
contenedorJuegosDisponibles.addEventListener('click', e => {
    agregarCarrito(e)
})


// ---------Mostrar los juegos en HTML -----------------------//
function mostrarJuegos() {
    contenedorTodosLosJuegos.querySelector('h2').textContent = 'Todos los Juegos'
    juegos.forEach(juego => {
        // templateCard.querySelector('h5').textContent = juego.nombre
        templateCard.querySelector('p').textContent = '$' + juego.precio + ' CLP'
        templateCard.querySelector('img').setAttribute("src", juego.img)
        templateCard.querySelector('.btn-comprar').dataset.id = juego.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenedorJuegosDisponibles.appendChild(fragment);
}


// --------- Agregar el juego seleccionado al Carrito -----------------------------------//
function agregarCarrito(e) {
    // const juegoSeleccionado = juegos.find(juego => juego.id === id);
    // juegoCarrito.push(juegoSeleccionado);
    // juegosEnCarrito(juegoCarrito);
    const juegoAgregado = e.target.parentElement
    if (e.target.classList.contains('btn-comprar')) {
        const id= parseInt(juegoAgregado.querySelector('button').dataset.id)
        const juegoSeleccionado = juegos.find(juego => juego.id == id);
        console.log(juegoCarrito.some((el) => el.id == id))


        if (juegoCarrito.some((el) => el.id == id)) {
            const juegoCarritoMap = juegoCarrito.map((el) => el.id)
            const idCarMap = juegoCarritoMap.indexOf(id)
            juegoCarrito[idCarMap].cantidad = juegoCarrito[idCarMap].cantidad + 1
        } else {
            juegoCarrito.push(juegoSeleccionado);
        }
        juegosEnCarrito(juegoCarrito);
    }
    e.stopPropagation()

    // --------- Mostrar los juegos seleccionados al Carrito -----------------------------------//
    function juegosEnCarrito(carrito) {
        listaCarrito.querySelector('h2').textContent = 'Juegos en Carrito'
        listadoCarrito.innerHTML = "";

        carrito.forEach(juego => {
            templateCarrito.querySelector('.card-titulo').textContent = juego.nombre
            templateCarrito.querySelector('img').setAttribute("src", juego.img)
            templateCarrito.querySelector('.tipo-consola').textContent = juego.consola
            templateCarrito.querySelectorAll('th')[4].textContent = juego.id
            templateCarrito.querySelectorAll('td')[1].textContent = juego.cantidad
            templateCarrito.querySelectorAll('td')[2].textContent = juego.precio * juego.cantidad
            const clone1 = templateCarrito.cloneNode(true)
            fragment2.appendChild(clone1)
        })
        listadoCarrito.appendChild(fragment2);
    }

    console.log(juegoCarrito)
}



function totalCompraCarrito() {
    totalCompra = juegoCarrito.reduce((juego, elem) => juego + elem.precio, 0)
    console.log(totalCompra)
    titulo.innerHTML = 'Total de la Compra'
    total.innerHTML = '$' + totalCompra + ' CLP'


    // const calculo = document.createElement('div');
    // calculo.classList.add('calculo');

    // const monto = document.createElement('h1');
    // monto.textContent = totalCompra;

    // calculo.appendChild(monto)
    // total.appendChild(calculo)
    // main.appendChild(total)

}

document.addEventListener('DOMContentLoaded', () => {
    mostrarJuegos()
})
