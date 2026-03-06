
let RevisoresSeleccionados = [];
// Variable global para capturar el ID de la URL
let idProyectoActual = 0;

$(document).ready(function () {
    cargarGradosGe();
    cargarBuscadorEstudiantes();
    cargarBuscadorDocentes();
    cargarTiposRevisores();
    cargarBuscadorRevisor();
});

// inicio combo dependiente de grados academicos a carreras en modulo proyecto
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
    cargarCarrerasGen(idGradoAcademico, null); // Pasamos null porque es cambio manual
});

function cargarCarrerasGen(idGradoAcademico, carrerasPreseleccionado) {
    // Si no hay aspecto, limpiar criterio
    if (!idGradoAcademico) {
        $("#cboCarrerasGe").html('<option value="">-- Seleccione --</option>');
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
            $("#cboCarrerasGe").empty();
            $("#cboCarrerasGe").append('<option value="">-- Seleccione --</option>');

            if (response.d.Estado) {
                $.each(response.d.Data, function (i, item) {
                    $("#cboCarrerasGe").append(`<option value="${item.IdCarrera}">${item.Nombre}</option>`);
                });

                // --- CLAVE PARA EDICIÓN ---
                // Si mandamos un ID para pre-seleccionar, lo ponemos aquí
                if (carrerasPreseleccionado) {
                    $("#cboCarrerasGe").val(carrerasPreseleccionado);
                }
            }
        }
    });
}

// fin combo dependiente de grados academicos a carreras en modulo proyecto
function cargarTiposRevisores() {

    $("#cboTiposRevisor").html('<option value="">Cargando tipos...</option>');

    $.ajax({
        url: "ModuloProyectoPage.aspx/ListaTipoRevisores",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                let opcionesHTML = '<option value="">-- Seleccione Revisor --</option>';

                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdTipoRevisor}">${row.Nombre}</option>`;
                });
                $("#cboTiposRevisor").html(opcionesHTML);

            } else {
                $("#cboTiposRevisor").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboTiposRevisor").html('<option value="">Error de conexión</option>');
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

    // Operador ternario moderno o fallback seguro
    let imagenMostrar = data.imagen ? data.imagen : 'Imagen/sinimagen.png';
    $("#txtImagens").val(imagenMostrar);

    $("#cboBuscarRevisores").val(null).trigger("change");
});

$("#btnAgregar").on("click", function () {
    const idRev = $("#txtIRevisr").val();

    // MEJORA 1: Validar que realmente se haya seleccionado un docente
    if (idRev === "0" || idRev === "") {
        MensajeToast("Atención", "Por favor, busque y seleccione un docente revisor primero.", "warning");
        $("#cboBuscarRevisores").select2('open'); // Abrir el Select2 automáticamente
        return;
    }

    let tipoId = $("#cboTiposRevisor").val();
    let tipoNombre = $("#cboTiposRevisor option:selected").text();

    // Validacion de Tipo Revisor
    if (!tipoId || tipoId === "") {
        MensajeToast("Atención", "Por favor, seleccione un Rol (Tipo Revisor).", "warning");
        $("#cboTiposRevisor").focus();
        return;
    }

    // Validacion: ¿Ese docente ya es revisor en este proyecto?
    let existe = RevisoresSeleccionados.find(p => p.IdDocente == idRev);
    if (existe) {
        MensajeToast("Alerta", "Ese docente ya fue agregado al grupo de revisores.", "warning");
        limpiarCamposRevisor(); // Limpiamos para que intente con otro
        return;
    }

    // Validacion: ¿Ese rol ya está ocupado? (Ej: Ya hay un "Revisor 1")
    let repetido = RevisoresSeleccionados.find(p => p.IdTipoRevisor == tipoId);
    if (repetido) {
        MensajeToast("Alerta", `El rol de "${tipoNombre}" ya está ocupado.`, "warning");
        return;
    }

    let nuevoRevisor = {
        IdDocente: parseInt(idRev),
        IdTipoRevisor: parseInt(tipoId),
        NombreTipo: tipoNombre,
        NombreCompleto: $("#txtNombrecompletoRe").val(),
        Imagen: $("#txtImagens").val()
    };

    // Agregar al array global y repintar tabla
    RevisoresSeleccionados.push(nuevoRevisor);

    limpiarCamposRevisor();
    mostrarTablaRevisores();
})

// 3. FUNCIÓN AUXILIAR PARA LIMPIAR CAMPOS
function limpiarCamposRevisor() {
    $("#txtIRevisr").val("0");
    $("#txtImagens").val("");
    $("#txtNombrecompletoRe").val("");
    $("#cboTiposRevisor").val(""); // Regresa al placeholder del combo de roles
}

// 4. REPINTAR LA TABLA (Template Strings)
function mostrarTablaRevisores() {
    const tbody = $("#tbRevisores tbody");
    tbody.empty(); // Limpiar tabla

    // Si no hay revisores, mostrar un mensaje bonito
    if (RevisoresSeleccionados.length === 0) {
        tbody.append(`
            <tr>
                <td colspan="4" class="text-center text-muted py-3">
                    Ningún revisor asignado todavía.
                </td>
            </tr>
        `);
        return;
    }

    // MEJORA 3 y 4: Pintar filas con Template Strings y estilos de Color Admin
    let htmlFilas = "";

    RevisoresSeleccionados.forEach((item, index) => {
        htmlFilas += `
            <tr>
                <td>
                    <img src="${item.Imagen}" class="rounded h-30px" alt="Foto Revisor">
                </td>
                
                <td class="fw-bold text-dark">${item.NombreTipo}</td>
                
                <td>${item.NombreCompleto}</td>
                
                <td class="with-btn" nowrap>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminarRevisor(${index})">
                        <i class="fas fa-trash-can"></i> Quitar
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.html(htmlFilas);
}

function mostrarTablaRevisoresOrigi() {
    $("#tbRevisores tbody").html(""); // Limpiar tabla

    RevisoresSeleccionados.forEach((item, index) => {
        $("#tbRevisores tbody").append(
            $("<tr>").append(
                // Botón Eliminar
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-icon btn-circle")
                        .attr("onclick", `eliminarRevisor(${index})`) // Llamada directa
                        .append($("<i>").addClass("fas fa-trash-can"))
                ),
                $("<td>").text(item.NombreTipo),
                $("<td>").text(item.NombreCompleto),
                $("<td>").append(
                    $("<img>")
                        .attr("src", item.Imagen)
                        .addClass("rounded h-30px")
                )
            )
        );
    });
}

window.eliminarRevisor = function (index) {
    RevisoresSeleccionados.splice(index, 1); // Quitar del array
    mostrarTablaRevisores(); // Repintar tabla
}

// logica para mostrar pdf en modulo proyecto

const TAMANO_MAXIMO = 4 * 1024 * 1024; // 4 MB en bytes

function mostrarPdfSelectProyec(input) {
    let file = input.files[0];

    // 1. Si NO se seleccionó archivo (Cancelado o vacío)
    if (!file) {
        resetearVistaPdfproy(input);
        return;
    }

    // 2. Validación: Tipo de archivo
    if (!esPdfValidaPro(file)) {
        MensajeToast("Error", "El archivo seleccionado no es un PDF válido.", "error");
        resetearVistaPdfproy(input);
        return;
    }

    // 3. Validación: Tamaño máximo
    if (file.size > TAMANO_MAXIMO) {
        MensajeToast("Error", "El archivo supera el tamaño máximo permitido de 4 MB.", "error");
        resetearVistaPdfproy(input);
        return;
    }

    // 4. PREVISUALIZACIÓN OPTIMIZADA
    // createObjectURL es mucho más rápido y ligero que FileReader para PDFs
    let blobUrl = URL.createObjectURL(file);
    $('#verPdf').attr('src', blobUrl);
}

// Función auxiliar para validar que sea PDF
function esPdfValidaPro(file) {
    // Validamos por extensión y por tipo MIME
    const extension = file.name.split('.').pop().toLowerCase();
    return file.type === 'application/pdf' || extension === 'pdf';
}

// Función auxiliar para limpiar (DRY - Don't Repeat Yourself)
function resetearVistaPdfproy(input) {
    $('#verPdf').attr('src', "Docpdf/sindoc.pdf");
    input.value = ""; // Limpia el input file
}

$('#txtpdf').change(function () {
    mostrarPdfSelectProyec(this);
});

// fin logica para mostrar pdf en modulo proyecto
function habilitarBoton() {
    $('#btnGuardarReg').prop('disabled', false);
}

$("#btnGuardarReg").on("click", function () {

    //let listaFinal = [];

    $('#btnGuardarReg').prop('disabled', true);
    let idEstudiante = $("#txtIdEstud").val().trim();
    let idDocenteTutor = $("#txtIdTutor").val().trim();

    if (RevisoresSeleccionados.length < 1) {
        MensajeToast("Atención", "Debe Agregar Revisores del Proyecto.", "warning");
        habilitarBoton();
        return;
    }

    if ($("#cboCarrerasGe").val() === "") {
        MensajeToast("Atención", "Debe seleccionar una carrera del proyecto", "warning");
        $("#cboCarrerasGe").focus();
        habilitarBoton();
        return;
    }

    if (idEstudiante === "0" || idEstudiante === "") {
        MensajeToast("Atención", "Debe seleccionar el Estudiante autor", "warning");
        habilitarBoton();
        return;
    }

    if (idDocenteTutor === "0" || idDocenteTutor === "") {
        MensajeToast("Atención", "Debe seleccionar al Tutor", "warning");
        habilitarBoton();
        return;
    }

    if ($("#txtTitulo").val().trim() === "") {
        MensajeToast("Atención", "Debe completar el Titulo del Proyecto", "warning");
        $("#txtTitulo").focus();
        habilitarBoton();
        return;
    }

    // Reemplaza tu forEach por esto:
    let listaFinal = RevisoresSeleccionados.map(item => {
        return {
            IdDocente: item.IdDocente,
            IdTipoRevisor: item.IdTipoRevisor
        };
    });

    // RevisoresSeleccionados.forEach((item) => {
    //     listaFinal.push({
    //         IdDocente: item.IdDocente,
    //         IdTipoRevisor: item.IdTipoRevisor
    //     });
    // });

    // 3. Construir el objeto principal Docente
    const objeto = {
        IdProyecto: parseInt(idProyectoActual),
        IdEstudiante: parseInt($("#txtIdEstud").val()),
        IdDocente: parseInt($("#txtIdTutor").val()),
        IdCarrera: parseInt($("#cboCarrerasGe").val()),
        Titulo: $("#txtTitulo").val().trim(),
        DocPdfUrl: ""
    };

    // 4. Leer Archivo PDF
    const filePdf = document.getElementById('txtpdf').files[0];


    // Función auxiliar para leer archivo como promesa
    const leerArchivo = (file) => {
        return new Promise((resolve) => {
            // Si no hay archivo (ej: al editar no suben nuevo PDF), resolvemos vacío inmediatamente
            if (!file) {
                resolve("");
                return; // Importante el return para que no intente usar FileReader
            }

            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result.split(',')[1]); // Quitamos la cabecera Base64
            reader.readAsDataURL(file);
        });
    };

    // Como solo es un archivo, llamamos a la promesa directamente (sin Promise.all)
    leerArchivo(filePdf).then((base64Pdf) => {
        enviarAjaxProyectos(objeto, listaFinal, base64Pdf);
    });

})

function enviarAjaxProyectos(objetoProyecto, listaRevisores, base64Pdf) {

    $.LoadingOverlay("show");

    $.ajax({
        url: "ModuloProyectoPage.aspx/GuardarOrEditProyecto",
        type: "POST",
        // Aquí pasamos los 3 parámetros que pide el WebMethod
        data: JSON.stringify({
            oProyectoGrado: objetoProyecto,
            listaRevisores: listaRevisores,
            base64Pdf: base64Pdf
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            MensajeSweet(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor,
                function () {
                    if (response.d.Estado) {
                        window.location.href = "ProyectosPage.aspx";
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