/*const cuadro = document.querySelector(".cuadro");  // Selecciona el elemento con la clase "cuadro" en el DOM y lo guarda en la constante cuadro.
const loginlink = document.querySelector(".login-link");  // Selecciona el enlace con la clase "login-link" para acceder al login.
const registerlink = document.querySelector(".register-link");  // Selecciona el enlace con la clase "register-link" para acceder al registro.

const btnPopup = document.querySelector(".btnLogin-popup");  // Selecciona el botón con la clase "btnLogin-popup" que abre el popup de login.
const iconClose = document.querySelector(".icon-close");  // Selecciona el ícono de cierre con la clase "icon-close".

const loginbutton = document.querySelector(".btn");  // Selecciona el botón de login con la clase "btn".
const Registrarsebutton = document.querySelector("#login-register");  // Selecciona el botón de registro con el id "login-register".

// Evento para mostrar el cuadro de registro al hacer clic en el enlace de registro.
registerlink.addEventListener("click", () => {
    cuadro.classList.add("active");  // Añade la clase "active" al elemento cuadro para mostrar el formulario de registro.
});

// Evento para mostrar el cuadro de login al hacer clic en el enlace de login.
loginlink.addEventListener("click", () => {
    cuadro.classList.remove("active");  // Elimina la clase "active" del elemento cuadro para mostrar el formulario de login.
});

// Evento para abrir el popup de login al hacer clic en el botón de login.
btnPopup.addEventListener("click", () => {
    cuadro.classList.add("active-popup");  // Añade la clase "active-popup" para mostrar el popup de login.
});

// Evento para cerrar el popup de login al hacer clic en el ícono de cerrar.
iconClose.addEventListener("click", () => {
    cuadro.classList.remove("active-popup");  // Elimina la clase "active-popup" para cerrar el popup de login.
});


const nav = document.querySelector('.navegacion');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let scrollAmount = 0;
const scrollStep = 100; // Cantidad de píxeles que se moverá por clic

nextBtn.addEventListener('click', () => {
    scrollAmount += scrollStep;
    nav.style.transform = `translateX(-${scrollAmount}px)`;
});

prevBtn.addEventListener('click', () => {
    scrollAmount -= scrollStep;
    if (scrollAmount < 0) scrollAmount = 0;
    nav.style.transform = `translateX(-${scrollAmount}px)`;
});
    

document.getElementById("loginform").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("USER").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const curso = document.getElementById("curso").value.trim();
    const seccion = document.getElementById("seccion").value.trim();

    if (!nombre || !apellido || !curso || !seccion) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const asistencia = {
        nombre,
        apellido,
        curso,
        seccion,
        fecha: new Date().toLocaleString()
    };

    let registros = JSON.parse(localStorage.getItem("asistencias")) || [];
    registros.push(asistencia);
    localStorage.setItem("asistencias", JSON.stringify(registros));

    alert("Asistencia registrada correctamente.");
    document.getElementById("loginform").reset();
    cuadro.classList.remove("active-popup");
});*/

window.addEventListener("DOMContentLoaded", () => {
    const cuadro = document.querySelector(".cuadro");
    const loginlink = document.querySelector(".login-link");
    const registerlink = document.querySelector(".register-link");
    const btnPopup = document.querySelector(".btnLogin-popup");
    const iconClose = document.querySelector(".icon-close");

    registerlink.addEventListener("click", () => {
        cuadro.classList.add("active");
    });

    loginlink.addEventListener("click", () => {
        cuadro.classList.remove("active");
    });

    btnPopup.addEventListener("click", () => {
        cuadro.classList.add("active-popup");
    });

    iconClose.addEventListener("click", () => {
        cuadro.classList.remove("active-popup");
    });

    // Registro de asistencia
    const form = document.getElementById("loginform");
    const mensaje = document.createElement("p");
    mensaje.id = "mensajeConfirmacion";
    mensaje.style.marginTop = "10px";
    mensaje.style.textAlign = "center";
    mensaje.style.fontWeight = "bold";
    form?.appendChild(mensaje);

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const nombre = document.getElementById("USER").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const curso = document.getElementById("curso").value.trim();
            const seccion = document.getElementById("seccion").value.trim();

            if (!nombre || !apellido || !curso || !seccion) {
                mensaje.textContent = "Por favor, completa todos los campos.";
                mensaje.style.color = "red";
                return;
            }

            const registros = JSON.parse(localStorage.getItem("asistencias")) || [];

            // Verificar si ya existe el mismo nombre + apellido + curso + seccion
            const yaRegistrado = registros.some(reg =>
                reg.nombre.toLowerCase() === nombre.toLowerCase() &&
                reg.apellido.toLowerCase() === apellido.toLowerCase() &&
                reg.curso.toLowerCase() === curso.toLowerCase() &&
                reg.seccion.toLowerCase() === seccion.toLowerCase()
            );

            if (yaRegistrado) {
                mensaje.textContent = "Ya se registró esta asistencia.";
                mensaje.style.color = "red";
                return;
            }

            const asistencia = {
                nombre,
                apellido,
                curso,
                seccion,
                fecha: new Date().toLocaleString()
            };

            registros.push(asistencia);
            localStorage.setItem("asistencias", JSON.stringify(registros));

            mensaje.textContent = "✅ Asistencia Confirmada.";
            mensaje.style.color = "green";

            form.reset();
        });
    } else {
        console.error("No se encontró el formulario con id='loginform'");
    }
});
