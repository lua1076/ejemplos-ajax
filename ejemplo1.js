let peticion = null;

function datosTextoRecibos() {
    const texto = document.getElementById('texto');
    if(peticion.status == 200) {
        texto.value = peticion.responseText;
    } else {
        texto.value = "La petición es incorrecta";
    }
}

function obtenerDatosTexto() {
    peticion = new XMLHttpRequest();
    peticion.addEventListener("load", datosTextoRecibos);
    peticion.addEventListener("error", errorConexion);
    peticion.open("GET", "https://mocktarget.apigee.net/user?user=eva");
    peticion.send();
}

function datosXMLRecibos(evt) {
    const texto = document.getElementById('texto');
    if(evt.target.status == 200) { //  if(evt.currentTarget.status == 200) {
        const datos = evt.target.responseXML;
        texto.value = datos.getElementsByTagName("firstName")[0].textContent 
            + " " + datos.getElementsByTagName("lastName")[0].textContent ;
    } else {
        texto.value = "La petición es incorrecta";
    }
}

function obtenerDatosXml() {
    const peticion = new XMLHttpRequest();
    peticion.addEventListener("load", datosXMLRecibos);
    peticion.addEventListener("error", errorConexion);
    peticion.open("GET", "https://mocktarget.apigee.net/xml");
    peticion.send();
}

function datosJsonRecibos(evt) {
    const texto = document.getElementById('texto');
    const respuesta = evt.target;
    if(respuesta.status == 200) {
        const persona = respuesta.response;
        texto.value = persona.firstName +
            " " + persona.lastName;
    } else {
        texto.value = "La petición es incorrecta";
    }
}

function errorConexion(evt) {
    const texto = document.getElementById('texto');
    texto.textContent = "Se ha producido un error inesperado";
    console.log(evt);
}

function obtenerDatosJson() {
    const peticion = new XMLHttpRequest();
    peticion.addEventListener("load", datosJsonRecibos);
    peticion.addEventListener("error", errorConexion);
    peticion.responseType = "json";
    peticion.open("GET", "https://mocktarget.apigee.net/json");
    peticion.send();
}

document.getElementById('obtenerDatosTexto').addEventListener("click", obtenerDatosTexto);
document.getElementById('obtenerDatosXml').addEventListener("click", obtenerDatosXml);
document.getElementById('obtenerDatosJson').addEventListener("click", obtenerDatosJson);



