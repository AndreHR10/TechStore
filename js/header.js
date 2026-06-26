/*
ACTIVO MENU
*/

function activarMenu(elemento) {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    elemento.classList.add("active");
}

/*
NAVEGACIÓN HEADER
*/

function irInicio(elemento) {
    activarMenu(elemento);

    document.querySelector(".mensaje_animado_container").style.display = "block";
    document.querySelector(".site-main").style.display = "block";
    document.querySelector("#contacto").style.display = "none";
    document.querySelector("#catalogo_completo").style.display = "none";

    document.querySelector("#inicio").scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("vista", "inicio");
}

function irCatalogo(elemento) {
    activarMenu(elemento);

    document.querySelector(".site-main").style.display = "none";
    document.querySelector("#contacto").style.display = "none";
    document.querySelector(".mensaje_animado_container").style.display = "none";
    document.querySelector("#catalogo_completo").style.display = "block";

    document.querySelector("#catalogo_completo").scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("vista", "catalogo");
}

function irContacto(elemento) {
    activarMenu(elemento);

    document.querySelector(".site-main").style.display = "none";
    document.querySelector("#catalogo_completo").style.display = "none";
    document.querySelector(".mensaje_animado_container").style.display = "none";
    document.querySelector("#contacto").style.display = "block";

    document.querySelector("#contacto").scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("vista", "contacto");
}

function mostrarCatalogo() {
    document.querySelector(".site-main").style.display = "none";
    document.querySelector("#contacto").style.display = "none";
    document.querySelector(".mensaje_animado_container").style.display = "none";
    document.querySelector("#catalogo_completo").style.display = "block";

    /* ACTIVAR BOTON CATALOGO */
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");

        if (link.textContent.trim() === "Catálogo") {
            link.classList.add("active");
        }
    });

    localStorage.setItem("vista", "catalogo");
}