
function mostrarMoneda(evt) {
    const xhr = evt.target;
    document.getElementById('obtenerMonedas').disabled = false;
    document.getElementById('cargando').classList.toggle("d-none");
    if(xhr.status != 200) {
        window.alert("Error: " + xhr.response.msg);
        return;
    }
    const moneda = document.getElementById('moneda');
    moneda.textContent = xhr.response.data.currency;
}

function mostrarError() {
    document.getElementById('obtenerMonedas').disabled = false;
    document.getElementById('cargando').classList.toggle("d-none");
    window.alert("Hay un problema en la petición.");
}

function tiempoExcedido() {
    document.getElementById('obtenerMonedas').disabled = false;
    document.getElementById('cargando').classList.toggle("d-none");
    window.alert("La petición ha tardado demasiado.");
}

function obtenerMonedas() {
    const pais = document.getElementById('pais');
    if(pais.value.trim() == "") {
        window.alert("El país no puede estar vacío");
        pais.focus();
        pais.select();
        return;
    }
    document.getElementById('obtenerMonedas').disabled = true;
    document.getElementById('cargando').classList.toggle("d-none");

    const xhr = new XMLHttpRequest();
    xhr.timeout = 5000;
    xhr.addEventListener("load", mostrarMoneda);
    xhr.addEventListener("error", mostrarError);
    xhr.addEventListener("timeout", tiempoExcedido);
    xhr.open("POST", "https://countriesnow.space/api/v0.1/countries/currency");
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    //xhr.send(JSON.stringify({country: pais.value}));
    xhr.send(`{"country": "${pais.value}"}`);
    //xhr.send('{"country":"' + pais.value + '"}');
}

document.getElementById('obtenerMonedas').addEventListener("click", obtenerMonedas);
