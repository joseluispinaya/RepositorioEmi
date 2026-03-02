namespace CapaEntidad.Entidades
{
    public class EDetalleRecomendacion
    {
        public int IdDetalle { get; set; }
        public int IdSolicitud { get; set; }
        public int IdDocente { get; set; }
        public decimal PuntajeAfinidad { get; set; }
        public string Justificacion { get; set; }
        public int Orden { get; set; }
    }
}
