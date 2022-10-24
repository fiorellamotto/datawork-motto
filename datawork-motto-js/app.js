class Cliente {
    constructor(nombre, numero, direccion) {
        this.nombre = nombre;
        this.numero = numero;
        this.direccion = direccion;
    }
}

let boton = document.querySelector("#Enviar");
boton.addEventListener("click", agregarCliente);


function agregarCliente() {
    let nombre = document.querySelector("#nombre").value;
    let numero = document.querySelector("#numero").value;
    let direccion = document.querySelector("#direccion").value;
    let cliente1 = new Cliente(nombre, numero, direccion);
    console.log(cliente1);
    let form = document.querySelector("#items");
    form.innerHTML = "";
    let formulario = document.querySelector("#contacto");
    formulario.innerHTML = ""
    let nuevo = document.createElement("div");
    nuevo.innerHTML = `
    <h2>¡Gracias ${cliente1.nombre}!</h2>
    <hr>
    <h2>Recibira su pedido en ${cliente1.direccion}</h2>
    <h3>Total pagado $${total}.</h3>
    `;
    nuevo.className = "saludoCliente"
    formulario.appendChild(nuevo);
     mostrarCliente(cliente1);
}
 
function mostrarCliente(cliente1) {
      Toastify({
        text: "Cliente agregado con éxito",
        gravity: "bottom",
        position: "right",
        duration: "3000",
        style: {
            background: "#548af0",
        }
    }).showToast();
}

let carrito = [];
let total = 0;
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonConfirmar = document.querySelector('#boton-confirmar');
const miLocalStorage = window.localStorage;

function dibujarProductos() {
    debugger;
    fetch('/data.json')
        .then((res) => res.json())
        .then((data) => data.forEach((producto) => {
            debugger
            const miNodo = document.createElement('div');
            miNodo.classList.add('card');
            miNodo.innerHTML =
                `<div class='card-body'>
          <img class='card-img' src='${producto.imagen}'></img>
          <h5 class='card-title'> ${producto.nombre} </h5>
          <p class='card-text'> ${divisa}${producto.precio} </p>
          <button class='btn btn-info' onclick="agregarAlCarrito(${producto.id})"> Comprar </button>
          `
            DOMitems.appendChild(miNodo);
            localStorage.setItem("catalogo",JSON.stringify(data));
        }));
};
dibujarProductos();

const agregarAlCarrito = (id) => {
    Toastify({
        text: "Producto agregado al carrito",
        gravity: "bottom",
        position: "right",
        duration: "3000",
        style: {
            background: "#548af0",
        }
    }).showToast();
    debugger
    const obtenerListado = JSON.parse(localStorage.getItem("catalogo"))
    const codigoProd = obtenerListado.find((producto)=>producto.id === id)
    console.log(codigoProd) 

    codigoProd != -1 ? (
        codigoProd.cantidad = 1,
        carrito.push(codigoProd),
        mostrarCarrito(),
        guardarLocalStorage()
    ) : ( console.log("error")
        
    )
};

let valor = 0;
const mostrarCarrito = () => {
    DOMcarrito.className = "carro";
    DOMcarrito.innerHTML = "";
    if (carrito.length > 0) {
        carrito.forEach((producto, indice) => {
            const carritoFinal = document.createElement("div");
            carritoFinal.classList.add("card-body")
            carritoFinal.innerHTML = `
              <div class="product-details">${producto.nombre}</div>
              <img class="card-img" src="${producto.imagen}"></img>
              <div class ="product-details">Cantidad:${producto.cantidad}</div>
              <div class ="product-details">Precio: $ ${producto.precio}</div>
              <div class ="product-details"> Subtotal: $ ${producto.precio * producto.cantidad}</div>
              <button type="button" class="btn btn-outline-primary"  id="eliminar" onclick="eliminar(${indice})">Eliminar Producto</button>`;
            DOMcarrito.appendChild(carritoFinal);
            total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        }
        );
    }
    DOMtotal.classList.add("total-carrito-fin");
    DOMtotal.innerHTML = `<div class ="product-details"> Total: $ ${total}</div>`
}

const eliminar = (idProd) => {
    debugger
    const item = carrito.find((prod) => prod.id == idProd);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
            mostrarCarrito();
            guardarLocalStorage();
};


DOMbotonVaciar.addEventListener("click", vaciar)
function vaciar() {
    debugger
    carrito = [];
            mostrarCarrito();
            guardarLocalStorage();
            total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
            DOMtotal.classList.add("total-carrito-fin");
            DOMtotal.innerHTML = `<div class ="product-details"> Total: $ ${total}</div>`

    mostrarCarrito();
    localStorage.clear();

}

/* DOMbotonConfirmar.addEventListener("click", agregarCliente); */

function guardarLocalStorage() {
    miLocalStorage.setItem("carrito", JSON.stringify(carrito));

}

function cargarCarritoLocalStorage() {
    miLocalStorage.getItem("carrito") !== null ? (
        carrito = JSON.parse(miLocalStorage.getItem("carrito")),
        mostrarCarrito()
    ) : (
        alert("El carrito del LS esta vacío.")

    )
}

cargarCarritoLocalStorage();
