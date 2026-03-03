namespace CapaEntidad.DTOs
{
    public class EstudiantesDTO
    {
        public int IdEstudiante { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string NroCi { get; set; }
        public string Codigo { get; set; }
        public string Correo { get; set; }
        public string Celular { get; set; }
        public string ImagenEstUrl { get; set; }
        public bool Estado { get; set; }
        public int IdCarrera { get; set; }
        public string NombreCarrera { get; set; }
        public int IdGradoAcademico { get; set; }
        public string NombreGrado { get; set; }
        public string FullName => $"{Nombres} {Apellidos}";
    }
}
