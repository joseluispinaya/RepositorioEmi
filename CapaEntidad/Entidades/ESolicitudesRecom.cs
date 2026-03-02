using System;

namespace CapaEntidad.Entidades
{
    public class ESolicitudesRecom
    {
        public int IdSolicitud { get; set; }
        public int IdEstudiante { get; set; }
        public string TituloPropuesto { get; set; }
        public string AnalisisGeneralIA { get; set; }
        public DateTime FechaSolicitud { get; set; }
        //public string FechaSolicitudSt { get; set; }
    }
}
