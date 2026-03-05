namespace CapaEntidad.DTOs
{
    public class RevisorDTO
    {
        public int IdTipoRevisor { get; set; }
        public int IdRevisor { get; set; }
        public string TipoReviNombre { get; set; } // Ej: "Revisor 1", "Revisor 2"
        public string RevisorNombreCompleto { get; set; }
        public string RevisorCi { get; set; }
        public string RevisorCelular { get; set; }
        public string RevisorCorreo { get; set; }
        public string RevisorImagen { get; set; }
    }
}
