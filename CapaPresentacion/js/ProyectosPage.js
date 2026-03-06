
let tablaData;

$(document).ready(function () {
    $("#cboCarrerasGe").prop("disabled", true);
    cargarGradosGe();
})

function cargarGradosGe() {

    $("#cboGradosGe").html('<option value="">Cargando grados...</option>');

    $.ajax({
        url: "GradosPage.aspx/ListaGradosAcademicos",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                let opcionesHTML = '<option value="">-- Seleccione un Grado --</option>';

                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdGradoAcademico}">${row.Nombre}</option>`;
                });
                $("#cboGradosGe").html(opcionesHTML);

            } else {
                $("#cboGradosGe").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboGradosGe").html('<option value="">Error de conexión</option>');
            //mostrarAlerta("Error", "No se pudieron cargar los Grado academicos.", "error");
        }
    });
}

$("#cboGradosGe").on("change", function () {
    const idGradoAcademico = $(this).val();

    // 1. LIMPIEZA TOTAL EN CASCADA (Resetear hijos)
    $("#cboCarrerasGe").empty().append('<option value="">Seleccione una Carrera</option>');

    // 2. BLOQUEAR HIJOS
    $("#cboCarrerasGe").prop("disabled", true);

    // 3. LIMPIAR TABLA VISUALMENTE
    if ($.fn.DataTable.isDataTable("#tbProyect")) {
        $("#tbProyect").DataTable().clear().draw();
    }

    // 4. CARGAR SIGUIENTE NIVEL SI HAY SELECCIÓN
    if (idGradoAcademico) {
        //$("#cboCarrerasGe").prop("disabled", false);
        cargarCarrerasGe(idGradoAcademico);
    }
});

function cargarCarrerasGe(idGradoAcademico) {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboCarrerasGe").html('<option value="">Cargando carreras...</option>');

    var request = {
        IdGradoAcademico: parseInt(idGradoAcademico)
    };

    $.ajax({
        url: "CarrerasPage.aspx/ObtenerCarrerasPorGrado",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                const lista = response.d.Data;

                if (lista != null && lista.length > 0) {

                    // Empezamos con la opción por defecto
                    let opcionesHTML = '<option value="">-- Seleccione una Carrera --</option>';

                    // aqui ya no valido Estado lo realizo en mi procedimiento almacenado
                    $.each(lista, function (i, row) {
                        opcionesHTML += `<option value="${row.IdCarrera}">${row.Nombre}</option>`;
                    });

                    $("#cboCarrerasGe").html(opcionesHTML);
                    // Solo habilito si hay datos
                    $("#cboCarrerasGe").prop("disabled", false);
                } else {
                    $("#cboCarrerasGe").html('<option value="">No hay carreras en este grado</option>');
                    // Mantengo disabled true
                }

            } else {
                $("#cboCarrerasGe").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboCarrerasGe").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#cboCarrerasGe").on("change", function () {
    const idCarrera = $(this).val();

    // 3. LIMPIAR TABLA VISUALMENTE
    if ($.fn.DataTable.isDataTable("#tbProyect")) {
        $("#tbProyect").DataTable().clear().draw();
    }

    // 4. CARGAR SIGUIENTE NIVEL SI HAY SELECCIÓN
    if (idCarrera) {
        listaProyectos(idCarrera);
    }
});

function listaProyectos(idCarrera) {

    // 1. Limpieza si ya existe la tabla
    if ($.fn.DataTable.isDataTable("#tbProyect")) {
        $("#tbProyect").DataTable().destroy();
        $('#tbProyect tbody').empty();
    }

    var request = {
        IdCarrera: parseInt(idCarrera)
    };

    tablaData = $("#tbProyect").DataTable({
        responsive: true,
        "ajax": {
            "url": 'ProyectosPage.aspx/ListarProyectosPorCarrera',
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
            { "data": "IdProyecto", "visible": false, "searchable": false },
            { "data": "Titulo" },
            { "data": "EstNombreCompleto", "width": "190px" },
            { "data": "FechaRegistroSt" },
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

$('#tbProyect tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    // Mostramos la alerta de confirmación estilo Color Admin
    swal({
        title: '¿Editar Proyecto?',
        text: `¿Deseas modificar el proyecto ${data.Titulo}?`,
        icon: 'info',
        buttons: {
            cancel: {
                text: 'Cancelar',
                value: null,
                visible: true,
                className: 'btn btn-default',
                closeModal: true,
            },
            confirm: {
                text: 'Sí, editar',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true
            }
        }
    }).then((willEdit) => {
        // promise: willEdit será true si hizo clic en "Sí, editar"
        if (willEdit) {
            // Recién aquí hacemos la redirección pasando el ID real
            window.location.href = 'ModuloProyectoPage.aspx?id=' + data.IdProyecto;
        }
    });

});

$('#tbProyect tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Titulo: ${data.Titulo}.`;
    mostrarAlerta("¡Detalle!", textoSms, "info");

});

$("#btnNuevore").on("click", function (e) {
    e.preventDefault(); // Por si es un <a>
    //window.location.href = 'ModuloProyectoPage.aspx';
    window.location.href = 'ModuloProyectoPage.aspx?id=0';
});

// fin del combo en cascada