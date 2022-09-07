class Producto {
    constructor(tipo, precio, color) {
        this.tipo = tipo;
        this.precio = precio;
        this.color = color;
    }
}
let precios = [
    {tipo: "Llavero Tela", precio: "250"},
    {tipo: "Llavero Metal", precio: "450"},
    {tipo: "Llavero Acrílico", precio: "200"},
];
function cargarProducto(arrayProductos) {
    let tipo = prompt("Ingrese el material elegido");
    let precio = parseInt(prompt("Ingrese el precio"));
    let color = prompt("¿Qué color queres?");
    const buevoProducto = new Producto(tipo, precio, color);
    arrayProductos.push(nuevoProducto);
    console.log("Producto añadido al carrito");
}

function mostrarProducto() {
    arrayProductos.forEach((producto) => {
        console.log(
        `Eligió ${producto.marca} por un precio de ${prodicto.precio} en color ${producto.color}`
        )
        
    });
}
function finalizarCompra(){
    const total = arrayProductos.reduce((acc, el) => acc + el.precio, 0);
    alert( `Gracias por su compra, total a pagar: $ ${total}`);
}
let arrayProductos = [];
let opcion = prompt(
    "Ingrese una opcion: /n 1: Elegir producto /n 3: Finalizar compra /n 4: Salir"
);

while (opcion !== "4") {
    if(opcion === "1") {
        cargarProducto(arrayProductos);
        }
    if(opcion === "2") {
        mostrarProducto(arrayProductos);
    }   
    if(opcion === "3") {
        finalizarCompra(arrayProductos);
    }

opcion = prompt(
    "Vuelva a ingresar una opción: /n 1: Seguir Comprando /n 2: Ver el carrito en consola al finalizar /n 3: Finalizar"
);
}
alert("Pedido realizado, gracias!");