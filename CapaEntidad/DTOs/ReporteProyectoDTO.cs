using System.Collections.Generic;

namespace CapaEntidad.DTOs
{
    public class ReporteProyectoDTO
    {
        // Datos del Proyecto
        public int IdProyecto { get; set; }
        public int IdEstudiante { get; set; }
        public int IdTutor { get; set; }
        public int IdCarrera { get; set; }

        public string CarreraNombre { get; set; }
        public int IdGradoAcademico { get; set; }
        public string GradoNombre { get; set; }
        public string Titulo { get; set; }
        public string DocPdfUrl { get; set; }
        public string FechaRegistro { get; set; } // Lo dejamos como string para formatearlo fácil (ej: "dd/MM/yyyy")

        // Datos del Estudiante
        public string EstNombreCompleto { get; set; }
        public string EstCi { get; set; }
        public string EstCodigo { get; set; }
        public string EstCorreo { get; set; }
        public string EstImagen { get; set; }

        // Datos del Tutor
        public string TutorNombreCompleto { get; set; }
        public string TutorCi { get; set; }
        public string TutorCelular { get; set; }
        public string TutorCorreo { get; set; }
        public string TutorImagen { get; set; }
        // ==========================================
        // LISTA DE REVISORES ANIDADA
        // ==========================================
        public List<RevisorDTO> ListaRevisores { get; set; }
        // Constructor para inicializar la lista
        public ReporteProyectoDTO()
        {
            ListaRevisores = new List<RevisorDTO>();
        }
    }
}
