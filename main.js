function aplicarEstilosAleatorios() {
    const estiloAleatorio = Math.floor(Math.random() * 3) + 1;
    let estiloSeleccionado = "estilos/estilos.css"; // Estilo Original por defecto

    if (estiloAleatorio === 1) {
        estiloSeleccionado = "estilos/estilos.css";
    } else if (estiloAleatorio === 2) {
        estiloSeleccionado = "estilos/futuro.css";
    } else if (estiloAleatorio === 3) {
        estiloSeleccionado = "estilos/urbano.css";
    }

    const estilosCss = document.getElementById("estilosCss");
    estilosCss.href = estiloSeleccionado;
}

document.addEventListener("DOMContentLoaded", function () {
    const selectorEstilos = document.getElementById("selectorEstilos");
    const estilosCss = document.getElementById("estilosCss");
    const botonRecordar = document.getElementById("botonRecordar");
    let estiloAnterior = "estilos/estilos.css"; // Almacena el estilo anterior

    selectorEstilos.addEventListener("change", function () {
        estiloAnterior = estilosCss.getAttribute("href"); // Guarda el estilo anterior
        estilosCss.href = this.value;
    });
});


function cambiarColor(element) {
    const estilosCss = document.getElementById("estilosCss");

    // Verificar si el estilo seleccionado es "futuro.css" o "urbano.css"
    if (estilosCss.href.endsWith("futuro.css") || estilosCss.href.endsWith("urbano.css")) {
        return; // No aplicar cambio de color
    }

    if (element.tagName === "INPUT" || element.tagName === "SELECT") {
        element.style.backgroundColor = "#4d6d63";
        const fieldset = element.closest("fieldset");
        if (fieldset) {
            fieldset.style.backgroundColor = "#a6c1b9";
            const legend = fieldset.querySelector("legend");
            if (legend) {
                legend.style.backgroundColor = "#2b3d37";
            }
        }
    }
}

function restaurarColor(element) {
    const estilosCss = document.getElementById("estilosCss");

    // Verificar si el estilo seleccionado es "futuro.css" o "urbano.css"
    if (estilosCss.href.endsWith("futuro.css") || estilosCss.href.endsWith("urbano.css")) {
        return; // No restaurar el color
    }

    if (element.tagName === "INPUT" || element.tagName === "SELECT") {
        element.style.backgroundColor = "";
        const fieldset = element.closest("fieldset");
        if (fieldset) {
            fieldset.style.backgroundColor = "";
            const legend = fieldset.querySelector("legend");
            if (legend) {
                legend.style.backgroundColor = "";
            }
        }
    }
}

const elementos = document.querySelectorAll("input, select");

elementos.forEach(function (element) {
    element.addEventListener("click", function () {
        cambiarColor(element);
    });

    element.addEventListener("blur", function () {
        restaurarColor(element);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("miFormulario");

    if (formulario) {
        formulario.addEventListener("submit", function (event) {
            const camposObligatorios = formulario.querySelectorAll(
                "input[required], select[required], textarea[required]"
            );

            for (let i = 0; i < camposObligatorios.length; i++) {
                if (!camposObligatorios[i].value) {
                    event.preventDefault();
                    camposObligatorios[i].setCustomValidity("Este campo es obligatorio");
                } else {
                    camposObligatorios[i].setCustomValidity("");
                }
            }
        });

        const botonRestablecer = formulario.querySelector('input[type="reset"]');
        botonRestablecer.addEventListener("click", function () {
            formulario.reset();
            camposObligatorios.forEach(function (campo) {
                campo.setCustomValidity("");
            });
        });
    }
});


 //BOTON DE RECORDAR
document.addEventListener("DOMContentLoaded", function () {
    const selectorEstilos = document.getElementById("selectorEstilos");
    const estilosCss = document.getElementById("estilosCss");
    const botonRecordar = document.getElementById("botonRecordar");

    // Función para aplicar el estilo seleccionado
    function aplicarEstiloSeleccionado() {
        estilosCss.href = selectorEstilos.value;
        if (botonRecordar.classList.contains("recordando")) {
            localStorage.setItem("estiloIndexGuardado", selectorEstilos.selectedIndex);
        } else {
            // Si no se está recordando, limpiar el LocalStorage
            localStorage.removeItem("estiloIndexGuardado");
        }
    }

    // Obtener el índice del estilo almacenado en LocalStorage si existe
    const estiloIndexGuardado = localStorage.getItem("estiloIndexGuardado");

    if (estiloIndexGuardado !== null) {
        selectorEstilos.selectedIndex = parseInt(estiloIndexGuardado, 10);
        aplicarEstiloSeleccionado();
    }

    selectorEstilos.addEventListener("change", aplicarEstiloSeleccionado);

    botonRecordar.addEventListener("click", function () {
        if (botonRecordar.classList.contains("recordando")) {
            // Dejar de recordar estilos
            botonRecordar.classList.remove("recordando");
            // Limpiar el LocalStorage
            localStorage.removeItem("estiloIndexGuardado");
        } else {
            // Empezar a recordar estilos
            botonRecordar.classList.add("recordando");
            aplicarEstiloSeleccionado();
        }
    });

    // Aplicar el estilo original al cargar la página si no hay un estilo almacenado
    if (estiloIndexGuardado === null) {
        aplicarEstiloSeleccionado();
    }
});

/*
//BOTON RECORDAR PARA QUE FUNCIONE SIN EL SELECT, OSEA EXCLUSIVAMENTE LA PARTE DE BONUS 2

document.addEventListener("DOMContentLoaded", function () {
    const selectorEstilos = document.getElementById("selectorEstilos");
    const estilosCss = document.getElementById("estilosCss");
    const botonRecordar = document.getElementById("botonRecordar");
    let estiloSeleccionadoIndex = 0; // Índice del estilo seleccionado

    // Obtener el índice del estilo almacenado en LocalStorage si existe
    const estiloIndexGuardado = localStorage.getItem("estiloIndexGuardado");
    if (estiloIndexGuardado !== null) {
        estiloSeleccionadoIndex = parseInt(estiloIndexGuardado, 10);
        selectorEstilos.selectedIndex = estiloSeleccionadoIndex;
        estilosCss.href = selectorEstilos.value;
    }

    selectorEstilos.addEventListener("change", function () {
        estiloSeleccionadoIndex = selectorEstilos.selectedIndex;
        estilosCss.href = this.value;
    });

    botonRecordar.addEventListener("click", function () {
        if (estiloSeleccionadoIndex !== selectorEstilos.selectedIndex) {
            selectorEstilos.selectedIndex = estiloSeleccionadoIndex;
            estilosCss.href = selectorEstilos.value;
        } else {
            // Guardar el índice del estilo actual en LocalStorage
            localStorage.setItem("estiloIndexGuardado", selectorEstilos.selectedIndex);
        }
    });
});
*/

