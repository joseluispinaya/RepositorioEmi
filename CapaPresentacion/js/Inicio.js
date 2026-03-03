

$(document).ready(function () {

	if ($('#data-table-default').length !== 0) {
		$('#data-table-default').DataTable({
			responsive: true
		});
	}
})

$('#add-regular').click(function () {
	$.gritter.add({
		title: 'This is a regular notice!',
		text: 'This will fade out after a certain amount of time. Sed tempus lacus ut lectus rutrum placerat. ',
		image: 'Imagen/success.png',
		sticky: false,
		time: ''
	});
	return false;
});

$('#btnNuevoReg').on('click', function () {

	$("#modalAdd").modal("show");
})

$('#btnSwaln').on('click', function () {

	mostrarAlerta("¡Mensaje!", "Este es un mensaje de texto", "success");
})

$('#btnAlertaa').on('click', function () {
	MensajeToast("Campo incompleto", "Por favor, ingrese el nombre del grado.", "warning");
	//MensajeGritter("Campo requerido", "Por favor, ingrese el nombre del grado.", "warning");
})

// fin