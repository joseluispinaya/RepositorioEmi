
// Variable global para que puedas re-usar tu select
let $selectCarreras;
// Variable global para capturar el ID de la URL
let idDocenteActual = 0;

$(document).ready(function () {
    $selectCarreras = $("#cboCarreras");

    const urlParams = new URLSearchParams(window.location.search);
    const idDocente = urlParams.get('id');
    idDocenteActual = urlParams.get('id') || 0;

    if (idDocente === "0" || idDocente === null) {
        // MODO: NUEVO REGISTRO
        $("#tituloPagina").text("Nuevo Docente");
        $("#cboEstado").val(1).prop("disabled", true);
        $('#verPdf').attr('src', "Docpdf/sindoc.pdf");
        $("#btnGuardarReg").text("Guardar Registro");

        // Cargamos las carreras normalmente
        cargarCarrerasMultiples(null);
    } else {
        // MODO: EDICIÓN
        $("#tituloPagina").text("Editar Docente");
        $("#btnGuardarReg").text("Actualizar Cambios");

        // Pasamos el ID para que cargue al docente DESPUÉS de cargar las carreras
        cargarCarrerasMultiples(idDocente);
    }
});

// Modificamos ligeramente tu función para recibir el ID
function cargarCarrerasMultiples(idDocenteParaEditar) {
    $selectCarreras.html('<option value="">Cargando carreras...</option>');

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
                const grupos = agruparPorGrado(carreras);

                for (const grado in grupos) {
                    htmlOpciones += `<optgroup label="${grado}">`;
                    grupos[grado].forEach(carrera => {
                        htmlOpciones += `<option value="${carrera.IdCarrera}">${carrera.Nombre}</option>`;
                    });
                    htmlOpciones += `</optgroup>`;
                }

                $selectCarreras.html(htmlOpciones);
                $selectCarreras.select2({
                    placeholder: "Seleccione las carreras...",
                    allowClear: true,
                    width: '100%'
                });

                // AQUÍ ESTÁ LA MAGIA: Si hay un ID para editar, lo llamamos ahora que el Select2 ya existe
                if (idDocenteParaEditar) {
                    cargarDatosDocenteParaEditar(idDocenteParaEditar);
                }

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

function cargarDatosDocenteParaEditar(idDocente) {
    var request = { IdDocente: parseInt(idDocente) };

    $.ajax({
        type: "POST",
        url: "DocentesPage.aspx/ObtenerDocentePorId",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if (response.d.Estado) {
                const data = response.d.Data;

                // 1. Llenar campos de texto básicos
                $("#txtNombrees").val(data.Nombres);
                $("#txtApellidos").val(data.Apellidos);
                $("#txtNroci").val(data.NroCi);
                $("#txtCorreo").val(data.Correo);
                $("#txtCelular").val(data.Celular);
                $("#txtResumen").val(data.ResumenPerfil);

                // 2. Estado (Suponiendo que tienes un select con 1 o 0)
                $("#cboEstado").val(data.Estado ? 1 : 0).prop("disabled", false);

                // 3. Imagen (Si tiene, la mostramos; si no, la de por defecto)
                if (data.ImagenUrl) {
                    $('#imgDocente').attr('src', data.ImagenUrl);
                } else {
                    $('#imgDocente').attr('src', "Imagen/sinimagen.png");
                }

                // 4. LLENAR EL SELECT2 MÚLTIPLE
                // La BD devuelve un string como "1,4,5". Lo convertimos a un array ["1", "4", "5"]
                if (data.IdsCarrerasList) {
                    let arrayCarreras = data.IdsCarrerasList.split(',');
                    // Le asignamos el array al select2 y forzamos su actualización visual con trigger
                    $selectCarreras.val(arrayCarreras).trigger('change');
                }

                // 5. Opcional: Si tienes un botón para ver/descargar el CV PDF actual
                $("#verPdf").attr("src", data.CVPdfUrl || "Docpdf/sindoc.pdf");
                //if (data.CVPdfUrl) {
                //    $("#linkVerCV").attr("href", data.CVPdfUrl).show();
                //} else {
                //    $("#linkVerCV").hide();
                //}

            } else {
                MensajeToast("Error", response.d.Mensaje, "error");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            MensajeToast("Error", "Error al conectar con el servidor.", "error");
        }
    });
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

const TAMANO_MAXIMO = 4 * 1024 * 1024; // 4 MB en bytes

function mostrarPdfSeleccionada(input) {
    let file = input.files[0];

    // 1. Si NO se seleccionó archivo (Cancelado o vacío)
    if (!file) {
        resetearVistaPdf(input);
        return;
    }

    // 2. Validación: Tipo de archivo
    if (!esPdfValida(file)) {
        MensajeToast("Error", "El archivo seleccionado no es un PDF válido.", "error");
        resetearVistaPdf(input);
        return;
    }

    // 3. Validación: Tamaño máximo
    if (file.size > TAMANO_MAXIMO) {
        MensajeToast("Error", "El archivo supera el tamaño máximo permitido de 4 MB.", "error");
        resetearVistaPdf(input);
        return;
    }

    // 4. PREVISUALIZACIÓN OPTIMIZADA
    // createObjectURL es mucho más rápido y ligero que FileReader para PDFs
    let blobUrl = URL.createObjectURL(file);
    $('#verPdf').attr('src', blobUrl);

    // Opcional: Liberar memoria cuando se cambie la imagen (limpieza)
    // if (window.pdfAnteriorUrl) URL.revokeObjectURL(window.pdfAnteriorUrl);
    // window.pdfAnteriorUrl = blobUrl;
}

// Función auxiliar para validar que sea PDF
function esPdfValida(file) {
    // Validamos por extensión y por tipo MIME
    const extension = file.name.split('.').pop().toLowerCase();
    return file.type === 'application/pdf' || extension === 'pdf';
}

// Función auxiliar para limpiar (DRY - Don't Repeat Yourself)
function resetearVistaPdf(input) {
    $('#verPdf').attr('src', "Docpdf/sindoc.pdf");
    input.value = ""; // Limpia el input file
}

$('#txtpdf').change(function () {
    mostrarPdfSeleccionada(this);
});

function habilitarBoton() {
    $('#btnGuardarReg').prop('disabled', false);
}

$("#btnGuardarReg").on("click", function () {

    $('#btnGuardarReg').prop('disabled', true);
    // 1. Obtener los valores seleccionados del Select2
    // val() en un select múltiple devuelve un Array: Ej. ["1", "4", "5"]
    // Si no hay nada seleccionado, devuelve un Array vacío o null.

    // 1. Validaciones
    let carrerasSeleccionadas = $selectCarreras.val() || [];
    if (carrerasSeleccionadas.length === 0) {
        MensajeToast("Atención", "Debe seleccionar al menos una carrera para el docente.", "warning");
        habilitarBoton();
        return;
    }

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        MensajeToast("Advertencia", mensaje, "warning");
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        habilitarBoton();
        return;
    }

    // Validación del Resumen
    if ($("#txtResumen").val().trim().length < 400) {
        MensajeToast("Atención", "El resumen profesional debe tener al menos 400 caracteres.", "warning");
        $("#txtResumen").focus();
        habilitarBoton();
        return;
    }

    // 2. Construir la lista de carreras para C# [{ IdCarrera: 1 }, { IdCarrera: 2 }]
    let listaCarrerasObj = carrerasSeleccionadas.map(id => {
        return { IdCarrera: parseInt(id) };
    });

    // 3. Construir el objeto principal Docente
    const objeto = {
        IdDocente: parseInt(idDocenteActual),
        Nombres: $("#txtNombrees").val().trim(),
        Apellidos: $("#txtApellidos").val().trim(),
        NroCi: $("#txtNroci").val().trim(),
        Celular: $("#txtCelular").val().trim(),
        Correo: $("#txtCorreo").val().trim(),
        ResumenPerfil: $("#txtResumen").val().trim(),
        Estado: $("#cboEstado").val() == "1" ? true : false,
        // Los enviaremos vacíos inicialmente, el backend se encarga
        ImagenUrl: "",
        CVPdfUrl: ""
    };

    // 4. Leer Archivos (Foto y PDF)
    const fileFoto = document.getElementById('txtFoto').files[0];
    const filePdf = document.getElementById('txtpdf').files[0];

    let base64Foto = "";
    let base64Pdf = "";

    // Función auxiliar para leer archivos como promesa (para esperar a que ambos se lean)
    const leerArchivo = (file) => {
        return new Promise((resolve) => {
            if (!file) resolve("");
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result.split(',')[1]); // Quitamos cabecera
            reader.readAsDataURL(file);
        });
    };

    // Leemos ambos archivos (si existen) y luego disparamos el AJAX
    Promise.all([leerArchivo(fileFoto), leerArchivo(filePdf)]).then((resultados) => {
        base64Foto = resultados[0];
        base64Pdf = resultados[1];

        enviarAjaxDocente(objeto, listaCarrerasObj, base64Foto, base64Pdf);
    });

})

function enviarAjaxDocente(objetoDocente, listaCarreras, base64Foto, base64Pdf) {

    // Mostramos Loading en toda la página (Color Admin style o genérico)
    $.LoadingOverlay("show");

    $.ajax({
        url: "DocentesPage.aspx/GuardarOrEditDocente",
        type: "POST",
        // Aquí pasamos los 4 parámetros que pide el WebMethod
        data: JSON.stringify({
            oDocente: objetoDocente,
            listaCarreras: listaCarreras,
            base64Image: base64Foto,
            base64Pdf: base64Pdf
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            // Usando tu helper de SweetAlert que hicimos antes
            MensajeSweet(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor,
                function () {
                    if (response.d.Estado) {
                        // Si todo salió bien, redirigimos a la lista
                        window.location.href = "ListaDocentesPage.aspx";
                    }
                }
            );
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            mostrarAlerta("¡Advertencia!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $.LoadingOverlay("hide");
            habilitarBoton();
        }
    });
}

// fin