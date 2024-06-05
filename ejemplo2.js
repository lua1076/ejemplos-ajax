
function mostrarMensajes(evt) {
    const peticion = evt.target;
    const mensajes = document.getElementById('mensajes');
    mensajes.textContent = "";
    if(peticion.status != 200) {
        mensajes.textContent = "Hubo un error: " + peticion.status;
        return;
    }
    const posts = peticion.response;
    mensajes.textContent = "";
    for (const post of posts) {
        const div = document.createElement("div");
        div.classList.add("border", "border-1", "p-2", "m-2");
        const titulo = document.createElement("p");
        titulo.classList.add("fw-bold");
        titulo.textContent = post.title;
        const mensaje = document.createElement("p");
        mensaje.textContent = post.body;
        div.appendChild(titulo);
        div.appendChild(mensaje);
        mensajes.appendChild(div);
    }
}

function mostrarError() {
    window.alert("Error inesperado");
}

function obtenerMensajes() {
    const peticion = new XMLHttpRequest();
    peticion.addEventListener("load", mostrarMensajes);
    peticion.addEventListener("error", mostrarError);
    peticion.open("GET", "https://jsonplaceholder.typicode.com/posts");
    peticion.responseType = "json";
    peticion.send();
}

document.getElementById('obtenerMensajes').addEventListener("click", obtenerMensajes);