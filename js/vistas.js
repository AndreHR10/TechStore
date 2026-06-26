/* 
 CARGA INICIAL
*/

window.addEventListener("DOMContentLoaded", () => {

    const vista = localStorage.getItem("vista");
    const modo = localStorage.getItem("vistaCatalogo");
    const modo2 = localStorage.getItem("vistaCantacto");

    const main = document.querySelector(".site-main");
    const section_contacto = document.querySelector(".section_contacto");
    const mensaje_animado = document.querySelector(".mensaje_animado_container");
    const catalogo = document.querySelector("#catalogo_completo");
    const contacto = document.querySelector("#contacto");


    const grid = document.querySelector(".catalogo_Madre_2");
    const tabla = document.getElementById("vista_tabla");
    const botonesVista = document.querySelectorAll(".vista button");

    main.style.display = "none";
    mensaje_animado.style.display = "none";
    catalogo.style.display = "none";
    contacto.style.display = "none";

    if (vista === "catalogo") {

        main.style.display = "none";
        mensaje_animado.style.display = "none";
        contacto.style.display = "none";
        catalogo.style.display = "block";

        /* ACTIVAR BOTON CATALOGO */
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");

            if (link.textContent.trim() === "Catálogo") {
                link.classList.add("active");
            }
        });

    } else if (vista === "contacto") {

        contacto.style.display = "block";
        mensaje_animado.style.display = "none";

        /* ACTIVAR BOTON CONTACTO */
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");

            if (link.textContent.trim() === "Contacto") {
                link.classList.add("active");
            }
        });

    } else {

        main.style.display = "block";
        mensaje_animado.style.display = "block";

        /* ACTIVAR BOTON INICIO */
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");

            if (link.textContent.trim() === "Inicio") {
                link.classList.add("active");
            }
        });
    }

    if (modo === "tabla") {
        grid.style.display = "none";
        mensaje_animado.style.display = "none";
        tabla.style.display = "block";
        activarBoton(1);
    } else {
        grid.style.display = "grid";
        tabla.style.display = "none";
        activarBoton(0);
    }

    function activarBoton(index) {
        botonesVista.forEach(b => b.classList.remove("activo"));
        if (botonesVista[index]) {
            botonesVista[index].classList.add("activo");
        }
    }
});