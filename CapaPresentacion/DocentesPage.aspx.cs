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
        public static Respuesta<List<EDocente>> FiltroDocentes(string busqueda)
        {
            return NDocente.GetInstance().FiltroDocentes(busqueda);
        }

        [WebMethod]
        public static Respuesta<DocenteDTO> ObtenerDocentePorId(int IdDocente)
        {
            return NDocente.GetInstance().ObtenerDocentePorId(IdDocente);
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditDocente(EDocente oDocente, List<EDocenteCarrera> listaCarreras, string base64Image, string base64Pdf)
        {
            try
            {
                var utilidades = Utilidadesj.GetInstance();

                // 1. PROCESAR IMAGEN (Si enviaron una nueva)
                if (!string.IsNullOrEmpty(base64Image))
                {
                    byte[] imageBytes = Convert.FromBase64String(base64Image);
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/ImagenesDoce/";
                        oDocente.ImagenUrl = utilidades.UploadPhoto(stream, folder);
                    }
                }
                else if (oDocente.IdDocente == 0)
                {
                    // Si es nuevo registro y no suben foto, ponemos cadena vacía
                    oDocente.ImagenUrl = "";
                }
                // Si es Edición (Id > 0) y no suben foto, la capa de datos (SP) ignorará el campo
                // o puedes buscar en BD la URL actual, pero el SP que hicimos ya lo maneja bien.

                // 2. PROCESAR PDF (Si enviaron uno nuevo)
                if (!string.IsNullOrEmpty(base64Pdf))
                {
                    byte[] pdfBytes = Convert.FromBase64String(base64Pdf);
                    using (var stream = new MemoryStream(pdfBytes))
                    {
                        // Asumo que tu método UploadPhoto sirve para cualquier archivo, 
                        // solo le cambias la carpeta de destino. Si tienes un "UploadDocument", úsalo aquí.
                        string folderPdf = "/Docpdf/";
                        oDocente.CVPdfUrl = utilidades.UploadPdf(stream, folderPdf);
                    }
                }
                else if (oDocente.IdDocente == 0)
                {
                    oDocente.CVPdfUrl = "";
                }

                // 3. GENERAR CONTRASEÑA HASH (Solo si es nuevo registro)
                if (oDocente.IdDocente == 0)
                {
                    // La contraseña por defecto es su número de CI
                    string clavePlana = oDocente.NroCi;
                    oDocente.ClaveHash = utilidades.Hash(clavePlana);
                }
                else
                {
                    // Si es edición, mandamos vacío para que el SP no cambie la contraseña actual
                    oDocente.ClaveHash = "";
                }

                // 4. GUARDAR EN BASE DE DATOS
                return NDocente.GetInstance().GuardarOrEditDocente(oDocente, listaCarreras);
            }
            catch (Exception ex)
            {
                return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "Error en el servidor: " + ex.Message };
            }
        }

    }
}