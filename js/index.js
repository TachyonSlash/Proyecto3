document.addEventListener("DOMContentLoaded", function() {
    cargarHome();
});

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