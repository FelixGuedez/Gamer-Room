const juegos = [
    { id: 1, nombre: 'GOD OF WAR', consola: 'Ps4', precio: 10000 , img: '../images/God of War.jpg' },
    { id: 2, nombre: 'THE LAST OF US', consola: 'Ps4', precio: 12000, img: '../images/The Last of Us.jpg' },
    { id: 3, nombre: 'FIFA 2022', consola: 'Ps4', precio: 17000, img: '../images/FIFA 22.jpg' },
    { id: 4, nombre: 'F1 2021', consola: 'Ps4', precio: 13000, img: '../images/F1 2021.jpg' },
    { id: 5, nombre: 'ELDEN RING', consola: 'Ps5', precio: 20000, img: '../images/Elden Ring.jpg' },
    { id: 6, nombre: 'HORIZON FORBIDDEN WEST', consola: 'Ps5', precio: 25000, img: '../images/Horizon Forbidden West.jpg' },
    { id: 7, nombre: 'GRAN TURISMO 7', consola: 'Ps5', precio: 23000, img: '../images/Gran Turismo 7.jpg' },
    { id: 8, nombre: 'DEMONS SOUL', consola: 'Ps5', precio: 18000, img: '../images/Demons Soul.jpg' }
]

const main = document.querySelector('main')
const contenedorJuegos = document.querySelector('.contenedor-juegos');
const listadoCarrito = document.querySelector('.agregados-carrito')
const total = document.getElementById('total')
const titulo = document.getElementById('titulo')
const juegoCarrito = []
let totalCompra = 0
titulosAgregados = ''

function mostrarJuegos() {
    juegos.forEach(juego => {
        const divJuego = document.createElement('div');
        divJuego.classList.add('card');

        const tituloJuego = document.createElement('h3');
        tituloJuego.textContent = juego.nombre;

        const imgJuego = document.createElement('img');
        imgJuego.src = juego.img;
        imgJuego.classList.add('imagen-juego');

        const precioJuego = document.createElement('h4');
        precioJuego.textContent =
        precioJuego.textContent ='$' + juego.precio + ' CLP';

        const btnComprar = document.createElement('button');
        btnComprar.className = "btn-comprar";
        btnComprar.textContent = "Añadir al Carrito";
        btnComprar.onclick = () => {
            agregarCarrito(juego.id)
        };

        divJuego.appendChild(tituloJuego);
        divJuego.appendChild(imgJuego);
        divJuego.appendChild(precioJuego);
        divJuego.appendChild(btnComprar);
        
        contenedorJuegos.appendChild(divJuego);
    })
}

function agregarCarrito(id){
    const juegoSeleccionado = juegos.find( juego => juego.id === id);
    juegoCarrito.push(juegoSeleccionado);
    juegosEnCarrito(juegoCarrito);
}

function juegosEnCarrito(carrito) {

    
    listadoCarrito.innerHTML =  "";



    carrito.forEach(juego => {

        const divJuego = document.createElement('div');
        divJuego.classList.add('card-carrito');

        const imgJuego = document.createElement('img');
        imgJuego.src = juego.img;
        imgJuego.classList.add('imagen-juego');

        const tituloJuego = document.createElement('h3');
        tituloJuego.textContent = juego.name;

        const precioJuego = document.createElement('h4');
        precioJuego.textContent ='$' + juego.precio + ' CLP';


        divJuego.appendChild(tituloJuego);
        divJuego.appendChild(imgJuego);
        divJuego.appendChild(precioJuego);

        listadoCarrito.appendChild(divJuego);
        // main.appendChild(listadoCarrito)

    })
    totalCompraCarrito()
}



function totalCompraCarrito () {
    totalCompra = juegoCarrito.reduce((juego, elem) => juego + elem.precio,0)
    console.log(totalCompra)
    titulo.innerHTML = 'Total de la Compra'
    total.innerHTML = '$' + totalCompra +' CLP'


    // const calculo = document.createElement('div');
    // calculo.classList.add('calculo');

    // const monto = document.createElement('h1');
    // monto.textContent = totalCompra;

    // calculo.appendChild(monto)
    // total.appendChild(calculo)
    // main.appendChild(total)

}

mostrarJuegos()