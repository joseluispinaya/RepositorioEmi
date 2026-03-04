
// Variable global para que puedas re-usar tu select
let $selectCarreras;

$(document).ready(function () {
    // 1. Inicializamos la variable apuntando a tu elemento <select>
    // Asumiendo que tu HTML es: <select id="cboCarreras" class="form-control" multiple></select>
    $selectCarreras = $("#cboCarreras");

    // 2. Cargamos los datos desde el servidor
    cargarCarrerasMultiples();
});

function cargarCarrerasMultiples() {
    $selectCarreras.html('<option value="">Cargando carreras...</option>');

    // Supongamos que este WebMethod devuelve una Respuesta<List<CarreraParaSelectDTO>>
    $.ajax({
        url: "CarrerasPage.aspx/ListaCarreras",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const carreras = response.d.Data;
                let htmlOpciones = '';

                // Agrupamos las carreras por el Nombre del Grado usando JavaScript
                const grupos = agruparPorGrado(carreras);

                // Construimos el HTML de los <optgroup>
                for (const grado in grupos) {
                    htmlOpciones += `<optgroup label="${grado}">`;

                    grupos[grado].forEach(carrera => {
                        htmlOpciones += `<option value="${carrera.IdCarrera}">${carrera.Nombre}</option>`;
                    });

                    htmlOpciones += `</optgroup>`;
                }

                // Insertamos el HTML en el select
                $selectCarreras.html(htmlOpciones);

                // INICIALIZAMOS SELECT2 DESPUÉS DE LLENARLO
                $selectCarreras.select2({
                    placeholder: "Seleccione las carreras...",
                    allowClear: true,
                    width: '100%' // Importante para Color Admin
                });

            } else {
                $selectCarreras.html('');
                MensajeToast("Error", "No se pudieron cargar las carreras.", "error");
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $selectCarreras.html('');
        }
    });
}

// Función auxiliar para agrupar el array de objetos por una propiedad
function agruparPorGrado(array) {
    return array.reduce((acc, obj) => {
        const key = obj.NombreGrado; // La clave por la que agrupamos
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

function esImagen(file) {
    return file && file.type.startsWith("image/");
}

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        $('#imgDocente').attr('src', "Imagen/sinimagen.png");
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagen(file)) {
        MensajeToast("Error", "El archivo seleccionado no es una imagen válida.", "error");

        $('#imgDocente').attr('src', "Imagen/sinimagen.png");
        input.value = ""; // Limpia el input de archivo
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgDocente').attr('src', e.target.result);
    reader.readAsDataURL(file);
}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});

$("#btnGuardarReg").on("click", function () {
    // 1. Obtener los valores seleccionados del Select2
    // val() en un select múltiple devuelve un Array: Ej. ["1", "4", "5"]
    // Si no hay nada seleccionado, devuelve un Array vacío o null.
    let carrerasSeleccionadas = $selectCarreras.val() || [];

    // 3. Validación
    if (carrerasSeleccionadas.length === 0) {
        MensajeToast("Atención", "Debe seleccionar al menos una carrera para el docente.", "warning");
        return;
    }

    // 2. VER EN CONSOLA LO QUE PEDISTE
    console.log("Valores crudos del Select2:", carrerasSeleccionadas);

    // Si quieres verlo como un string separado por comas:
    let stringParaBackend = carrerasSeleccionadas.join(',');
    console.log("String para el backend:", stringParaBackend);

    const textoSms = `Detalles del Carreras: ${stringParaBackend}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info");
})

// fin