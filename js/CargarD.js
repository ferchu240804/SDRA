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

    // Popup Login/Register toggle
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

    const form = document.getElementById("loginform");
    const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

    // Lista de estudiantes válidos para 3ro BTI
    const listaEstudiantesBTI = [
        "Johanna Miranda", "Octavio Mendieta", "Mell Campuzano", "Miguel Canale", "Rogelio Zarza", "Diego Hernandez",
        "Fabricio Martinez", "Fernando Penayo", "Arianna Rojas", "Javier Navarro", "Leandro Caballero", "Elias Franco",
        "Alexander Vidal", "Sofia Aranda", "Alejandro Garcete", "Juan Rojas", "Axel Medina", "Fernando Castillo",
        "Giovanni Dominguez", "Blass Sosa", "Matias Leiva", "Fernando Villalba", "Julio Riquelme", "Enrique Heyer",
        "Mauricio Sanchez", "Marcos Alonso", "Herwing Mongelos", "Alex Acosta", "Maximiliano Ramirez", "Fabricio Romero"
    ];

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const nombre = document.getElementById("USER").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const curso = document.getElementById("curso").value.trim();
            const seccion = document.getElementById("seccion").value.trim().toUpperCase(); // BTI, BTQ, BTC

            if (!nombre || !apellido || !curso || !seccion) {
                mensajeConfirmacion.style.color = "red";
                mensajeConfirmacion.textContent = "Todos los campos son obligatorios.";
                return;
            }

            // Validar si está en la lista de 3ro BTI
            if (curso === "3ro" && seccion === "BTI") {
                const nombreCompleto = `${nombre} ${apellido}`.toLowerCase();
                const estaEnLista = listaEstudiantesBTI.some(est =>
                    est.toLowerCase() === nombreCompleto
                );

                if (!estaEnLista) {
                    mensajeConfirmacion.style.color = "red";
                    mensajeConfirmacion.textContent = "No estás en la lista autorizada para 3ro BTI.";
                    return;
                }
            }

            // Verificar duplicado
            let registros = JSON.parse(localStorage.getItem("asistencias")) || [];
            const yaRegistrado = registros.some(reg =>
                reg.nombre.toLowerCase() === nombre.toLowerCase() &&
                reg.apellido.toLowerCase() === apellido.toLowerCase() &&
                reg.curso === curso &&
                reg.seccion.toUpperCase() === seccion
            );

            if (yaRegistrado) {
                mensajeConfirmacion.style.color = "red";
                mensajeConfirmacion.textContent = "Ya se ha registrado una asistencia con estos datos.";
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

            mensajeConfirmacion.style.color = "#00ffae";
            mensajeConfirmacion.textContent = "✔ Asistencia confirmada correctamente.";
            form.reset();
        });
    } else {
        console.error("No se encontró el formulario con id='loginform'");
    }
});
