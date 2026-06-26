/* 
 CARRITO DE COMPRAS
*/

document.addEventListener("DOMContentLoaded", () => {

    const panelCarrito = document.getElementById("carrito_panel");
    const overlayCarrito = document.getElementById("carrito_overlay");
    const btnCerrarCarrito = document.getElementById("btn_cerrar_carrito");
    const carritoCuerpo = document.getElementById("carrito_cuerpo");
    const totalMonto = document.getElementById("total_monto");
    const btnAbrirCarritoMenu = document.getElementById("btn_abrir_carrito_menu");
    const cartBadge = document.getElementById("cart-badge");

    const modalConfirmacion = document.getElementById("modal-confirmacion");
    const modalGracias = document.getElementById("modal-gracias");
    const btnConfirmarPago = document.getElementById("modal-btn-confirmar");

    let carrito = [];

    function abrirModal(modal) {
        if (!modal) return;
        modal.classList.add("active");
    }

    function cerrarModal(modal) {
        if (!modal) return;
        modal.classList.remove("active");
    }

    document.addEventListener("click", (e) => {
        const btnClose = e.target.closest("[data-close]");
        if (!btnClose) return;

        const modalId = btnClose.getAttribute("data-close");
        const modal = document.getElementById(modalId);
        if (modal) cerrarModal(modal);
    });

    document.addEventListener("click", (e) => {
        if (e.target.classList && e.target.classList.contains("modal")) {
            cerrarModal(e.target);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        if (modalConfirmacion) cerrarModal(modalConfirmacion);
        if (modalGracias) cerrarModal(modalGracias);
    });

    if (btnAbrirCarritoMenu) {
        btnAbrirCarritoMenu.addEventListener("click", (e) => {
            e.preventDefault();
            abrirCarrito();
        });
    }

    function abrirCarrito() {
        panelCarrito.classList.add("active");
        overlayCarrito.classList.add("active");
    }

    function cerrarCarrito() {
        panelCarrito.classList.remove("active");
        overlayCarrito.classList.remove("active");
    }

    function convertirPrecio(precioTexto) {
        return Number(
            precioTexto
                .replace("S/", "")
                .replaceAll(",", "")
                .trim()
        );
    }

    function formatearPrecio(numero) {
        return "S/ " + numero.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function actualizarBadge() {
        const totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);

        if (!cartBadge) return;

        cartBadge.textContent = totalItems;
        if (totalItems > 0) cartBadge.classList.add("visible");
        else cartBadge.classList.remove("visible");
    }

    function renderizarCarrito() {
        carritoCuerpo.innerHTML = "";

        if (carrito.length === 0) {
            carritoCuerpo.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío</p>`;
            totalMonto.textContent = "S/ 0.00";
            actualizarBadge(); // ✅ clave: actualiza badge cuando está vacío
            return;
        }

        carrito.forEach((producto, index) => {
            carritoCuerpo.innerHTML += `
                <div class="carrito-producto">
                    <img 
                        src="${producto.imagen}" 
                        alt="${producto.nombre}" 
                        class="carrito-producto-img"
                    >

                    <div class="carrito-producto-info">
                        <h4>${producto.nombre}</h4>
                        <p class="carrito-producto-precio">
                            ${formatearPrecio(producto.precio)}
                        </p>

                        <div class="carrito-producto-cantidad">
                            <button class="btn-restar" data-index="${index}">-</button>
                            <span>${producto.cantidad}</span>
                            <button class="btn-sumar" data-index="${index}">+</button>
                        </div>
                    </div>

                    <button class="btn-eliminar-producto" data-index="${index}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        });

        calcularTotal();
        actualizarBadge();
    }

    function calcularTotal() {
        const total = carrito.reduce((suma, producto) => {
            return suma + producto.precio * producto.cantidad;
        }, 0);

        totalMonto.textContent = formatearPrecio(total);
    }

    function agregarProductoAlCarrito(boton) {
        const cardProducto = boton.closest(".catalogo_cantenido");
        if (!cardProducto) return;

        const nombre = cardProducto.querySelector(".catalogo_cantenido_TITULO").textContent;
        const precioTexto = cardProducto.querySelector(".catalogo_cantenido_PRECIO").textContent;
        const imagen = cardProducto.querySelector(".catalogo_cantenido_imagen").src;

        const precio = convertirPrecio(precioTexto);

        const productoExistente = carrito.find(p => p.nombre === nombre);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                nombre,
                precio,
                imagen,
                cantidad: 1
            });
        }

        renderizarCarrito();
        abrirCarrito();
    }

    document.addEventListener("click", (e) => {
        const botonAgregar = e.target.closest(".btn_agregar");
        if (botonAgregar) {
            agregarProductoAlCarrito(botonAgregar);
        }
    });

    carritoCuerpo.addEventListener("click", (e) => {
        const botonSumar = e.target.closest(".btn-sumar");
        const botonRestar = e.target.closest(".btn-restar");
        const botonEliminar = e.target.closest(".btn-eliminar-producto");

        if (botonSumar) {
            const index = Number(botonSumar.dataset.index);
            carrito[index].cantidad++;
            renderizarCarrito();
        }

        if (botonRestar) {
            const index = Number(botonRestar.dataset.index);
            carrito[index].cantidad--;

            if (carrito[index].cantidad <= 0) {
                carrito.splice(index, 1);
            }

            renderizarCarrito();
        }

        if (botonEliminar) {
            const index = Number(botonEliminar.dataset.index);
            carrito.splice(index, 1);
            renderizarCarrito();
        }
    });

    btnCerrarCarrito.addEventListener("click", cerrarCarrito);
    overlayCarrito.addEventListener("click", cerrarCarrito);

    renderizarCarrito();

    const btnPago = document.querySelector(".btn-proceder-pago");

    if (btnPago) {
        btnPago.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

            if (modalConfirmacion && btnConfirmarPago) {
                abrirModal(modalConfirmacion);

                btnConfirmarPago.onclick = () => {
                    cerrarModal(modalConfirmacion);
                    carrito.splice(0, carrito.length);

                    renderizarCarrito();

                    cerrarCarrito();

                    abrirModal(modalGracias);
                };
            } else {
                renderizarCarrito();
                cerrarCarrito();
            }
        });
    }
});