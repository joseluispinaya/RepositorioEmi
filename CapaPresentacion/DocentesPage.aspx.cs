using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class DocentesPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<DocenteDTO> ObtenerDocentePorId(int IdDocente)
        {
            return NDocente.GetInstance().ObtenerDocentePorId(IdDocente);
        }
    }
}