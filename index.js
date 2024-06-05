
function mostrarAutoresArticulos(evt) {
    document.getElementById("cargando").remove(); // Eliminamos la imagen
    const peticion = evt.target;
    if(peticion.status != 200) {
        mostrarMensajeError(evt);
        return;
    }

    const contenedorAutores = document.getElementById("autores");
    for (const autor of peticion.response) {
        const contenedorAutor = document.createElement("section");
        contenedorAutor.classList.add("autor");
        const avatar = document.createElement("img");
        avatar.setAttribute("src", autor.avatar);
        avatar.setAttribute("loading", "lazy");
        contenedorAutor.appendChild(avatar);
        contenedorAutores.appendChild(contenedorAutor);

        const contenedorDatosAutor = document.createElement("div");
        contenedorDatosAutor.classList.add("datosAutor");
        const nombre = document.createElement("p");
        nombre.textContent = autor.name;
        contenedorDatosAutor.appendChild(nombre);
        const email = document.createElement("p");
        email.classList.add("email");
        email.textContent = autor.email;
        contenedorDatosAutor.appendChild(email);
        const boton = document.createElement("a");
        boton.classList.add("boton");
        boton.textContent = "Ocultar artículos";
        boton.addEventListener("click", mostrarOcultarArticulos);
        contenedorDatosAutor.appendChild(boton);
        contenedorAutor.appendChild(contenedorDatosAutor);

        const contenedorArticulos = document.createElement("section");
        contenedorArticulos.classList.add("articulos");
        for (const articulo of autor.articles) {
            const contenedorArticulo = document.createElement("div");
            // Si quisiéramos crear un id
            contenedorArticulo.setAttribute("id", "articulo" + articulo.id);
            contenedorArticulo.classList.add("articulo");
            contenedorArticulo.innerHTML = "<h2>" 
                + articulo.title.replace("<p>", "").replace("</p>", "") + "</h2>";
            /* Si nos fiamos del origen y nos valen sus etiquetas, las dejamos
            /contenedorArticulo.innerHTML += "<p>" 
                + articulo.body.replaceAll("<p>", "").replaceAll("</p>", "") + "</p>";
            */
                contenedorArticulo.innerHTML = articulo.body;

            // Usamos innerHTML para no tener que crear y añadir muchos elementos
            // en varias líneas de código.
            // No deberíamos añadir los onclick directamente en HTML, pero como
            // hemos usado innerHTML lo dejamos así
            contenedorArticulo.innerHTML += 
                '<footer><span class="material-symbols-outlined">visibility</span>'
                + `<span>${articulo.views}</span>`
                + '<span class="material-symbols-outlined" data-like="no">thumb_up</span>'
                + `<span>${articulo.likes}</span>`
                + `<span class="material-symbols-outlined eliminar" data-idarticulo="articulo${articulo.id}">delete</span>`
                + '</footer>';
            contenedorArticulo.querySelector("span:nth-of-type(3)")
                .addEventListener("click", subirBajarLikes);
            contenedorArticulo.querySelector("span:nth-of-type(5)")
                .addEventListener("click", eliminarArticulo);

            contenedorArticulos.appendChild(contenedorArticulo);
            contenedorAutores.appendChild(contenedorArticulos);
        }
    }
}

function subirBajarLikes(evt) {
    // También podríamos haber añadido un data- a ese span con los likes
    let likes = evt.target.nextElementSibling.textContent;
    if(evt.target.dataset.like == "no") {
        evt.target.dataset.like = "si";
        evt.target.style.color = "green";
        likes++;
    } else {
        evt.target.dataset.like = "no";
        likes--;
        evt.target.style.color = "";
    }
    evt.target.nextElementSibling.textContent = likes;
}

function eliminarArticulo(evt) {
    // El botón tiene un padre (el footer), el cual tiene un padre que es el articulo
    // Sería más decente darle ids a los contenedores de los artículos y luego usar
    // aquí un document.getElementById
   // evt.target.parentNode.parentNode.remove();
    // Con id:
    document.getElementById(evt.target.dataset.idarticulo).remove();
}

function mostrarOcultarArticulos(evt) {
    /* El botón está dentro de un div que está dentro de un section y queremos el
    hermamo de ese section.
    Usamos nextElementSibling para que coja el primer hermano de tipo elemento, es decir,
    no textos como enters perdidos por el documento, los cuales también son nodos */
    const articulos = evt.target.parentNode.parentNode.nextElementSibling;
    if(articulos.style.display == "none") {
        articulos.style.display = "block";
        evt.target.textContent = "Ocultar artículos";
    } else {
        articulos.style.display = "none";
        evt.target.textContent = "Mostrar artículos";
    }
}

function mostrarMensajeError(evt) {
    const contenedor = document.createElement("div");
    contenedor.classList.add("error");
    const texto1 = document.createElement("p");
    texto1.textContent = "No se han podido descargar los datos";
    const texto2 = document.createElement("p");
    texto2.textContent = "Error: " + evt.target.status;
    contenedor.appendChild(texto1);
    contenedor.appendChild(texto2);
    const autores = document.getElementById("autores");
    autores.appendChild(contenedor);
    document.getElementById("cargando").remove(); // Eliminamos la imagen
}

function obtenerAutoresArticulos() {
    const peticion = new XMLHttpRequest();
    peticion.addEventListener("load", mostrarAutoresArticulos);
    peticion.addEventListener("error", mostrarMensajeError);
    peticion.open("GET", "https://thetestrequest.com/authors?include=articles");
    //peticion.open("GET", "datosPrueba.json");
    peticion.responseType = "json";
    peticion.send();
}


obtenerAutoresArticulos();