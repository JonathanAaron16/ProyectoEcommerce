// Redireccion a inicio////////////////////
let nombreUsuario = sessionStorage.getItem("nombreUsuario");

// Redirige si no existe un nombre de usuario
if(!nombreUsuario){
	window.location.href = "index.html";
}




// Variables////////////////////////////////
let productos = []; // Agregamos la variable global productos
let cuadriculaProductos = document.querySelector(".product-grid");
let barraBusqueda = document.querySelector(".search-bar");

let botonesCarrito = document.querySelectorAll(".add-to-cart");
let objetosCarrito = document.getElementById("cart-items");
let precioCarrito = document.getElementById("total-price");
let contadorCarrito = document.getElementById("cart-count");

let boton_imprimir = document.getElementById("btn-imprimir");

let carrito = [];




// Obtener productos////////////////////////////////////////////
const url = "api/products"; // Guardamos en una variable la url de nuestro endpoint

async function obtenerProductos() {
    try {
        let respuesta = await fetch(url); // Hacemos una peticion a nuestro nuevo endpoint en http://localhost:3000/api/products

        let data = await respuesta.json();

        console.log(data); // Nuestros productos estan disponibles dentro de payload { payload: Array(19) }

        productos = data.payload; // Aca guardamos en la variable productos el array de productos que contiene "payload"

        mostrarProductos(productos);
        
        

    } catch(error) {
        console.error(error);
    }
}




// Mostrar productos////////////////////////////////
function mostrarProductos(array) {
    let cartaProducto = "";
    
    for(let i = 0; i < array.length; i++) {    
        cartaProducto += `
            <div class="product-card">
                <img src="${array[i].img_url}" alt="${array[i].nombre}">
                <h3>${array[i].nombre}</h3>
                <p>$${array[i].precio}</p>
                <p>${array[i].tipo}</p> 
                <button class="add-to-cart" onclick="agregarCarrito(${array[i].id})">Agregar a carrito</button>
            </div>
        `;
    }
    cuadriculaProductos.innerHTML = cartaProducto;
    //console.log(cartaProducto)
}




// Saludar usuario/////////////////////////////////
function saludarUsuario() {
    let saludoUsuario = document.getElementById("saludo-usuario");
    saludoUsuario.innerHTML = `Bienvenidx ${nombreUsuario}!`;
}




function mostrarCarrito() {
    let carritoCompra = "";
    precioTotal = 0;

    carrito.forEach((producto, indice) => {
        carritoCompra += `
            <li class="item-block">
                <p class="item-name">${producto.nombre} - $${producto.precio}</p>
                <button class="delete-button" onclick="eliminarProducto(${indice})">Eliminar</button>
            </li>
            `;

        precioTotal += parseInt(producto.precio, 10);
    });

    // Imprimir html de producto
    objetosCarrito.innerHTML = carritoCompra;

    // Mostrar precio total y contador carrito
    precioCarrito.innerHTML = `$${precioTotal}`;

    // Mostrar el numero de objetos en el array carrito
    contadorCarrito.innerHTML = carrito.length;
    

    // Ocultar carrito si no hay productos
    if(carrito.length > 0) {
        document.getElementById("empty-cart").classList.remove("hidden");
        document.getElementById("empty-cart").classList.add("visible");
        
        document.getElementById("btn-imprimir").classList.remove("hidden");
        document.getElementById("btn-imprimir").classList.add("visible");
    } else {
        document.getElementById("empty-cart").classList.remove("visible");
        document.getElementById("empty-cart").classList.add("hidden");
        document.getElementById("btn-imprimir").classList.remove("visible");
        document.getElementById("btn-imprimir").classList.add("hidden");
        

        objetosCarrito.innerHTML = `<p class="info-carrito">No hay productos en el carrito.</p>`;
    }
}




// Filtrar productos////////////////////////////////
barraBusqueda.addEventListener("keyup", filtrarProductos);

function filtrarProductos() {
	let valorBusqueda = barraBusqueda.value;
	//console.log(valorBusqueda)

	let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(valorBusqueda));
   
	mostrarProductos(productosFiltrados);
}




//Mandar orden de compra a Whatsapp

boton_imprimir.addEventListener("click", () => {
  
  const productosTexto = carrito
    .map(p => `${p.nombre} ($${p.precio})`)
    .join(", ");

  const precioTotal = carrito.reduce((total, p) => total + parseInt(p.precio), 0);

  const orden = {
    nombre: nombreUsuario,
    productos: productosTexto,
    precio: precioTotal
  };

  enviarOrdenWhatsApp(orden);
});



function generarLinkWhatsApp(numero, mensaje) {
  const mensajeCodificado = encodeURIComponent(mensaje);
  return `https://wa.me/${numero}?text=${mensajeCodificado}`;
}

function enviarOrdenWhatsApp(orden) {

  const numeroVendedor = "1151346621"; // TU NÚMERO
  
  const mensaje = `
    ¡Nueva orden de compra!
    Cliente: ${orden.nombre}
    Producto: ${orden.productos}
    Precio total: $${orden.precio}
    `;

  const link = generarLinkWhatsApp(numeroVendedor, mensaje);

  // Redireccionar al usuario
  window.location.href = link;
}


// Imprimir ticket PDF //
boton_imprimir.addEventListener("click", imprimirTicket);

function imprimirTicket(){
    console.table(carrito);
   
const idProductos = [];
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

let y = 20;

// Establecemos el tamaño de 16px para el primer texto
doc.setFontSize(18);

// Escribimos el texto "ticket compra" en la posicion (x=10 y=10) del pdf
doc.text("Su ticket de compra:", 20, y);

y+= 20

doc.setFontSize(12);

carrito.forEach(productos =>{
    idProductos.push(productos.id);
    doc.text(`${productos.nombre} - $${productos.precio}`,30 ,y);
    y+= 10;
})

const precioTotal = carrito.reduce((total,productos) => total + parseInt(productos.precio),0);

y += 15;

doc.text(`total: ${precioTotal}`,20, y);

doc.save("ticket.pdf");

registarVentas(precioTotal, idProductos);

}

function registarVentas(precioTotal,idProductos){
    const fecha = new Date().toLocaleString("sv-SE", { hour12: false }).replace("T", " ");
    
    console.log(fecha);

    const data = {
        fecha: fecha,
        total: precioTotal,
        nombre_usuario: nombreUsuario,
        productos: idProductos,
    }
    
    alert("ticker hecho")
    
     sessionStorage.removeItem("nombreUsuario");
      window.location.href = "index.html"
    
}

function ordenar(tipo) {
    let ordenado = [...productos]; //--> let ordenado = frutas.slide() //copia el array, no modifica el array original

    if (tipo === "tipo") {
        ordenado.sort((a, b) => a.tipo.localeCompare(b.tipo)); // compara cual va antes o despues
    } else if (tipo === "precioAsc") {
        ordenado.sort((a, b) => a.precio - b.precio);
    } else if (tipo === "precioDesc") {
        ordenado.sort((a, b) => b.precio - a.precio);
        
    }

    mostrarProductos(ordenado);
}
function filtrarPorTipo(tipo) {
    let resultado = productos.filter(prod => prod.tipo === tipo);
    mostrarProductos(resultado);
}




// Agregar a carrito////////////////////////////////
function agregarCarrito(id) {

	//console.log(`id del producto: ${id}`);
	let ProductoSeleccionado = productos.find(prod => prod.id === id);
	carrito.push(ProductoSeleccionado);

	mostrarCarrito();
}




function eliminarProducto(index) {
    // Eliminar un elemento del array carrito a partir de su indice con splice()
    carrito.splice(index, 1);
    mostrarCarrito();
}



function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}




// Funcion inicializadora
function init() {
    obtenerProductos();
    saludarUsuario();
}

init();