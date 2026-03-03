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
    public class DDocente
    {
        #region "PATRON SINGLETON"
        private static DDocente instancia = null;
        private DDocente() { }
        public static DDocente GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DDocente();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EDocente>> ListaDocentesSimple()
        {
            try
            {
                List<EDocente> rptLista = new List<EDocente>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerDocentes", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EDocente
                                {
                                    IdDocente = Convert.ToInt32(dr["IdDocente"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    NroCi = dr["NroCi"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    ImagenUrl = dr["ImagenUrl"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EDocente>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EDocente>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<DocenteDTO> ObtenerDocentePorId(int idDocente)
        {
            try
            {
                DocenteDTO obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerDocentePorId", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdDocente", idDocente);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new DocenteDTO
                                {
                                    IdDocente = Convert.ToInt32(dr["IdDocente"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),

                                    // NombreCompleto se calcula solo con Nombres y Apellidos

                                    NroCi = dr["NroCi"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    ImagenUrl = dr["ImagenUrl"].ToString(),
                                    CVPdfUrl = dr["CVPdfUrl"].ToString(),
                                    ResumenPerfil = dr["ResumenPerfil"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),

                                    // Mapeo de las nuevas columnas para la vista
                                    CarrerasAsignadas = dr["CarrerasAsignadas"].ToString(),
                                    IdsCarrerasList = dr["IdsCarrerasList"].ToString()
                                };
                            }
                        }
                    }
                }

                // Si obj es null, es que el correo no existe
                return new Respuesta<DocenteDTO>
                {
                    Estado = obj != null,
                    Data = obj,
                    // Es buena práctica de seguridad decir "Credenciales incorrectas" y no "Correo no existe"
                    Mensaje = obj != null ? "Datos Obtenidas" : "No se tiene registros del docente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<DocenteDTO>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        // no usar este metodo, es solo para pruebas internas, usar ListaDocentes() que devuelve el DTO con las carreras asignadas
        public Respuesta<List<DocenteDTO>> ListaDocentes()
        {
            try
            {
                List<DocenteDTO> rptLista = new List<DocenteDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarDocentes", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new DocenteDTO
                                {
                                    IdDocente = Convert.ToInt32(dr["IdDocente"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),

                                    // NombreCompleto se calcula solo con Nombres y Apellidos

                                    NroCi = dr["NroCi"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    ImagenUrl = dr["ImagenUrl"].ToString(),
                                    CVPdfUrl = dr["CVPdfUrl"].ToString(),
                                    ResumenPerfil = dr["ResumenPerfil"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),

                                    // Mapeo de las nuevas columnas para la vista
                                    CarrerasAsignadas = dr["CarrerasAsignadas"].ToString(),
                                    IdsCarrerasList = dr["IdsCarrerasList"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<DocenteDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista de docentes obtenida correctamente."
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<DocenteDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<int> GuardarOrEditDocente(EDocente oDocente, List<EDocenteCarrera> listaCarreras)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                // 1. Convertimos la lista de objetos a un string separado por comas: "1,3,5"
                // Si la lista es null o está vacía, devuelve un string vacío ""
                string idsCarrerasStr = "";
                if (listaCarreras != null && listaCarreras.Count > 0)
                {
                    idsCarrerasStr = string.Join(",", listaCarreras.Select(c => c.IdCarrera));
                }

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditDocente", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // 2. Parámetros del Docente
                        cmd.Parameters.AddWithValue("@IdDocente", oDocente.IdDocente);
                        cmd.Parameters.AddWithValue("@Nombres", oDocente.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oDocente.Apellidos);
                        cmd.Parameters.AddWithValue("@NroCi", oDocente.NroCi);
                        cmd.Parameters.AddWithValue("@Correo", oDocente.Correo);

                        // Manejo de nulos por si son campos no obligatorios en el formulario
                        cmd.Parameters.AddWithValue("@Celular", string.IsNullOrEmpty(oDocente.Celular) ? (object)DBNull.Value : oDocente.Celular);

                        // Si la clave viene nula, la mandamos vacía para que el SP sepa que NO debe actualizarla
                        cmd.Parameters.AddWithValue("@ClaveHash", string.IsNullOrEmpty(oDocente.ClaveHash) ? "" : oDocente.ClaveHash);

                        //cmd.Parameters.AddWithValue("@CVPdfUrl", string.IsNullOrEmpty(oDocente.CVPdfUrl) ? (object)DBNull.Value : oDocente.CVPdfUrl);
                        cmd.Parameters.AddWithValue("@CVPdfUrl", string.IsNullOrEmpty(oDocente.CVPdfUrl) ? "" : oDocente.CVPdfUrl);
                        //cmd.Parameters.AddWithValue("@ImagenUrl", string.IsNullOrEmpty(oDocente.ImagenUrl) ? (object)DBNull.Value : oDocente.ImagenUrl);
                        cmd.Parameters.AddWithValue("@ImagenUrl", string.IsNullOrEmpty(oDocente.ImagenUrl) ? "" : oDocente.ImagenUrl);

                        cmd.Parameters.AddWithValue("@ResumenPerfil", oDocente.ResumenPerfil);
                        cmd.Parameters.AddWithValue("@Estado", oDocente.Estado);

                        // 3. Pasamos el string de las carreras
                        cmd.Parameters.AddWithValue("@IdsCarreras", idsCarrerasStr);

                        // 4. Parámetro de Salida
                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
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

                // 5. Interpretación de la respuesta (Igual que con Carreras y Grados)
                switch (resultadoCodigo)
                {
                    case 1:
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "El Nro de CI o Correo ya se encuentra registrado a otro docente.";
                        break;

                    case 2:
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Docente registrado correctamente.";
                        break;

                    case 3:
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Datos del docente actualizados correctamente.";
                        break;

                    case 0:
                    default:
                        response.Estado = false;
                        response.Valor = "error";
                        response.Mensaje = "No se pudo completar la operación en la base de datos.";
                        break;
                }
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
