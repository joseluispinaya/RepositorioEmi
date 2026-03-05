
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
    // Mostramos la alerta de confirmación estilo Color Admin
    swal({
        title: '¿Editar Docente?',
        text: `¿Deseas modificar los datos de ${data.Nombres} ${data.Apellidos}?`,
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
            window.location.href = 'DocentesPage.aspx?id=' + data.IdDocente;
        }
    });

});

$('#tbDocentes tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalles de: ${data.Nombres} ${data.Apellidos}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info");

});

$("#btnNuevore").on("click", function (e) {
    e.preventDefault(); // Por si es un <a>

    // Para un registro nuevo, la redirección suele ser directa,
    // pero si también quieres ponerle un swal, puedes aplicar la misma lógica.
    // Aquí mandamos id=0 para indicar que es nuevo.
    window.location.href = 'DocentesPage.aspx?id=0';
});

$("#btnNuevorePrueba").on("click", function (e) {
    e.preventDefault();

    // Mostramos la alerta de confirmación estilo Color Admin
    swal({
        title: '¿Nuevo Docente?',
        text: '¿Deseas Registrar un nuevo Docente?',
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
            window.location.href = 'DocentesPage.aspx?id=0';
        }
    });
});



// fin