let carrito = []

const productos = [
    {id: 1, nombre: "Camiseta Boca Juniors Titular 25/26", precio: 50000},
    {id: 2, nombre: "Camiseta Racing Club Titular 25/26", precio: 45000},
    {id: 3, nombre: "Camiseta Argentinos Juniors Suplente 25/26", precio: 40000},
    {id: 4, nombre: "Camiseta Independiente Titular 24/25", precio: 40000},
    {id: 5, nombre: "Camiseta Aldosivi Titular 25/26", precio: 35000},
    {id: 6, nombre: "Camiseta Selección Argentina Titular 25/26", precio: 50000}
];

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
        <button data-id=${camiseta.id} class="btnAgregar">Agregar al carrito</button>
        `; 
        prodsContainer.appendChild(div);
    });

let btnAgregar = document.querySelectorAll(".btnAgregar");
btnAgregar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let camisetaEncontrada = productos.find((camiseta) => camiseta.id === Number(e.target.dataset.id));
        carrito.push(camisetaEncontrada);
        console.log(carrito);
    });
});
};

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
    `;

        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            carrito = carrito.filter(c => c.id !== camiseta.id);
            mostrarCarrito();
        });

        div.appendChild(btnEliminar);
        prodsContainer.appendChild(div);
    });

    let total = carrito.reduce((acc, item) => acc + item.precio, 0);
    prodsContainer.innerHTML += `<h3>Total: $${total}</h3>`;
    }
    
    
    let volver = document.createElement("button");
    volver.textContent = "Volver a la tienda";
    volver.addEventListener("click", cargarDOM);
    prodsContainer.appendChild(volver);
}

cargarDOM();

const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", mostrarCarrito);

