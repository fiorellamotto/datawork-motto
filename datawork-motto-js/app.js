class Cliente {
    constructor(nombre, numero, direccion) {
      this.nombre = nombre;
      this.numero = numero;
      this.direccion = direccion;
    }
  }
  
  let boton = document.querySelector("#Enviar");
  boton.addEventListener("click", agregarCliente);
  
  // agregado datos de cliente
  
  function agregarCliente(){
      let nombre = document.querySelector("#nombre").value;
      let numero = document.querySelector("#numero").value;
      let direccion = document.querySelector("#direccion").value;
      let cliente1 = new Cliente(nombre, numero, direccion);
      console.log(cliente1);
      mostrarCliente(cliente1);
  }
  
  // eliminar elementos
  function mostrarCliente(cliente){
      let form = document.querySelector("#items");
      form.innerHTML ="";
      let formulario = document.querySelector("#contacto");
      formulario.innerHTML ="";
      //agregar elementos
      let nuevo = document.createElement("div");
      nuevo.innerHTML = `
      <h2>Muchas Gracias ${cliente.nombre}</h2>
      <p>Sus datos fueron registrados y su compra fue exitosa. Recibira su pedido en ${cliente.direccion}</p>
      <h3>Monto final abonado $${total}.</h3>
      `;
      nuevo.className= "saludoCliente"
      formulario.appendChild(nuevo);
      
  
  }
  
  
  let productos = [
      {
          id: 1,
          nombre: "Llavero Tela",
          precio: 250,
          imagen: "./imagenes/llaveros-tela.jpg",
      },
      {
          id: 2,
          nombre: "Llavero Acrílico",
          precio: 200,
          imagen: "./imagenes/llaveros-acrilico.jpg",
      },
      {
          id: 3,
          nombre: "Llavero Metal",
          precio: 450,
          imagen: "./imagenes/llavero-metal.jpg",
      },
      
  ];
  
  let carrito = [];
  let total = 0;
  const divisa = '$';
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');
  const DOMbotonConfirmar = document.querySelector('#boton-confirmar');
  
  
  function dibujarProductos() {
      productos.forEach((producto, indice) => {
          // Estructura
          const miNodo = document.createElement('div');
          miNodo.classList.add('card');
          miNodo.innerHTML = 
          `<div class='card-body'>
          <img class='card-img' src='${producto.imagen}'></img>
          <h5 class='card-title'> ${producto.nombre} </h5>
          <p class='card-text'> ${divisa}${producto.precio} </p>
          <button class='btn btn-info' onclick="agregarAlCarrito(${indice})"> Comprar </button>
          `
          DOMitems.appendChild(miNodo);
      });
  };
  dibujarProductos();

  const agregarAlCarrito = (indice) => {
      const codigoProd = carrito.findIndex((elemento)=>{
          return elemento.id === productos[indice].id;
      });
      const productoAgregar = productos[indice];
      codigoProd === -1 ? (        
          productoAgregar.cantidad = 1,
          carrito.push(productoAgregar), 
          mostrarCarrito()
      ) : (
          carrito[codigoProd].cantidad = carrito[codigoProd].cantidad + 1,
          mostrarCarrito()
      )
  };
  
  let valor = 0;
  const mostrarCarrito = () => {
      DOMcarrito.className = "carro" ;
      DOMcarrito.innerHTML = "" ;
      if (carrito.length > 0) {
          carrito.forEach((producto,indice)=>{
              const carritoFinal = document.createElement("div");
              carritoFinal.classList.add("card-body")
              carritoFinal.innerHTML=`
              <div class="product-details">${producto.nombre}</div>
              <img class="card-img" src="${producto.imagen}"></img>
              <div class ="product-details" >Cantidad:${producto.cantidad}</div>
              <div class ="product-details" >Precio: $ ${producto.precio}</div>
              <div class ="product-details" > Subtotal: $ ${producto.precio * producto.cantidad}</div>
              <button type="button" class="btn btn-outline-primary"  id="eliminar" onclick="eliminar(${indice})">Eliminar Producto</button>`;
              DOMcarrito.appendChild(carritoFinal);
              total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0 );
              
          
              }
              
          );
          
          
      }
      DOMtotal.classList.add("total-carrito-fin");
      DOMtotal.innerHTML=`
      <div class ="product-details" > Total: $ ${total}</div>
      ` 
  
     
      
  }
  
  const eliminar = (indice) => {
      carrito.splice(indice, 1);
      mostrarCarrito();
      total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0 );
      DOMtotal.classList.add("total-carrito-fin");
      DOMtotal.innerHTML=`
      <div class ="product-details" > Total: $ ${total}</div>
      `     
  }
  
  DOMbotonVaciar.addEventListener("click", vaciar)
  function vaciar() {
      carrito = [];
      total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0 );
      DOMtotal.classList.add("total-carrito-fin");
      DOMtotal.innerHTML=`
      <div class ="product-details" > Total: $ ${total}</div>
      ` 
      mostrarCarrito();
  
  }
  
  
  
  DOMbotonConfirmar.addEventListener("click", agregarCliente);
