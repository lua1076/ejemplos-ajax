
function mostrarCiudades(evt) {
    const xhr = evt.target;
    document.getElementById('obtenerCiudades').disabled = false;
    document.getElementById('cargando').classList.toggle("d-none");
    if(xhr.status != 200) {
        window.alert("Error: " + xhr.response.msg);
        return;
    }
    const contenedorCiudades = document.getElementById('contenedorCiudades');
    contenedorCiudades.textContent = "";
    for (let i = 0; i < xhr.response.data.length; i++) {
        xhr.response.data[i] = xhr.response.data[i].toLocaleUpperCase();
        
    }
    const ciudades = xhr.response.data.toSorted();
    for (const ciudad of ciudades) {
        const p = document.createElement("p");
        p.textContent = ciudad;
        contenedorCiudades.appendChild(p);
    }
}

function mostrarError() {
    document.getElementById('obtenerCiudades').disabled = false;
    document.getElementById('cargando').classList.toggle("d-none");
    window.alert("Hay un problema en la petición.");
}

function tiempoExcedido() {
    document.getElementById('obtenerCiudades').disabled = false;
    document.getElementById('cargando').classList.toggle("d-none");
    window.alert("La petición ha tardado demasiado.");
}

function obtenerCiudades() {
    const pais = document.getElementById('pais');
    if(pais.value.trim() == "") {
        window.alert("El país no puede estar vacío");
        pais.focus();
        pais.select();
        return;
    }
    document.getElementById('obtenerCiudades').disabled = true;
    document.getElementById('cargando').classList.toggle("d-none");

    const xhr = new XMLHttpRequest();
    xhr.timeout = 5000;
    xhr.addEventListener("load", mostrarCiudades);
    xhr.addEventListener("error", mostrarError);
    xhr.addEventListener("timeout", tiempoExcedido);
    xhr.open("POST", "https://countriesnow.space/api/v0.1/countries/cities");
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(`{"country": "${pais.value}"}`);
    //xhr.send('{"country":"' + pais.value + '"}');
}

document.getElementById('obtenerCiudades').addEventListener("click", obtenerCiudades);
