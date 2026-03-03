
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    $("#cboCarrerasGe").prop("disabled", true);
    cargarGradosAcademi();
    cargarGradosModal();
})

function cargarGradosModal() {

    $("#cboGrados").html('<option value="">Cargando grados...</option>');

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
                $("#cboGrados").html(opcionesHTML);

            } else {
                $("#cboGrados").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboGrados").html('<option value="">Error de conexión</option>');
            //mostrarAlerta("Error", "No se pudieron cargar los Grado academicos.", "error");
        }
    });
}

// --- LÓGICA DE CASCADA (ASPECTO -> CRITERIO) ---
$("#cboGrados").on("change", function () {
    const idGradoAcademico = $(this).val();
    cargarCarrerasModal(idGradoAcademico, null); // Pasamos null porque es cambio manual
});

function cargarCarrerasModal(idGradoAcademico, carrerasPreseleccionado) {
    // Si no hay aspecto, limpiar criterio
    if (!idGradoAcademico) {
        $("#cboCarreras").html('<option value="">-- Seleccione --</option>');
        return;
    }

    // AJAX para cargar carreras
    $.ajax({
        url: "CarrerasPage.aspx/ObtenerCarrerasPorGrado",
        type: "POST",
        data: JSON.stringify({ IdGradoAcademico: parseInt(idGradoAcademico) }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#cboCarreras").empty();
            $("#cboCarreras").append('<option value="">-- Seleccione --</option>');

            if (response.d.Estado) {
                $.each(response.d.Data, function (i, item) {
                    $("#cboCarreras").append(`<option value="${item.IdCarrera}">${item.Nombre}</option>`);
                });

                // --- CLAVE PARA EDICIÓN ---
                // Si mandamos un ID para pre-seleccionar, lo ponemos aquí
                if (carrerasPreseleccionado) {
                    $("#cboCarreras").val(carrerasPreseleccionado);
                }
            }
        }
    });
}

function cargarGradosAcademi() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboGradosGe").html('<option value="">Cargando grados...</option>');

    $.ajax({
        url: "GradosPage.aspx/ListaGradosAcademicos",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione un Grado --</option>';

                // aqui ya no valido Estado lo realizo en mi procedimiento almacenado
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
        }
    });
}

$("#cboGradosGe").on("change", function () {
    const idGradoAcademico = $(this).val();
    $("#cboCarrerasGe").prop("disabled", true);
    $("#cboCarrerasGe").html('<option value="">-- Seleccione una Carrera --</option>');

    if (idGradoAcademico) {
        cargarCarreras(idGradoAcademico);
        // 2. Cargamos TODOS los estudiantes de ese grado (Mandando 0 como IdCarrera)
        // Usamos parseInt para asegurarnos de que no viaje como string vacío
        listaEstudiantes(parseInt(idGradoAcademico), 0);
    } else {
        // Si seleccionó "-- Seleccione un Grado --" (vacío), limpiamos la tabla
        if ($.fn.DataTable.isDataTable("#tbEstudiantes")) {
            $("#tbEstudiantes").DataTable().clear().draw();
        }
    }
});

function cargarCarreras(idGradoAcademico) {

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
    const idGradoAcademico = $("#cboGradosGe").val();

    if (idCarrera && idGradoAcademico) {
        // Cargamos a los estudiantes filtrados por Grado y Carrera específica
        listaEstudiantes(parseInt(idGradoAcademico), parseInt(idCarrera));
    } else if (idGradoAcademico) {
        // Si regresó la carrera a "-- Seleccione una Carrera --" pero el Grado sigue seleccionado,
        // volvemos a mostrar a todos los del Grado (Mandamos 0).
        listaEstudiantes(parseInt(idGradoAcademico), 0);
    }
});

function listaEstudiantes(idGradoAcademico, idCarrera) {

    if ($.fn.DataTable.isDataTable("#tbEstudiantes")) {
        $("#tbEstudiantes").DataTable().destroy();
        $('#tbEstudiantes tbody').empty();
    }

    var request = {
        // Si el parseInt devuelve NaN o null, el operador '|| 0' lo convierte en un 0 seguro
        IdGradoAcademico: parseInt(idGradoAcademico) || 0,
        IdCarrera: parseInt(idCarrera) || 0
    };

    tablaData = $("#tbEstudiantes").DataTable({
        responsive: true,
        "ajax": {
            "url": 'EstudiantesPage.aspx/ListaEstudiantes',
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
            { "data": "IdEstudiante", "visible": false, "searchable": false },
            {
                "data": "ImagenEstUrl",
                "orderable": false,
                "searchable": false,
                "className": "text-center",
                render: function (data) {
                    if (!data) return '<img src="Imagen/sinimagen.png" alt="imagen" class="rounded h-30px my-n1 mx-n1">';

                    return `<img src="${data}" alt="imagen" class="rounded h-30px my-n1 mx-n1">`;
                }
            },
            { "data": "FullName" },
            { "data": "NroCi" },
            { "data": "Correo" },
            { "data": "NombreCarrera" },
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

$('#tbEstudiantes tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdEstudiante;
    $("#txtNombrees").val(data.Nombres);
    $("#txtCorreo").val(data.Correo);
    $("#txtApellidos").val(data.Apellidos);
    $("#txtCelular").val(data.Celular);
    $("#txtNroci").val(data.NroCi);
    $("#txtCodigo").val(data.Codigo);
    $("#cboEstado").val(data.Estado ? 1 : 0).prop("disabled", false);
    //$("#cboEstado").val(data.Estado ? 1 : 0);
    //$("#cboEstado").prop("disabled", false);

    // 2. MANEJO DE LA CASCADA INVERSA
    // A) Primero seteamos el Grado (Padre)
    $("#cboGrados").val(data.IdGradoAcademico);

    // B) Llamamos a cargarCriterios pero le pasamos el Hijo que queremos seleccionar
    //    Esto evita problemas de sincronía, ya que la selección se hace DENTRO del success del AJAX
    cargarCarrerasModal(data.IdGradoAcademico, data.IdCarrera);

    $("#imgEstud").attr("src", data.ImagenEstUrl || "Imagen/sinimagen.png");
    $("#txtFoto").val("");
    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");

});

$('#tbEstudiantes tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalles del Est: ${data.Nombres}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info");

});

$("#btnNuevore").on("click", function () {

    //const idGradoAcademico = $("#cboGrados").val();
    //const idCarrera = $("#cboCarreras").val();

    idEditar = 0;
    $("#txtNombrees").val("");
    $("#txtCorreo").val("");
    $("#txtApellidos").val("");
    $("#txtCelular").val("");
    $("#txtNroci").val("");
    $("#txtCodigo").val("");
    $("#cboEstado").val(1).prop("disabled", true);

    $('#imgEstud').attr('src', "Imagen/sinimagen.png");
    $("#txtFoto").val("");

    // IMPORTANTE: Resetear la cascada
    $("#cboGrados").val(""); // Limpiar padre
    $("#cboCarreras").empty().append('<option value="">-- Seleccione --</option>'); // Limpiar hijo

    $("#modalLabeldetalle").text("Nuevo Registro");
    $("#modalAdd").modal("show");
})

function esImagen(file) {
    return file && file.type.startsWith("image/");
}

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        $('#imgEstud').attr('src', "Imagen/sinimagen.png");
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagen(file)) {
        MensajeToast("Error", "El archivo seleccionado no es una imagen válida.", "error");

        $('#imgEstud').attr('src', "Imagen/sinimagen.png");
        input.value = ""; // Limpia el input de archivo
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgEstud').attr('src', e.target.result);
    reader.readAsDataURL(file);
}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});

// fin