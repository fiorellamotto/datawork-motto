function bienvendo() {
    alert(
       "Hola" + " " + nombre + ", " +"bienvenid@ a nuestro e-commerce"
    );
}
function seleccionarProducto() {
    producto = prompt(
        "Elija el producto que desea \n 1: Llavero de tela sublimado \n 2: Llavero de metal grabado \n 3: Llavero de acrílico grabado"
    );
    if(producto === "1") {
        alert("Elegiste Llavero de tela sublimado");
    } else if (producto === "2") {
        alert("Elegiste Llavero de metal grabado");
    } else if (producto === "3") {
        alert("Elegiste Llavero de acrílico grabado");
    }
    opcion = prompt(
        "¿Qué desea hacer? \n 2: Mostrar precio con IVA \n 3: Finalizar"
    );
}
function finalizarCompra() {
    if (producto === "1") {
        alert(
            "Usted eligió: Llavero de tela sublimado es de" + " " + llaveroTela * 1.21
        );
    } else if (producto === "2") {
        alert("Usted eligió: Llavero de metal grabado es de" + " " + llaveroMetal * 1.21
        );
    } else if (producto === "3") {
        alert("Usted eligió: Llavero de acrílico grabado es de" + " " + llaveroAcrilico * 1.21
        );
    }
}
//variables
let producto;
let llaveroTela = 250;
let llaveroMetal = 450;
let llaveroAcrilico = 200;
let nombre = prompt ("Ingrese su nombre");
//funcion bienvenido
bienvendo();
let opcion = prompt(
    "Ingrese una opción: \n 1: Comprar producto \n 2: Finalizar compra \n 3: Salir"
);
//bucle
while (opcion !== "3") {
    if(opcion === "1") {
        seleccionarProducto();
    }
    if(opcion === "2") {
        finalizarCompra();
        opcion = "3";
    }
}
alert("Gracias por tu compra");