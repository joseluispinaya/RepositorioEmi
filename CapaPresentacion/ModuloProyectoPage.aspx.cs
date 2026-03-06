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
using System.Xml.Linq;

namespace CapaPresentacion
{
    public partial class ModuloProyectoPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<ReporteProyectoDTO> ObtenerDetalleReporteProyecto(int IdProyecto)
        {
            return NProyecto.GetInstance().ObtenerDetalleReporteProyecto(IdProyecto);
        }

        [WebMethod]
        public static Respuesta<List<ETiposRevisor>> ListaTipoRevisores()
        {
            return NProyecto.GetInstance().ListaTipoRevisores();
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditProyecto(EProyectoGrado oProyectoGrado, List<ERevisoresAsignado> listaRevisores, string base64Pdf)
        {
            try
            {
                if (listaRevisores == null || !listaRevisores.Any())
                {
                    return new Respuesta<int> { Estado = false, Mensaje = "Debe Agregar los Revisores del Proyecto.", Valor = "error" };
                }

                // 2. PROCESAR PDF (Si enviaron uno nuevo)
                if (!string.IsNullOrEmpty(base64Pdf))
                {
                    byte[] pdfBytes = Convert.FromBase64String(base64Pdf);
                    using (var stream = new MemoryStream(pdfBytes))
                    {
                        string folderPdf = "/Proyectospdf/";
                        oProyectoGrado.DocPdfUrl = Utilidadesj.GetInstance().UploadPdf(stream, folderPdf);
                    }
                }
                else if (oProyectoGrado.IdProyecto == 0)
                {
                    oProyectoGrado.DocPdfUrl = "";
                }

                XElement proyectostr = new XElement("Proyecto",
                    new XElement("IdProyecto", oProyectoGrado.IdProyecto),
                    new XElement("IdEstudiante", oProyectoGrado.IdEstudiante),
                    new XElement("IdDocente", oProyectoGrado.IdDocente),
                    new XElement("IdCarrera", oProyectoGrado.IdCarrera),
                    new XElement("Titulo", oProyectoGrado.Titulo),
                    new XElement("DocPdfUrl", oProyectoGrado.DocPdfUrl)
                );

                XElement listaRev = new XElement("ListaRevisores");

                foreach (ERevisoresAsignado item in listaRevisores)
                {
                    listaRev.Add(new XElement("Item",

                        new XElement("IdDocente", item.IdDocente),
                        new XElement("IdTipoRevisor", item.IdTipoRevisor)
                        )
                    );
                }

                proyectostr.Add(listaRev);
                return NProyecto.GetInstance().GuardarOrEditProyecto(proyectostr.ToString());
            }
            catch (Exception ex)
            {
                // Capturar cualquier error y retornar una respuesta de fallo
                return new Respuesta<int>
                {
                    Estado = false,
                    Mensaje = "Error en el servidor: " + ex.Message,
                    Valor = "error"
                };
            }
        }
    }
}