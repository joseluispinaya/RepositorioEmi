
$("#btnNuevore").on("click", function () {

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