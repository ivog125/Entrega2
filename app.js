let carrito = []

// Lista de productos disponibles

const productos = [
    {id: 1, nombre: "Camiseta Boca Juniors Titular 25/26", precio: 50000, cantidad: 1},
    {id: 2, nombre: "Camiseta Racing Club Titular 25/26", precio: 45000, cantidad: 1},
    {id: 3, nombre: "Camiseta Argentinos Juniors Suplente 25/26", precio: 40000, cantidad: 1},
    {id: 4, nombre: "Camiseta Independiente Titular 24/25", precio: 40000, cantidad: 1},
    {id: 5, nombre: "Camiseta Aldosivi Titular 25/26", precio: 35000, cantidad: 1},
    {id: 6, nombre: "Camiseta Selección Argentina Titular 25/26", precio: 50000, cantidad: 1}
];

// Función para cargar los productos en el DOM

const cargarDOM = () => {
    const prodsContainer = document.getElementById("contenedor")
    prodsContainer.innerHTML = "";

    productos.forEach((camiseta) => {
        let div = document.createElement("div");
        div.className = "border";
        div.innerHTML = `
        <span>${camiseta.id}</span>
        <h3>${camiseta.nombre}</h3>
        <p>${camiseta.precio}</p>
        <p>Cantidad: ${camiseta.cantidad}</p>
        <button data-id=${camiseta.id} class="btnAgregar">Agregar al carrito</button>
        `; 
        prodsContainer.appendChild(div);
    });

// Agregar funcionalidad a los botones "Agregar al carrito"

let btnAgregar = document.querySelectorAll(".btnAgregar");
btnAgregar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let repeat = carrito.some((camiseta) => camiseta.id === Number(e.target.dataset.id));
        if (repeat) {
            carrito.map((camiseta) => {
                if (camiseta.id === Number(e.target.dataset.id)) {
                    camiseta.cantidad++;
                }});
            console.log(carrito);
            return;
        }
        let camisetaEncontrada = productos.find((camiseta) => camiseta.id === Number(e.target.dataset.id));
         let copiaCamiseta = { ...camisetaEncontrada, cantidad: 1 };
        carrito.push(copiaCamiseta);
        console.log(carrito);
        guardarCarrito();
    });
});
};

// Función para mostrar el carrito

function mostrarCarrito() {
    const prodsContainer = document.getElementById("contenedor");
    prodsContainer.innerHTML = "<h2>Mi Carrito</h2>";

    if (carrito.length === 0) {
        prodsContainer.innerHTML += "<p>El carrito está vacío.</p>";
    } else {

    carrito.forEach((camiseta) => {
        let div = document.createElement("div"); 
        div.className = "border";
        div.innerHTML = `
            <h3>${camiseta.nombre}</h3>
            <p>Precio: $${camiseta.precio}</p>
            <p>Cantidad: ${camiseta.cantidad}</p>
            <p>Subtotal: $${camiseta.precio * camiseta.cantidad}</p>
    `;

        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.addEventListener("click", () => {
            carrito = carrito.filter(c => c.id !== camiseta.id);
            mostrarCarrito();
        });

        div.appendChild(btnEliminar);
        prodsContainer.appendChild(div);
    });

// Calcular y mostrar el total

    let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    let totalh3 = document.createElement("h3");
    totalh3.textContent = `Total: $${total + 8000} (incluye envío por OCA a todo el país)`;
    prodsContainer.appendChild(totalh3);
    }
    
    
    let volver = document.createElement("button");
    volver.textContent = "Volver a la tienda";
    volver.addEventListener("click", cargarDOM);
    prodsContainer.appendChild(volver);
}

// Cargar los productos al iniciar la página

cargarDOM();

const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", mostrarCarrito);

// Funciones para guardar y cargar el carrito desde localStorage

const guardarCarrito = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));
};  
const cargarCarrito = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }};
cargarCarrito();
