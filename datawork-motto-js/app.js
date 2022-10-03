class Cliente {
    constructor(nombre, numero, direccion) {
      this.nombre = nombre;
      this.numero = numero;
      this.direccion = direccion;
    }
  }
  
  let boton = document.querySelector("#Enviar");
  boton.addEventListener("click", agregarCliente);
  
  
  function agregarCliente(){
      let nombre = document.querySelector("#nombre").value;
      let numero = document.querySelector("#numero").value;
      let direccion = document.querySelector("#direccion").value;
      let cliente1 = new Cliente(nombre, numero, direccion);
      console.log(cliente1);
      mostrarCliente(cliente1);
  }
  
  function mostrarCliente(cliente){
        Swal.fire({
            title: 'Confirmado',
            html: `Muchas gracias ${cliente.nombre}!! <br>
            Enviaremos su compra a ${cliente.direccion}. <br>
            Monto final: $${total} <br>
            `,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#119eff",
            confirmButtonText: "Confirmar",
        })

    if (cliente.nombre === "" & cliente.direccion ==="") {
        Swal.fire({
            title: 'Nombre y Direccion',
            text: 'Registra tu nombre y direccion',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
            
        
    } else {
    let form = document.querySelector("#items");
    form.innerHTML ="";
    let formulario = document.querySelector("#contacto");
    formulario.innerHTML=""    
    let nuevo = document.createElement("div");
    nuevo.innerHTML = `
    <h2>¡Gracias ${cliente.nombre}!</h2>
    <hr>
    <h2>Recibira su pedido en ${cliente.direccion}</h2>
    <h3>Total pagado $${total}.</h3>
    `;
    nuevo.className= "saludoCliente"
    formulario.appendChild(nuevo);
        
    }

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
  const miLocalStorage = window.localStorage;
  
  function dibujarProductos() {
      productos.forEach((producto, indice) => {
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
    Toastify({
        text: "Producto agregado al carrito",
        gravity: "bottom",
        position: "right",
        duration: "3000",        
        style: {            
            background: "#548af0",
        }
      }).showToast();

      const codigoProd = carrito.findIndex((elemento)=>{
          return elemento.id === productos[indice].id;
      });
      Swal.fire({
        title: 'Agregado',
        text: 'Producto agregado al carrito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      const productoAgregar = productos[indice];
      codigoProd === -1 ? (        
          productoAgregar.cantidad = 1,
          carrito.push(productoAgregar), 
          mostrarCarrito(),
          guardarLocalStorage()
      ) : (
          carrito[codigoProd].cantidad = carrito[codigoProd].cantidad + 1,
          mostrarCarrito(),
          guardarLocalStorage()
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
  
  const eliminar = (idProd) => {
    const item = carrito.find((prod) => prod.id === idProd);
    const indice = carrito.indexOf(item);
    Swal.fire({
      title: "¿Seguro que deseas eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#119eff",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire({
              title: 'Listo',
              icon: 'success',
              text: 'El producto ha sido eliminado'
          })
        carrito.splice(indice, 1);
        mostrarCarrito();
        guardarLocalStorage();
        
      }
    });
  };
  

  DOMbotonVaciar.addEventListener("click", vaciar)
  function vaciar() {
      
      Swal.fire({
          title: "¿Deseas vaciar carrito?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Vaciar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire({
                  title: 'Listo',
                  icon: 'success',
                  text: 'Ahora el carrito se encuentra vacío'
              })
            carrito = [];
            mostrarCarrito();
            guardarLocalStorage();
            total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0 );
          DOMtotal.classList.add("total-carrito-fin");
          DOMtotal.innerHTML=`
          <div class ="product-details" > Total: $ ${total}</div>
          ` 
          
          }
        });
        
        
      mostrarCarrito();
      localStorage.clear();
  
  }
  
  DOMbotonConfirmar.addEventListener("click", agregarCliente);
  
  function guardarLocalStorage(){
      miLocalStorage.setItem("carrito", JSON.stringify(carrito));
  
  }
  
  function cargarCarritoLocalStorage(){
      miLocalStorage.getItem("carrito") !== null ? (
          carrito = JSON.parse(miLocalStorage.getItem("carrito")), 
          mostrarCarrito()
      ) : (
          alert ("El carrito del LS esta vacío.")       
  
      )
  }
  
  cargarCarritoLocalStorage();
  