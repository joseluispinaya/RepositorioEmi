
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    listaDocentes();
});

function listaDocentes() {
    if ($.fn.DataTable.isDataTable("#tbDocentes")) {
        $("#tbDocentes").DataTable().destroy();
        $('#tbDocentes tbody').empty();
    }

    tablaData = $("#tbDocentes").DataTable({
        responsive: true,
        "ajax": {
            "url": 'ListaDocentesPage.aspx/ListaDocentesSimple',
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
            { "data": "IdDocente", "visible": false, "searchable": false },
            {
                "data": "ImagenUrl",
                "orderable": false,
                "searchable": false,
                "className": "text-center",
                render: function (data) {
                    if (!data) return '<img src="Imagen/sinimagen.png" alt="imagen" class="rounded h-30px my-n1 mx-n1">';

                    return `<img src="${data}" alt="imagen" class="rounded h-30px my-n1 mx-n1">`;
                }
            },
            { "data": "NombreCompleto" },
            { "data": "NroCi" },
            { "data": "Correo" },
            { "data": "Celular" },
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

$('#tbDocentes tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    //const textoSms = `Editar Doce con ID: ${data.IdDocente}.`;
    //mostrarAlerta("¡Mensaje!", textoSms, "info");

    window.location.href = 'DocentesPage.aspx?id=' + data.IdDocente;

});

$('#tbDocentes tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalles del Doce: ${data.Nombres}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info");

});

$("#btnNuevore").on("click", function () {
    // Caso 1: Nuevo Registro
    window.location.href = 'DocentesPage.aspx?id=' + idProyecto;
})

// fin