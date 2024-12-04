async function registerUser() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        Swal.fire({
            icon: "error",
            text: "Por favor, completa todos los campos",
        });
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        Swal.fire({
            icon: "error",
            text: "Por favor, ingresa un correo electrónico válido",
        });
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire({
            icon: "error",
            text: "Las contraseñas no coinciden",
        });
        return;
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
    if (!passwordPattern.test(password)) {
        Swal.fire({
            icon: "error",
            text: "La contraseña debe tener al menos 7 caracteres y contener letras y números",
        });
        return;
    }

    const newUser = {
        firstName,
        lastName,
        email,
        password
    };

    try {
        const response = await fetch('http://localhost:3000/api/register', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Usuario registrado con éxito",
            }).then(() => {
                sesionIniciada = true;

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
                );
            });
        } else {
            const errorText = await response.text();
            console.error('Error en la respuesta del servidor:', errorText);
            try {
                const errorData = JSON.parse(errorText);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Error: ${errorData.message}`,
                });
            } catch (e) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Error: ${errorText}`,
                });
            }
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error: ${error.toString()}`,
        });
    }
}

async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            text: "Por favor, completa todos los campos",
        });
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Inicio de sesión exitoso",
            }).then(() => {
                sesionIniciada = true;

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
                );
            });
        } else {
            const errorText = await response.text();
            console.error('Error en la respuesta del servidor:', errorText);
            try {
                const errorData = JSON.parse(errorText);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Error: ${errorData.message}`,
                });
            } catch (e) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Error: ${errorText}`,
                });
            }
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error: ${error.toString()}`,
        });
    }
}