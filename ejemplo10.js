
function mostrarResultado(evt) {
    const xhr = evt.target;
    document.getElementById('anhadirMensaje').disabled = false;
    document.getElementById('cargando').classList.toggle("d-none");
    // 201 pues esta API devuelve 201 cuando crea el recurso
    if(xhr.status != 201) {
    // si os vale cualquiera de los 200
    // if(xhr.status < 200 || xhr.status > 299) {
        window.alert("Error: " + xhr.response.msg);
        return;
    }
    alert("Mensaje añadido");

}

function mostrarError() {
    document.getElementById('anhadirMensaje').disabled = false;
    document.getElementById('cargando').classList.toggle("d-none");
    window.alert("Hay un problema en la petición.");
}

function tiempoExcedido() {
    document.getElementById('anhadirMensaje').disabled = false;
    document.getElementById('cargando').classList.toggle("d-none");
    window.alert("La petición ha tardado demasiado.");
}

function anhadirMensaje() {
    const usuario = document.getElementById('usuario');
    const titulo = document.getElementById('titulo');
    const mensaje = document.getElementById('mensaje');

    if(usuario.value.trim() == "" || titulo.value.trim() == "" || mensaje.value.trim() == "") {
        window.alert("Debes cubrir todos los datos");
        return;
    }
    document.getElementById('anhadirMensaje').disabled = true;
    document.getElementById('cargando').classList.toggle("d-none");

    const xhr = new XMLHttpRequest();
    xhr.timeout = 5000;
    xhr.addEventListener("load", mostrarResultado);
    xhr.addEventListener("error", mostrarError);
    xhr.addEventListener("timeout", tiempoExcedido);
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    const datos = {
        title: titulo.value,
        body: mensaje.value,
        userId: usuario.value
    }
    // Convertimos el objeto JavaScript a un texto en formato JSON
    xhr.send(JSON.stringify(datos));
}

document.getElementById('anhadirMensaje').addEventListener("click", anhadirMensaje);
