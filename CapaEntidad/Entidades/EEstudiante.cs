namespace CapaEntidad.Entidades
{
    public class EEstudiante
    {
        public int IdEstudiante { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string NroCi { get; set; }
        public string Codigo { get; set; }
        public string Correo { get; set; }
        public string Celular { get; set; }
        public string ClaveHash { get; set; }
        public string ImagenEstUrl { get; set; }
        public int IdCarrera { get; set; }
        public bool Estado { get; set; }
    }
}
