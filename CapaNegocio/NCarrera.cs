using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;

namespace CapaNegocio
{
    public class NCarrera
    {
        #region "PATRON SINGLETON"
        private static NCarrera instancia = null;
        private NCarrera() { }
        public static NCarrera GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NCarrera();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ECarrera>> ListaCarreras()
        {
            return DCarrera.GetInstance().ListaCarreras();
        }

        public Respuesta<List<ECarrera>> ObtenerCarrerasPorGrado(int idGradoAcademico)
        {
            return DCarrera.GetInstance().ObtenerCarrerasPorGrado(idGradoAcademico);
        }

        public Respuesta<int> GuardarOrEditCarrera(ECarrera oCarrera)
        {
            return DCarrera.GetInstance().GuardarOrEditCarrera(oCarrera);
        }
    }
}
