
let tablaData;
let idEditar = 0;

$(document).ready(function () {

    listaGrados();
});

function listaGrados() {
    if ($.fn.DataTable.isDataTable("#tbGrados")) {
        $("#tbGrados").DataTable().destroy();
        $('#tbGrados tbody').empty();
    }

    tablaData = $("#tbGrados").DataTable({
        responsive: true,
        "ajax": {
            "url": 'GradosPage.aspx/ListaGradosAcademicos',
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
            { "data": "IdGradoAcademico", "visible": false, "searchable": false },
            { "data": "Nombre" },
            { "data": "CantiCarreras" },
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

$('#tbGrados tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdGradoAcademico;
    $("#txtNombre").val(data.Nombre);
    //$("#cboEstado").val(data.Estado == true ? 1 : 0);
    $("#cboEstado").val(data.Estado ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");

});

$('#tbGrados tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Carreras de: ${data.Nombre}.`;
    detalleCarreras(data.IdGradoAcademico);
    $("#modalLabeldetalleCar").text(textoSms);
    $("#modalDetalles").modal("show");
    //mostrarAlerta("¡Mensaje!", textoSms, "info");

});

function detalleCarreras(idGradoAcademico) {

    if ($.fn.DataTable.isDataTable("#tbDetallesCa")) {
        $("#tbDetallesCa").DataTable().destroy();
        $('#tbDetallesCa tbody').empty();
    }

    var request = {
        IdGradoAcademico: parseInt(idGradoAcademico)
    };

    $("#tbDetallesCa").DataTable({
        responsive: true,
        searching: false, // Opcional: si quieres ocultar el buscador
        lengthChange: false,
        paging: true,
        info: false,
        //paging: false,    // Opcional: para ver todo de una vez
        //ordering: true,
        "ajax": {
            "url": 'CarrerasPage.aspx/ObtenerCarrerasPorGrado', // Asegúrate que la URL sea correcta
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
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
            {
                "data": "Estado", "className": "text-center", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-yellow text-black">Activo</span>';
                    else
                        return '<span class="badge bg-danger">Inactivo</span>';
                }
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#btnNuevore").on("click", function () {

    idEditar = 0;
    $("#txtNombre").val("");
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
        //MensajeGritter("Campo requerido", "Por favor, ingrese el nombre del grado.", "warning");
        MensajeToast("Campo incompleto", "Por favor, ingrese el nombre del grado.", "warning");
        $("#txtNombre").focus();
        habilitarBoton();
        return;
    }

    const objeto = {
        IdGradoAcademico: idEditar,
        Nombre: $("#txtNombre").val().trim(),
        Estado: ($("#cboEstado").val() == "1" ? true : false)
    }

    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");

    // 2. Enviar al Servidor
    $.ajax({
        type: "POST",
        url: "GradosPage.aspx/GuardarOrEditGradoAcademicos",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");
            // Usamos nuestro Helper de SweetAlert
            // response.d.Valor trae: "success", "warning", "error"
            //MensajeSweet(
            //    response.d.Estado ? '¡Excelente!' : 'Atención',
            //    response.d.Mensaje,
            //    response.d.Valor,
            //    function () {
            //        if (response.d.Estado) {
            //            $("#modalGrado").modal("hide");
            //            cargarTabla();
            //        }
            //    }
            //);
            mostrarAlerta(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                response.d.Mensaje, // Texto del servidor
                response.d.Valor // Icono (success/error/warning)
            );

            if (response.d.Estado) {
                $("#modalAdd").modal("hide");
                listaGrados(); // Recargar el DataTable
                idEditar = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");
            MensajeToast("Error Crítico", "No se pudo conectar con el servidor.", "error");
            //MensajeGritter("Error Crítico", "No se pudo conectar con el servidor.", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });

})

// fin