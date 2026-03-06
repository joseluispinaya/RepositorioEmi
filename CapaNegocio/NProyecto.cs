using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaEntidad.DTOs;

namespace CapaNegocio
{
    public class NProyecto
    {
        #region "PATRON SINGLETON"
        private static NProyecto instancia = null;
        private NProyecto() { }
        public static NProyecto GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NProyecto();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ETiposRevisor>> ListaTipoRevisores()
        {
            return DProyecto.GetInstance().ListaTipoRevisores();
        }

        public Respuesta<List<ProyectoResumenDTO>> ListarProyectosPorCarrera(int idCarrera)
        {
            return DProyecto.GetInstance().ListarProyectosPorCarrera(idCarrera);
        }

        public Respuesta<ReporteProyectoDTO> ObtenerDetalleReporteProyecto(int idProyecto)
        {
            return DProyecto.GetInstance().ObtenerDetalleReporteProyecto(idProyecto);
        }

        public Respuesta<int> GuardarOrEditProyecto(string ProyectoXml)
        {
            return DProyecto.GetInstance().GuardarOrEditProyecto(ProyectoXml);
        }
    }
}
