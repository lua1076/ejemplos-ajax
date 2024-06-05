
function mostrarUsuarios(evt) {
    const peticion = evt.target;
    const usuarios = document.getElementById('usuarios');
    usuarios.textContent = "";
    if (peticion.status != 200) {
        usuarios.textContent = "Hubo un error: " + peticion.status;
        return;
    }
    const losUsuarios = peticion.response;
    usuarios.textContent = "";
    for (const usuario of losUsuarios) {
        const div = document.createElement("div");
        div.classList.add("border", "border-1", "p-2", "m-2");
        const nombre = document.createElement("p");
        nombre.classList.add("fw-bold");
        nombre.textContent = usuario.name;
        const email = document.createElement("p");
        email.textContent = usuario.email;
        const calle = document.createElement("p")
        calle.textContent = usuario.address.street;
        const longitud = usuario.address.geo.lng;
        const latitud = usuario.address.geo.lat;
        const enlace = document.createElement("a");
       // enlace.setAttribute("href", "http://maps.google.com/maps?z=12&t=m&q=loc:" + latitud + "+" + longitud);
        enlace.setAttribute("href", `http://maps.google.com/maps?z=12&t=m&q=loc:${latitud}+${longitud}`);
        enlace.setAttribute("target", "_blank");
        enlace.classList.add("d-block", "text-end");
        enlace.textContent = "ver mapa";
        div.appendChild(nombre);
        div.appendChild(email);
        div.appendChild(calle);
        div.appendChild(enlace);

        usuarios.appendChild(div);
    }
}

function mostrarError() {
    window.alert("Error inesperado");
}

function obtenerUsuarios() {
    const peticion = new XMLHttpRequest();
    peticion.addEventListener("load", mostrarUsuarios);
    peticion.addEventListener("error", mostrarError);
    peticion.open("GET", "https://jsonplaceholder.typicode.com/users");
    peticion.responseType = "json";
    peticion.send();
}

document.getElementById('obtenerUsuarios').addEventListener("click", obtenerUsuarios);