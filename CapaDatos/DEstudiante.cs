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
    public class DEstudiante
    {
        #region "PATRON SINGLETON"
        private static DEstudiante instancia = null;
        private DEstudiante() { }
        public static DEstudiante GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DEstudiante();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EstudiantesDTO>> ListaEstudiantes(int IdGradoAcademico, int IdCarrera)
        {
            try
            {
                List<EstudiantesDTO> rptLista = new List<EstudiantesDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_FiltrarEstPorGradoYCarrera", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdGradoAcademico", IdGradoAcademico);
                        comando.Parameters.AddWithValue("@IdCarrera", IdCarrera);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EstudiantesDTO
                                {
                                    IdEstudiante = Convert.ToInt32(dr["IdEstudiante"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    NroCi = dr["NroCi"].ToString(),
                                    Codigo = dr["Codigo"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    ImagenEstUrl = dr["ImagenEstUrl"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    IdCarrera = Convert.ToInt32(dr["IdCarrera"]),
                                    NombreCarrera = dr["NombreCarrera"].ToString(),
                                    IdGradoAcademico = Convert.ToInt32(dr["IdGradoAcademico"]),
                                    NombreGrado = dr["NombreGrado"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EstudiantesDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EstudiantesDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarEstudiante(EEstudiante oEstudiante)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarEstudiante", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombres", oEstudiante.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oEstudiante.Apellidos);
                        cmd.Parameters.AddWithValue("@NroCi", oEstudiante.NroCi);
                        cmd.Parameters.AddWithValue("@Codigo", oEstudiante.Codigo);
                        cmd.Parameters.AddWithValue("@Correo", oEstudiante.Correo);
                        cmd.Parameters.AddWithValue("@Celular", oEstudiante.Celular);
                        cmd.Parameters.AddWithValue("@ClaveHash", oEstudiante.ClaveHash);
                        cmd.Parameters.AddWithValue("@ImagenEstUrl", oEstudiante.ImagenEstUrl);
                        cmd.Parameters.AddWithValue("@IdCarrera", oEstudiante.IdCarrera);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar intente con otro nro ci, codigo o correo"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> EditarEstudiante(EEstudiante oEstudiante)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarEstudiante", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdEstudiante", oEstudiante.IdEstudiante);
                        cmd.Parameters.AddWithValue("@Nombres", oEstudiante.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oEstudiante.Apellidos);
                        cmd.Parameters.AddWithValue("@NroCi", oEstudiante.NroCi);
                        cmd.Parameters.AddWithValue("@Codigo", oEstudiante.Codigo);
                        cmd.Parameters.AddWithValue("@Correo", oEstudiante.Correo);
                        cmd.Parameters.AddWithValue("@Celular", oEstudiante.Celular);
                        //cmd.Parameters.AddWithValue("@ClaveHash", oEstudiante.ClaveHash);
                        cmd.Parameters.AddWithValue("@ImagenEstUrl", oEstudiante.ImagenEstUrl);
                        cmd.Parameters.AddWithValue("@IdCarrera", oEstudiante.IdCarrera);
                        cmd.Parameters.AddWithValue("@Estado", oEstudiante.Estado);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se actualizo correctamente" : "Error al actualizar intente con otro nro ci, codigo o correo"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EEstudiante>> FiltroEstudiantes(string Busqueda)
        {
            try
            {
                List<EEstudiante> rptLista = new List<EEstudiante>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_FiltroEstudiantes", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@Busqueda", Busqueda);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EEstudiante()
                                {
                                    IdEstudiante = Convert.ToInt32(dr["IdEstudiante"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    NroCi = dr["NroCi"].ToString(),
                                    Codigo = dr["Codigo"].ToString(),
                                    ImagenEstUrl = dr["ImagenEstUrl"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EEstudiante>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Estudiantes obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EEstudiante>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
