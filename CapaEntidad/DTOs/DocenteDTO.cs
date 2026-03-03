namespace CapaEntidad.DTOs
{
    public class DocenteDTO
    {
        public int IdDocente { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }

        // Propiedad calculada de solo lectura
        public string NombreCompleto => $"{Nombres} {Apellidos}";

        public string NroCi { get; set; }
        public string Correo { get; set; }
        public string Celular { get; set; }
        public string ImagenUrl { get; set; }
        public string CVPdfUrl { get; set; }
        public string ResumenPerfil { get; set; }
        public bool Estado { get; set; }

        // Propiedades adicionales que vienen del SP (Agrupación de carreras)
        public string CarrerasAsignadas { get; set; }
        public string IdsCarrerasList { get; set; }
    }
}
