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
    public class NDocente
    {
        #region "PATRON SINGLETON"
        private static NDocente instancia = null;
        private NDocente() { }
        public static NDocente GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NDocente();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EDocente>> ListaDocentesSimple()
        {
            return DDocente.GetInstance().ListaDocentesSimple();
        }

        public Respuesta<DocenteDTO> ObtenerDocentePorId(int idDocente)
        {
            return DDocente.GetInstance().ObtenerDocentePorId(idDocente);
        }

        public Respuesta<List<DocenteDTO>> ListaDocentes()
        {
            return DDocente.GetInstance().ListaDocentes();
        }

        public Respuesta<int> GuardarOrEditDocente(EDocente oDocente, List<EDocenteCarrera> listaCarreras)
        {
            return DDocente.GetInstance().GuardarOrEditDocente(oDocente, listaCarreras);
        }
    }
}
