document.querySelector('.contacto_form').addEventListener('submit', function (event) {
    event.preventDefault();

    this.reset();

    document.getElementById('modal-contacto').classList.add('show');
});

function cerrarAlerta() {
    document.getElementById('modal-contacto').classList.remove('show');
}