document.querySelectorAll(".catalogo_cantenido").forEach(producto => {

    const boton = producto.querySelector(".catalogo_cantenido__btn");
    const titulo = producto.querySelector(".catalogo_cantenido__TITULO");
    const descripcion = producto.querySelector(".catalogo_cantenido__DESCRIPCION");
    const precio = producto.querySelector(".catalogo_cantenido__PRECIO");
    const stock = producto.querySelector(".catalogo_cantenido__STOCK");

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