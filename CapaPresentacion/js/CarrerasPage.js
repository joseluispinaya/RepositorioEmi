
let tablaData;
let idEditar = 0;

$(document).ready(function () {

    listaCarreras();
    cargarGradosAcade();
});

function listaCarreras() {
    if ($.fn.DataTable.isDataTable("#tbCarreras")) {
        $("#tbCarreras").DataTable().destroy();
        $('#tbCarreras tbody').empty();
    }

    tablaData = $("#tbCarreras").DataTable({
        responsive: true,
        "ajax": {
            "url": 'CarrerasPage.aspx/ListaCarreras',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdCarrera", "visible": false, "searchable": false },
            { "data": "Nombre" },
            { "data": "NombreGrado" },
            { "data": "CantiEstu" },
            {
                "data": "Estado", "className": "text-center", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-yellow text-black">Activo</span>';
                    else
                        return '<span class="badge bg-danger">Inactivo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-lime btn-editar btn-sm me-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="fas fa-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "100px",
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function cargarGradosAcade() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboGrados").html('<option value="">Cargando grados...</option>');

    $.ajax({
        url: "GradosPage.aspx/ListaGradosAcademicos",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione un Grado --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdGradoAcademico}">${row.Nombre}</option>`;
                });

                //$.each(response.d.Data, function (i, row) {
                //    if (row.Estado === true) {
                //        opcionesHTML += `<option value="${row.IdGradoAcademico}">${row.Nombre}</option>`;
                //    }
                //});

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboGrados").html(opcionesHTML);

            } else {
                $("#cboGrados").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboGrados").html('<option value="">Error de conexión</option>');
            mostrarAlerta("Error Crítico", "No se pudo conectar con el servidor.", "error");
        }
    });
}


$('#tbCarreras tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdCarrera;
    $("#txtNombre").val(data.Nombre);
    $("#cboGrados").val(data.IdGradoAcademico);
    $("#cboEstado").val(data.Estado ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");

});

$('#tbCarreras tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Est de: ${data.Nombre}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info");

});

$("#btnNuevore").on("click", function () {

    idEditar = 0;
    $("#txtNombre").val("");
    $("#cboGrados").val(""); // <-- Forma directa de resetear al valor "-- Seleccione --"
    //$("#cboGrados").val($("#cboGrados option:first").val());

    // Configuramos el estado por defecto
    $("#cboEstado").val(1);
    $("#cboEstado").prop("disabled", true);

    $("#modalLabeldetalle").text("Nuevo Registro");

    $("#modalAdd").modal("show");
})

function habilitarBoton() {
    $('#btnGuardarReg').prop('disabled', false);
}

$("#btnGuardarReg").on("click", function () {

    $('#btnGuardarReg').prop('disabled', true);

    if ($("#txtNombre").val().trim() === "") {
        MensajeToast("Campo incompleto", "Por favor, ingrese el nombre de la carrera.", "warning");
        $("#txtNombre").focus();
        habilitarBoton();
        return;
    }

    if ($("#cboGrados").val() === "") {
        MensajeToast("Campo incompleto", "Por favor, seleccionar un Grado Académico.", "warning");
        $("#cboGrados").focus();
        habilitarBoton();
        return;
    }

    const objeto = {
        IdCarrera: idEditar,
        IdGradoAcademico: parseInt($("#cboGrados").val()),
        Nombre: $("#txtNombre").val().trim(),
        Estado: ($("#cboEstado").val() === "1" ? true : false)
    }

    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");

    // 2. Enviar al Servidor
    $.ajax({
        type: "POST",
        url: "CarrerasPage.aspx/GuardarOrEditCarrera",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlerta(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                response.d.Mensaje, // Texto del servidor
                response.d.Valor // Icono (success/error/warning)
            );

            if (response.d.Estado) {
                $("#modalAdd").modal("hide");
                listaCarreras(); // Recargar el DataTable
                idEditar = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");
            MensajeToast("Error Crítico", "No se pudo conectar con el servidor.", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });

})

// fin