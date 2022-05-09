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
const totalCarrito = document.getElementById('total-carrito')
const templateTotalCarrito = document.getElementById('template-total-carrito').content
const total = document.getElementById('total')
const titulo = document.getElementById('titulo')
let juegos = []
let juegoCarrito = []
let totalCompra = 0
titulosAgregados = ''


const pedirData = async () => {
    try {
        const resp = await fetch('data.json')
        const data = await resp.json()
        juegos = data
        console.log(juegos)
        mostrarJuegos(data)

    } catch (error) {
        console.log(error)
    }
}


document.addEventListener('DOMContentLoaded', () => {
    pedirData()
    contenedorTodosLosJuegos.querySelector('h2').textContent = 'Todos los Juegos'
})

// --------- Evento para click en comprar ---------------------------------------------//
contenedorJuegosDisponibles.addEventListener('click', e => {
    agregarCarrito(e)
})

// --------- Evento para click para Filtrar PS4---------------------------------------------//
const btnFiltroPs4 = document.getElementById('btn-ps4')
btnFiltroPs4.addEventListener('click', (data) => {
    const juegoPs4 = juegos.filter(item => item.consola == 'Ps4')
    contenedorJuegosDisponibles.innerHTML = ''
    contenedorTodosLosJuegos.querySelector('h2').textContent = 'Juegos PS4'
    mostrarJuegos(juegoPs4)
})

// --------- Evento para click para Filtrar PS5---------------------------------------------//
const btnFiltroPs5 = document.getElementById('btn-ps5')
btnFiltroPs5.addEventListener('click', e => {
    const juegoPs5 = juegos.filter(item => item.consola == 'Ps5')
    contenedorJuegosDisponibles.innerHTML = ''
    contenedorTodosLosJuegos.querySelector('h2').textContent = 'Juegos PS5'
    mostrarJuegos(juegoPs5)
})

// --------- Evento para click para Filtrar Todos los Juegos---------------------------------------------//
const btnFiltroTodos = document.getElementById('btn-todos')
btnFiltroTodos.addEventListener('click', e => {
    contenedorJuegosDisponibles.innerHTML = ''
    contenedorTodosLosJuegos.querySelector('h2').textContent = 'Todos los Juegos'
    mostrarJuegos(juegos)
})

listadoCarrito.addEventListener('click', e => {
    btnAccion(e)
})


// ---------Mostrar los juegos en HTML -----------------------//
function mostrarJuegos(items) {
    // contenedorTodosLosJuegos.querySelector('h2').textContent = 'Todos los Juegos'
    items.forEach(juego => {
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
        const id = parseInt(juegoAgregado.querySelector('button').dataset.id)
        const juegoSeleccionado = juegos.find(juego => juego.id == id);
        Toastify({
            text: "Se Agrego Item al Carrito",
            className: "info",
            offset: {
                x: 250, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 0 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            style: {
                background: "linear-gradient(to right, #FF7F11, #D49541 )",
                color: "black",
            }
        }).showToast();


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


}

// --------- Mostrar los juegos seleccionados al Carrito -----------------------------------//
function juegosEnCarrito(carrito) {
    listaCarrito.querySelector('h2').textContent = 'Juegos en Carrito'
    listadoCarrito.innerHTML = "";

    carrito.forEach(juego => {
        templateCarrito.querySelector('.card-titulo').textContent = juego.nombre
        templateCarrito.querySelector('img').setAttribute("src", juego.img)
        templateCarrito.querySelector('.tipo-consola').textContent = juego.consola
        templateCarrito.querySelectorAll('th')[5].textContent = juego.id
        templateCarrito.querySelectorAll('td')[2].textContent = juego.cantidad
        templateCarrito.querySelectorAll('td')[3].textContent = '$' + juego.precio * juego.cantidad + ' CLP'
        templateCarrito.querySelector('.btn-info').dataset.id = juego.id
        templateCarrito.querySelector('.btn-danger').dataset.id = juego.id
        const clone1 = templateCarrito.cloneNode(true)
        fragment2.appendChild(clone1)
    })
    listadoCarrito.appendChild(fragment2);

    const nCantidad = juegoCarrito.reduce((juego, elem) => juego + elem.cantidad, 0)
    const nTotal = juegoCarrito.reduce((juego, elem) => juego + (elem.cantidad * elem.precio), 0)

    totalCarrito.innerHTML = ""
    templateTotalCarrito.querySelector('th').textContent = 'Total Productos'
    templateTotalCarrito.querySelectorAll('td')[1].textContent = nCantidad
    templateTotalCarrito.querySelectorAll('td')[2].textContent = '  $' + nTotal + ' CLP'
    const clone = templateTotalCarrito.cloneNode(true)
    fragment.appendChild(clone)
    totalCarrito.appendChild(fragment)
    // --------- Elimiar Items del Carrito -----------------------------------// 
    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        Toastify({
            text: "Se Vacio Carrito",
            className: "info",
            offset: {
                x: 250, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 0 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            style: {
                background: "linear-gradient(to right, #FF0000, #BA1110 )",
                color: "black",
            }
        }).showToast();
        juegoCarrito = []
        juegosEnCarrito(juegoCarrito)
        listadoCarrito.innerHTML = ''
    })

    // ---------Guardar Items del Carrito al LocalStorage -------------------------// 
    localStorage.setItem('items', JSON.stringify(juegoCarrito))
}

const btnAccion = e => {
    if (e.target.classList.contains('btn-info')) {
        const id = parseInt(e.target.parentElement.querySelector('button').dataset.id)
        const producto = juegoCarrito.map((el) => el.id)
        const idx = producto.indexOf(id)
        juegoCarrito[idx].cantidad++
        Toastify({
            text: "Se Agrego Item al Carrito",
            className: "info",
            offset: {
                x: 250, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 0 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            style: {
                background: "linear-gradient(to right, #FF7F11, #D49541 )",
                color: "black",
            }
        }).showToast();
        juegosEnCarrito(juegoCarrito)   
    }

    if (e.target.classList.contains('btn-danger')) {
        const id = parseInt(e.target.parentElement.querySelector('button').dataset.id)
        const producto = juegoCarrito.map((el) => el.id)
        const idx = producto.indexOf(id)
        juegoCarrito[idx].cantidad--
        juegoCarrito[idx].cantidad == 0 && delete juegoCarrito[idx]
        Toastify({
            text: "Se Elimino Item del Carrito",
            className: "info",
            offset: {
                x: 250,
                y: 0 
            },
            style: {
                background: "linear-gradient(to right, #FF0000, #BA1110 )",
                color: "black",
            }
        }).showToast();
        juegosEnCarrito(juegoCarrito)
    }
}

if (localStorage.getItem('items')) {
    juegoCarrito = JSON.parse(localStorage.getItem('items'))
    juegosEnCarrito(juegoCarrito)

}