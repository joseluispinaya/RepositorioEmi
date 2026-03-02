namespace CapaEntidad.Entidades
{
    public class ECarrera
    {
        public int IdCarrera { get; set; }
        public int IdGradoAcademico { get; set; }
        public string Nombre { get; set; }
        public bool Estado { get; set; }
        public string NombreGrado { get; set; }
        public int NroEst { get; set; }

        public string CantiEstu =>
            NroEst == 0
            ? "0 Estudiantes"
            : NroEst == 1
                ? "1 Estudiante"
                : $"{NroEst} Estudiantes";
    }
}
