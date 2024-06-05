function mostrarProductos(evt) {
    const peticion = evt.target;
    if(peticion.status != 200) {
        window.alert("No se han podido descargar los productos: " + peticion.status);
        return;
    }
    const contenedorProductos = document.getElementById('contenedorProductos');
    contenedorProductos.textContent = "";
    for (const producto of peticion.response.products) {
        const div = document.createElement("div");
        div.classList.add("mt-2", "mb-2", "p-2", "bg-info-subtle");
        const ul = crearLista(producto);
        div.appendChild(ul);
        const section = crearOpiniones(producto.reviews);
        div.appendChild(section);
        const img = crearImagen(producto.thumbnail);
        div.appendChild(img);
        contenedorProductos.appendChild(div);
    }
}

/**
 * Crea una etiqueta img con la imagen indicada
 * @param {String} urlImagen - la URL de la imagen
 * @returns {HTMLElement} - EL elemento img creado
 */
function crearImagen(urlImagen){
    const img = document.createElement("img");
    img.setAttribute("src", urlImagen);
    return img;
}
/**
 * Crea una sección con las opiones sobre le producto
 * @param {[]} opiones - el array de opiniones 
 * @returns la sección creada
 */
function crearOpiniones(opiones){
    const section = document.createElement("section");
    section.classList.add("bg-light", "ms-3");
    for (const opinion of opiones) {
        const p = document.createElement("p");
        p.textContent = opinion.rating + " - " + opinion.comment;
        section.appendChild(p);
    }
    return section;
}

/**
 * Crea un ul con los datos del producto
 * @param {producto} producto - el producto a añadir a la lista
 * @returns {HTMLElement} - El ul creado
 */
function crearLista(producto) {
    const ul = document.createElement("ul");
    let li = document.createElement("li");
    li.textContent = producto.title;
    ul.appendChild(li);
    li = document.createElement("li");
    li.textContent = producto.price;
    ul.appendChild(li);
    li = document.createElement("li");
    li.textContent = producto.rating;
    ul.appendChild(li);
    li = document.createElement("li");
    li.textContent = producto.stock;
    ul.appendChild(li);
    return ul;
}

function mostrarError() {
    window.alert("Se ha producido un error en la petición");
}
function obtenerProductos() {
    const peticion = new XMLHttpRequest();
    peticion.addEventListener("load", mostrarProductos);
    peticion.addEventListener("error", mostrarError);
    peticion.open("get", "https://dummyjson.com/products");
    peticion.responseType = "json";
    peticion.send();
}



document.getElementById('obtenerProductos').addEventListener("click", obtenerProductos);



