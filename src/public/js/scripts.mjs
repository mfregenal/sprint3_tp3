async function confirmarEliminacion(event, id) {
    event.preventDefault();
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este superhéroe?");
    if (confirmacion) {
        try {
            const response = await fetch(`/api/heroes/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert("Superhéroe eliminado correctamente.");
                location.reload();
            } else {
                alert("Hubo un problema al eliminar el superhéroe.");
            }
        } catch (error) {
            alert("Error de conexión: " + error.message);
        }
    }
}

// Hacerla accesible desde el HTML
window.confirmarEliminacion = confirmarEliminacion;


function agregarCampo(contenedorId, nombreCampo, placeholder) {
    let contenedor = document.getElementById(contenedorId);

    // Crear el nuevo campo de entrada
    let nuevoCampo = document.createElement('input');
    nuevoCampo.type = 'text';
    nuevoCampo.name = nombreCampo;
    nuevoCampo.placeholder = placeholder;
    if ( contenedorId == "poderes-container" ) {
        nuevoCampo.required = true;
        nuevoCampo.minLength = 3;
        nuevoCampo.maxLength = 60;
    }

    // Aplicar las clases de Tailwind CSS para el diseño
    nuevoCampo.className = 'w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500 mb-2';

    // Agregar el nuevo campo al contenedor
    contenedor.appendChild(nuevoCampo);
}

function agregarPoder() {
    agregarCampo('poderes-container', 'poderes[]', 'Nuevo poder');
}

window.agregarPoder = agregarPoder;

function agregarAliado() {
    agregarCampo('aliados-container', 'aliados[]', 'Nuevo aliado');
}

window.agregarAliado = agregarAliado;

function agregarEnemigo() {
    agregarCampo('enemigos-container', 'enemigos[]', 'Nuevo enemigo');
}

window.agregarEnemigo = agregarEnemigo;

// Enviar datos en formato JSON
async function enviarFormulario(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Extraer el ID de la URL si existe
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[4]; // Ajusta según la estructura de tu URL

    // Capturar los datos del formulario
    const formData = new FormData(event.target);
    const data = {
        nombreSuperHeroe: formData.get("nombreSuperheroe"),
        nombreReal: formData.get("nombreReal"),
        edad: Number(formData.get("edad")),
        planetaOrigen: formData.get("planetaOrigen"),
        debilidad: formData.get("debilidad"),
        poderes: formData.getAll("poderes[]"),
        aliados: formData.getAll("aliados[]"),
        enemigos: formData.getAll("enemigos[]"),
        creador: formData.get("creador")
    };

    // Definir URL y método según si hay un ID
    const url = id ? `/api/heroes/${id}/editar` : '/api/heroes/agregar';
    const method = id ? 'PUT' : 'POST';

    // Enviar los datos al servidor
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.text();
            // alert(`Superhéroe ${id ? 'actualizado' : 'agregado'} correctamente: ${JSON.stringify(result)}`);
            alert(result);
            window.location.href = "/api/heroes";
        } else {
            // alert("Hubo un problema al procesar la solicitud.");
        }
    } catch (error) {
        alert("Error de conexión: " + error.message);
    }
}

window.enviarFormulario = enviarFormulario;

function rellenarCampos(datos, contenedorId, nombreCampo) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ""; // Limpiar el contenedor

    datos.forEach(dato => {
        let campo = document.createElement('input');
        campo.type = 'text';
        campo.name = nombreCampo;
        campo.value = dato;
        campo.className = 'w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500 mb-2';
        contenedor.appendChild(campo);
        contenedor.appendChild(document.createElement('br'));
    });
}

async function cargarDatos() {
    try {
        const pathParts = window.location.pathname.split('/');
        const id = pathParts[4]; // Extraer el ID de la URL

        // console.log(`ID obtenido: ${id}`);

        const response = await fetch(`/api/heroes/${id}`);
        if (!response.ok) throw new Error(`Error en la respuesta: ${response.status}`);

        const data = await response.json();
        // console.log('Datos del héroe:', data);

        document.getElementById('nombreSuperheroe').value = data.nombreSuperHeroe || "";
        document.getElementById('nombreReal').value = data.nombreReal || "";
        document.getElementById('edad').value = data.edad || "";
        document.getElementById('planetaOrigen').value = data.planetaOrigen || "";
        document.getElementById('debilidad').value = data.debilidad || "";
        document.getElementById('creador').value = data.creador || "";

        rellenarCampos(data.poderes, 'poderes-container', 'poderes[]');
        rellenarCampos(data.aliados, 'aliados-container', 'aliados[]');
        rellenarCampos(data.enemigos, 'enemigos-container', 'enemigos[]');

    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
}

window.onload = cargarDatos;