namespace CapaEntidad.Entidades
{
    public class EDocente
    {
        public int IdDocente { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string NroCi { get; set; }
        public string Correo { get; set; }
        public string Celular { get; set; }
        public string ClaveHash { get; set; }
        public string CVPdfUrl { get; set; }
        public string ImagenUrl { get; set; }
        public string ResumenPerfil { get; set; }
        public bool Estado { get; set; }
        public string FullName => $"{Nombres} {Apellidos}";
    }
}
