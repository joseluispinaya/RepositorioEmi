using System;

namespace CapaEntidad.Entidades
{
    public class EProyectoGrado
    {
        public int IdProyecto { get; set; }
        public int IdEstudiante { get; set; }
        public int IdDocente { get; set; }
        public int IdCarrera { get; set; }
        public string Titulo { get; set; }
        public string DocPdfUrl { get; set; }
        public DateTime FechaRegistro { get; set; }
        //public string FechaRegistroSt { get; set; }
    }
}
