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

    document.querySelector(".site-main").style.display = "block";
    document.querySelector(".mensaje_animado_container").style.display = "block";
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

/* 
 MOSTRAR CATÁLOGO COMPLETO
 */

function mostrarCatalogo() {
    document.querySelector(".site-main").style.display = "none";
    document.querySelector("#contacto").style.display = "none";
    document.querySelector(".mensaje_animado_container").style.display = "none";
    document.querySelector("#catalogo_completo").style.display = "block";

     /* ACTIVAR BOTON CATALOGO */
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");

        if(link.textContent.trim() === "Catálogo"){
            link.classList.add("active");
        }
    });

    localStorage.setItem("vista", "catalogo");
}

/* 
CAMBIO GRID / TABLA
*/

function cambiarVista(tipo) {
    const grid = document.querySelector(".catalogo_Madre_2");
    const tabla = document.getElementById("vista_tabla");
    const botones = document.querySelectorAll(".vista button");

    botones.forEach(b => b.classList.remove("activo"));

    if (tipo === "grid") {
        grid.style.display = "grid";
        tabla.style.display = "none";
        botones[0].classList.add("activo");
    } else {
        grid.style.display = "none";
        tabla.style.display = "block";
        botones[1].classList.add("activo");
    }

    localStorage.setItem("vistaCatalogo", tipo);
}

/* 
 CARGA INICIAL
*/

window.addEventListener("DOMContentLoaded", () => {

    const vista = localStorage.getItem("vista");
    const modo = localStorage.getItem("vistaCatalogo");

    const main = document.querySelector(".site-main");
    const catalogo = document.querySelector("#catalogo_completo");

    const grid = document.querySelector(".catalogo_Madre_2");
    const tabla = document.getElementById("vista_tabla");
    const botonesVista = document.querySelectorAll(".vista button");

    if (vista === "catalogo") {
        main.style.display = "none";
        catalogo.style.display = "block";
    } else {
        main.style.display = "block";
        catalogo.style.display = "none";
    }

    if (modo === "tabla") {
        grid.style.display = "none";
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
/* 
Buscador
*/
document.addEventListener("DOMContentLoaded", () => {

    const buscador = document.getElementById("buscador");

    if (!buscador) return;

    buscador.addEventListener("input", function () {

        const texto = this.value.toLowerCase();
        const cards = document.querySelectorAll(".catalogo_cantenido");

        cards.forEach(card => {

            const nombre = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const desc = card.querySelector(".catalogo_cantenido_DESCRIPCION")?.textContent.toLowerCase() || "";
            const match = nombre.includes(texto) || desc.includes(texto);

            card.style.display = match ? "" : "none";
        });

        const filas = document.querySelectorAll(".productos_tabla_row");

        filas.forEach(fila => {

            const nombre = fila.querySelector(".productos_tabla_cell_NAME")?.textContent.toLowerCase() || "";
            const categoria = fila.querySelector(".productos_tabla_cell_CATEGORIA")?.textContent.toLowerCase() || "";
            const match = nombre.includes(texto) || categoria.includes(texto);

            fila.style.display = match ? "" : "none";
        });

    });
});

/*
 FILTRO
*/

function filtrar(categoria, boton) {

    const productosGrid = document.querySelectorAll(".catalogo_cantenido");
    const productosTabla = document.querySelectorAll(".productos_tabla_row");
    const botones = document.querySelectorAll(".filtros button");

    botones.forEach(b => b.classList.remove("activo"));
    if (boton) {
        boton.classList.add("activo");
    }

    // GRID
    productosGrid.forEach(p => {
        const cat = p.getAttribute("data-categoria");

        if (categoria === "all" || cat === categoria) {
            p.style.display = "";
        } else {
            p.style.display = "none";
        }
    });

    // TABLA 
    productosTabla.forEach(fila => {
        const catFila = fila.getAttribute("data-categoria");

        if (categoria === "all" || catFila === categoria) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}
/*
 BOTÓN VER DETALLES
*/

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".catalogo_cantenido").forEach(producto => {

        const boton = producto.querySelector(".catalogo_cantenido_btn");
        const titulo = producto.querySelector(".catalogo_cantenido_TITULO");
        const descripcion = producto.querySelector(".catalogo_cantenido_DESCRIPCION");
        const precio = producto.querySelector(".catalogo_cantenido_PRECIO");
        const stock = producto.querySelector(".catalogo_cantenido_STOCK");

        if (!boton || !titulo || !descripcion) return;

        const original = {
            titulo: titulo.textContent,
            descripcion: descripcion.textContent,
            precio: precio.textContent,
            stock: stock.textContent
        };

        let activo = false;

        boton.addEventListener("click", () => {

            if (!activo) {
                boton.textContent = "Volver";
                titulo.textContent = "Detalles Específicos";

                descripcion.innerHTML = boton.dataset.detalle
                    .split(",")
                    .map(d => `🔹 ${d.trim()}`)
                    .join("<br>");

                precio.textContent = "";
                stock.textContent = "";

                activo = true;

            } else {
                boton.textContent = "Ver Detalles";
                titulo.textContent = original.titulo;
                descripcion.textContent = original.descripcion;
                precio.textContent = original.precio;
                stock.textContent = original.stock;

                activo = false;
            }
        });
    });
});