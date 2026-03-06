using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaEntidad.DTOs;

namespace CapaDatos
{
    public class DProyecto
    {
        #region "PATRON SINGLETON"
        private static DProyecto instancia = null;
        private DProyecto() { }
        public static DProyecto GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DProyecto();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ETiposRevisor>> ListaTipoRevisores()
        {
            try
            {
                List<ETiposRevisor> rptLista = new List<ETiposRevisor>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_TiposRevisores", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ETiposRevisor()
                                {
                                    IdTipoRevisor = Convert.ToInt32(dr["IdTipoRevisor"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ETiposRevisor>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ETiposRevisor>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<List<ProyectoResumenDTO>> ListarProyectosPorCarrera(int idCarrera)
        {
            try
            {
                List<ProyectoResumenDTO> rptLista = new List<ProyectoResumenDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerProyectoGrados", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdCarrera", idCarrera);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ProyectoResumenDTO
                                {
                                    IdProyecto = Convert.ToInt32(dr["IdProyecto"]),
                                    EstNombreCompleto = dr["EstNombreCompleto"].ToString(),
                                    TutorNombreCompleto = dr["TutorNombreCompleto"].ToString(),
                                    Titulo = dr["Titulo"].ToString(),
                                    FechaRegistroSt = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy")
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ProyectoResumenDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidas correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ProyectoResumenDTO>>()
                {
                    Estado = false,
                    Mensaje = $"Error al obtener la lista: {ex.Message}",
                    Data = null
                };
            }
        }

        public Respuesta<ReporteProyectoDTO> ObtenerDetalleReporteProyecto(int idProyecto)
        {
            ReporteProyectoDTO reporte = null;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ReporteProyectoPorId", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdProyecto", idProyecto);

                        con.Open();

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            // =========================================================
                            // 1. Leer el primer Result Set (Cabecera)
                            // =========================================================
                            if (reader.Read())
                            {
                                reporte = new ReporteProyectoDTO
                                {
                                    IdProyecto = Convert.ToInt32(reader["IdProyecto"]),
                                    IdEstudiante = Convert.ToInt32(reader["IdEstudiante"]),
                                    IdTutor = Convert.ToInt32(reader["IdTutor"]),
                                    IdCarrera = Convert.ToInt32(reader["IdCarrera"]),
                                    CarreraNombre = reader["CarreraNombre"].ToString(),
                                    IdGradoAcademico = Convert.ToInt32(reader["IdGradoAcademico"]),
                                    GradoNombre = reader["GradoNombre"].ToString(),
                                    Titulo = reader["Titulo"].ToString(),
                                    DocPdfUrl = reader["DocPdfUrl"] as string ?? string.Empty,
                                    //DocPdfUrl = reader["DocPdfUrl"] != DBNull.Value ? reader["DocPdfUrl"].ToString() : string.Empty,

                                    EstNombreCompleto = reader["EstNombreCompleto"].ToString(),
                                    EstCi = reader["EstCi"].ToString(),
                                    EstCodigo = reader["EstCodigo"].ToString(),
                                    EstCorreo = reader["EstCorreo"].ToString(),
                                    EstImagen = reader["EstImagen"] as string ?? string.Empty,
                                    //EstImagen = reader["EstImagen"] != DBNull.Value ? reader["EstImagen"].ToString() : string.Empty,

                                    TutorNombreCompleto = reader["TutorNombreCompleto"].ToString(),
                                    TutorCi = reader["TutorCi"].ToString(),
                                    TutorCelular = reader["TutorCelular"].ToString(),
                                    TutorCorreo = reader["TutorCorreo"].ToString(),
                                    TutorImagen = reader["TutorImagen"] as string ?? string.Empty,
                                    //TutorImagen = reader["TutorImagen"] != DBNull.Value ? reader["TutorImagen"].ToString() : string.Empty,

                                    FechaRegistro = Convert.ToDateTime(reader["FechaRegistro"]).ToString("dd/MM/yyyy")
                                };
                            }

                            if (reporte != null && reader.NextResult())
                            {
                                while (reader.Read())
                                {
                                    reporte.ListaRevisores.Add(new RevisorDTO
                                    {
                                        IdTipoRevisor = Convert.ToInt32(reader["IdTipoRevisor"]),
                                        IdRevisor = Convert.ToInt32(reader["IdRevisor"]),
                                        RevisorNombreCompleto = reader["RevisorNombreCompleto"].ToString(),
                                        RevisorCi = reader["RevisorCi"].ToString(),
                                        RevisorCelular = reader["RevisorCelular"].ToString(),
                                        RevisorCorreo = reader["RevisorCorreo"].ToString(),
                                        RevisorImagen = reader["RevisorImagen"] as string ?? string.Empty,
                                        //RevisorImagen = reader["RevisorImagen"] != DBNull.Value ? reader["RevisorImagen"].ToString() : string.Empty,
                                        TipoReviNombre = reader["TipoReviNombre"].ToString()
                                    });
                                }
                            }
                        }
                    }
                }

                // Retorno exitoso (Si reporte es null significa que el ID no existe en la BD)
                return new Respuesta<ReporteProyectoDTO>
                {
                    Estado = reporte != null,
                    Data = reporte,
                    Mensaje = reporte != null ? "Detalle obtenido correctamente" : "No se encontró el proyecto solicitado."
                };
            }
            catch (Exception ex)
            {
                // Retorno capturando la excepción
                return new Respuesta<ReporteProyectoDTO>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Ocurrió un error al obtener el reporte: " + ex.Message
                };
            }
        }

        public Respuesta<int> GuardarOrEditProyecto(string ProyectoXml)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditProyecto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@ProyectoXml", SqlDbType.Xml).Value = ProyectoXml;

                        var outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();

                        resultadoCodigo = Convert.ToInt32(outputParam.Value);
                    }
                }
                response.Data = resultadoCodigo;

                // Interpretación de códigos
                switch (resultadoCodigo)
                {
                    case 1:
                        response.Estado = false;
                        response.Valor = "warning"; // Ícono Amarillo
                        response.Mensaje = "Ya existe un proyecto para este estudiante en esta carrera.";
                        break;

                    case 2:
                        response.Estado = true;
                        response.Valor = "success"; // Ícono Verde
                        response.Mensaje = "Proyecto registrado correctamente.";
                        break;

                    case 3:
                        response.Estado = true;
                        response.Valor = "success"; // Ícono Verde
                        response.Mensaje = "Proyecto actualizado correctamente.";
                        break;

                    case 0:
                    default:
                        response.Estado = false;
                        response.Valor = "error"; // Ícono Rojo
                        response.Mensaje = "No se pudo completar la operación.";
                        break;
                }
            }
            catch (SqlException ex)
            {
                response.Data = 0;
                response.Estado = false;
                response.Valor = "error";
                response.Mensaje = "Ocurrió un error en la base de datos: " + ex.Message;
            }
            catch (Exception ex)
            {
                response.Data = 0;
                response.Estado = false;
                response.Valor = "error";
                response.Mensaje = "Error interno: " + ex.Message;
            }

            return response;
        }

    }
}
