
    function mostrarRecetas(evt) {
    const peticion = evt.target;
    if (peticion.status != 200) {
        window.alert("No se han podido descargar las recetas: " + peticion.status);
        return;
    }
    const contenedorRecetas = document.getElementById('contenedorRecetas');
    contenedorRecetas.textContent = "";
    for (const receta of peticion.response.recipes) {
        const divReceta = document.createElement("div");
        const nombre = document.createElement("h2");
        nombre.classList.add("text-center");
        nombre.textContent = receta.name;
        divReceta.appendChild(nombre);
        const dificultad = document.createElement("p");
        dificultad.textContent = "Dificultad: " + receta.difficulty;
        divReceta.appendChild(dificultad);

        const divListas = document.createElement("div");
        divListas.classList.add("d-flex", "justify-content-around");
        divReceta.appendChild(divListas);

        let ul = document.createElement("ul");
        for (const ingrediente of receta.ingredients) {
            const li = document.createElement("li");
            li.textContent = ingrediente;
            ul.appendChild(li);
        }
        divListas.appendChild(ul);

        ul = document.createElement("ul");
        for (const instruccion of receta.instructions) {
            const li = document.createElement("li");
            li.textContent = instruccion;
            ul.appendChild(li);
        }
        divListas.appendChild(ul);

        const img = document.createElement("img");
        img.setAttribute("src", receta.image);
        img.setAttribute("width", 200);
        img.setAttribute("alt", receta.name);
        img.classList.add("d-block", "m-auto");
        divReceta.insertBefore(img, nombre);

        divReceta.classList.add("m-2", "p-2", "bg-danger-subtle");
        contenedorRecetas.appendChild(divReceta);
    }
}


function mostrarError() {
    window.alert("Se ha producido un error en la petición");
}
function obtenerRecetas() {
    const peticion = new XMLHttpRequest();
    peticion.addEventListener("load", mostrarRecetas);
    peticion.addEventListener("error", mostrarError);
    peticion.open("get", "https://dummyjson.com/recipes");
    peticion.responseType = "json";
    peticion.send();
}

document.getElementById('obtenerRecetas').addEventListener("click", obtenerRecetas);