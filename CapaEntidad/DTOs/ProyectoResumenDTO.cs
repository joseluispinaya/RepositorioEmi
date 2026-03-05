using System;

namespace CapaEntidad.DTOs
{
    public class ProyectoResumenDTO
    {
        public int IdProyecto { get; set; }
        public string EstNombreCompleto { get; set; }
        public string TutorNombreCompleto { get; set; }
        public string Titulo { get; set; }
        public string FechaRegistroSt { get; set; }
    }
}
