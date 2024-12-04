let sesionIniciada = false;

document.addEventListener("DOMContentLoaded", function() {
    cargarHome();
});

function handleLoginButtonClick() {
    if (sesionIniciada) {
        let logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
        logoutModal.show();
    } else {
        cargarLogin();
    }
}

function logout() {
    sesionIniciada = false;
    Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Sesión cerrada con éxito",
    }).then(() => {
        cargarHome();
    });
}

function cargarPoliticas() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("html/politicas.html").then(
        function (contenido_html) {
            return contenido_html.text();
        }
    ).then(
        function (html) {
            console.log(html);
            contenedorPrincipal.innerHTML = html;
        }
    )
}

function cargarQuienesSomos() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("html/quienesSomos.html").then(
        function (contenido_html) {
            return contenido_html.text();
        }
    ).then(
        function (html) {
            console.log(html);
            contenedorPrincipal.innerHTML = html;
        }
    )
}

function cargarIngemovil() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("html/ingemovil.html").then(
        function (contenido_html) {
            return contenido_html.text();
        }
    ).then(
        function (html) {
            console.log(html);
            contenedorPrincipal.innerHTML = html;
        }
    )
}

function cargarHome() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("html/home.html").then(
        function (contenido_html) {
            return contenido_html.text();
        }
    ).then(
        function (html) {
            console.log(html);
            contenedorPrincipal.innerHTML = html;
        }
    )
}

function cargarLogin() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("html/login.html").then(
        function (contenido_html) {
            return contenido_html.text();
        }
    ).then(
        function (html) {
            console.log(html);
            contenedorPrincipal.innerHTML = html;
        }
    )
}

function cargarVenta() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("html/venta.html").then(
        function (contenido_html) {
            return contenido_html.text();
        }
    ).then(
        function (html) {
            console.log(html);
            contenedorPrincipal.innerHTML = html;
        }
    )
}

function cargarIngetroca() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("html/ingetroca.html").then(
        function (contenido_html) {
            return contenido_html.text();
        }
    ).then(
        function (html) {
            console.log(html);
            contenedorPrincipal.innerHTML = html;
        }
    )
}

function cargarIngechevy() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("html/ingechevy.html").then(
        function (contenido_html) {
            return contenido_html.text();
        }
    ).then(
        function (html) {
            console.log(html);
            contenedorPrincipal.innerHTML = html;
        }
    )
}

function cargarIngeitalia() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("html/ingeitalia.html").then(
        function (contenido_html) {
            return contenido_html.text();
        }
    ).then(
        function (html) {
            console.log(html);
            contenedorPrincipal.innerHTML = html;
        }
    )
}

function cargarIngebus() {
    let contenedorPrincipal = document.getElementById("panelPrincipal");

    fetch("html/ingebus.html").then(
        function (contenido_html) {
            return contenido_html.text();
        }
    ).then(
        function (html) {
            console.log(html);
            contenedorPrincipal.innerHTML = html;
        }
    )
}

async function mostrarDetallesCompra(nombreProducto) {
    if (!sesionIniciada) {
        Swal.fire({
            icon: 'warning',
            title: 'Iniciar sesión',
            text: 'Necesitas iniciar sesión para comprar este producto.',
            showCancelButton: true,
            confirmButtonText: 'Iniciar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                cargarLogin();
            }
        });
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/product/${nombreProducto}`);
        if (!response.ok) {
            throw new Error('Error al obtener la cantidad del producto');
        }

        const product = await response.json();
        const cantidad = product.cantidad;

        if (cantidad <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Sin stock',
                text: 'Lo sentimos, este producto no está disponible en este momento.',
            });
            return;
        }

        const precio = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

        const lugares = ["Sucursal A", "Sucursal B", "Sucursal C", "Sucursal D"];
        const lugar = lugares[Math.floor(Math.random() * lugares.length)];

        document.getElementById("purchasePrice").innerText = precio;
        document.getElementById("pickupLocation").innerText = lugar;
        document.getElementById("productQuantity").innerText = cantidad;

        let purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
        purchaseModal.show();
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener la cantidad del producto',
        });
    }
}

async function apartarProducto(nombreProducto) {
    const lugar = document.getElementById("pickupLocation").innerText;

    try {
        const response = await fetch(`http://localhost:3000/api/product/${nombreProducto}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cantidad: -1 })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la cantidad del producto');
        }

        let purchaseModal = bootstrap.Modal.getInstance(document.getElementById('purchaseModal'));
        purchaseModal.hide();

        const tiempoLimite = Math.floor(Math.random() * 4) + 2;

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: `${nombreProducto} apartado exitosamente. Realice la compra en ${lugar}. Tienes ${tiempoLimite} días para completar la compra.`,
            });
        }, 300); 
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo apartar el producto',
        });
    }
}