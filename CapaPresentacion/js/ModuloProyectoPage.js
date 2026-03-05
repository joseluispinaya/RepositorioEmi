
let JuradoSeleccionados = [];

$(document).ready(function () {
    cargarGradosGe();
    cargarBuscadorEstudiantes();
    cargarBuscadorDocentes();
    cargarBuscadorRevisor();
});

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

function cargarBuscadorEstudiantes() {
    $("#cboBuscarEstudiante").select2({
        ajax: {
            url: "EstudiantesPage.aspx/FiltroEstudiantes",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ busqueda: params.term });
            },
            processResults: function (data) {
                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdEstudiante,
                        text: item.Nombres + ' ' + item.Apellidos,
                        nroCi: item.NroCi,
                        codigo: item.Codigo,
                        imagen: item.ImagenEstUrl,
                        dataCompleta: item
                    }))
                };
            },
        },
        language: "es",
        placeholder: 'Buscar por Nombre o CI...',
        minimumInputLength: 3,
        templateResult: formatoResultadosEstudiante
    });
}

function formatoResultadosEstudiante(data) {
    if (data.loading) return data.text;

    var imagenMostrar = data.imagen ? data.imagen : 'Imagen/sinimagen.png';

    var contenedor = $(
        `<div class="d-flex align-items-center">
            <img src="${imagenMostrar}" style="height:40px; width:40px; margin-right:10px; border-radius:50%; object-fit:cover;"/>
            <div>
                <div style="font-weight: bold;">${data.text}</div>
                <div style="font-size: 0.85em; color: #666;">CI: ${data.nroCi} | Cod: ${data.codigo}</div>
            </div>
         </div>`
    );

    return contenedor;
}

$("#cboBuscarEstudiante").on("select2:select", function (e) {
    const data = e.params.data;
    $("#txtIdEstud").val(data.id);
    $("#lblNombrecom").text("Est: " + data.text);
    $("#lblDatos").text("Nro CI: " + data.nroCi + " Cod: " + data.codigo);
    $("#imgEstud").attr("src", data.imagen || "Imagen/sinimagen.png");
    $("#cboBuscarEstudiante").val(null).trigger("change");
});

function cargarBuscadorDocentes() {
    $("#cboBuscarDocente").select2({
        ajax: {
            url: "DocentesPage.aspx/FiltroDocentes",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ busqueda: params.term });
            },
            processResults: function (data) {
                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdDocente,
                        text: item.Nombres + ' ' + item.Apellidos,
                        nroCi: item.NroCi,
                        celular: item.Celular,
                        imagen: item.ImagenUrl,
                        dataCompleta: item
                    }))
                };
            },
        },
        language: "es",
        placeholder: 'Buscar por Nombre o CI...',
        minimumInputLength: 3,
        templateResult: formatoResultadosDocente
    });
}

function formatoResultadosDocente(data) {
    if (data.loading) return data.text;

    var imagenMostrar = data.imagen ? data.imagen : 'Imagen/sinimagen.png';

    var contenedor = $(
        `<div class="d-flex align-items-center">
            <img src="${imagenMostrar}" style="height:40px; width:40px; margin-right:10px; border-radius:50%; object-fit:cover;"/>
            <div>
                <div style="font-weight: bold;">${data.text}</div>
                <div style="font-size: 0.85em; color: #666;">CI: ${data.nroCi} | Cel: ${data.celular}</div>
            </div>
         </div>`
    );

    return contenedor;
}

$("#cboBuscarDocente").on("select2:select", function (e) {
    const data = e.params.data;
    $("#txtIdTutor").val(data.id);
    $("#lblNombrecomTu").text("Nom: " + data.text);
    $("#lblDatosTu").text("Nro CI: " + data.nroCi + " Cel: " + data.celular);
    $("#imgDocente").attr("src", data.imagen || "Imagen/sinimagen.png");
    $("#cboBuscarDocente").val(null).trigger("change");
});

function cargarBuscadorRevisor() {
    $("#cboBuscarRevisores").select2({
        ajax: {
            url: "DocentesPage.aspx/FiltroDocentes",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ busqueda: params.term });
            },
            processResults: function (data) {
                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdDocente,
                        text: item.Nombres + ' ' + item.Apellidos,
                        nroCi: item.NroCi,
                        celular: item.Celular,
                        imagen: item.ImagenUrl,
                        dataCompleta: item
                    }))
                };
            },
        },
        language: "es",
        placeholder: 'Buscar por Nombre o CI...',
        minimumInputLength: 3,
        templateResult: formatoResultadosRevis
    });
}

function formatoResultadosRevis(data) {
    if (data.loading) return data.text;

    var imagenMostrar = data.imagen ? data.imagen : 'Imagen/sinimagen.png';

    var contenedor = $(
        `<div class="d-flex align-items-center">
            <img src="${imagenMostrar}" style="height:40px; width:40px; margin-right:10px; border-radius:50%; object-fit:cover;"/>
            <div>
                <div style="font-weight: bold;">${data.text}</div>
                <div style="font-size: 0.85em; color: #666;">CI: ${data.nroCi} | Cel: ${data.celular}</div>
            </div>
         </div>`
    );

    return contenedor;
}

$("#cboBuscarRevisores").on("select2:select", function (e) {
    const data = e.params.data;
    $("#txtIRevisr").val(data.id);
    $("#txtNombrecompletoRe").val(data.text);

    var imagenMostrar = data.imagen ? data.imagen : 'Imagen/sinimagen.png';

    $("#txtImagens").val(imagenMostrar);
    $("#cboBuscarRevisores").val(null).trigger("change");
});

$("#btnAgregar").on("click", function () {
    const idRev = $("#txtIRevisr").val();
    let existe = JuradoSeleccionados.find(p => p.IdDocente == idRev);
    if (existe) {
        MensajeToast("Alerta", "El Revisor ya fue agregado al grupo.", "warning");
        return;
    }

    let tipoId = $("#cboGradosGe").val();
    let tipoNombre = $("#cboGradosGe option:selected").text();

    // Validacion antes de agregar nuevo est
    if (!tipoId) {
        MensajeToast("Atención", "Por favor, seleccionar un Tipo Revisor.", "warning");
        $("#cboGradosGe").focus();
        return;
    }

    let nuevoRevisor = {
        IdDocente: parseInt(idRev),
        IdTipoAct: parseInt(tipoId),
        NombreTipo: tipoNombre,
        NombreCompleto: $("#txtNombrecompletoRe").val(),
        Imagen: $("#txtImagens").val()
    };

    // C) Agregar al array global
    JuradoSeleccionados.push(nuevoRevisor);
    $("#txtIRevisr").val("0");
    $("#txtImagens").val("");
    $("#cboGradosGe").val("");
    $("#txtNombrecompletoRe").val("");

    console.log(JuradoSeleccionados);
})

// fin