using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;

namespace CapaDatos
{
    public class DCarrera
    {
        #region "PATRON SINGLETON"
        private static DCarrera instancia = null;
        private DCarrera() { }
        public static DCarrera GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DCarrera();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ECarrera>> ListaCarreras()
        {
            try
            {
                List<ECarrera> rptLista = new List<ECarrera>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCarreras", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECarrera()
                                {
                                    IdCarrera = Convert.ToInt32(dr["IdCarrera"]),
                                    IdGradoAcademico = Convert.ToInt32(dr["IdGradoAcademico"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    NombreGrado = dr["NombreGrado"].ToString(),
                                    NroEst = Convert.ToInt32(dr["NroEst"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECarrera>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ECarrera>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista de carreras: {ex.Message}"
                };
            }
        }

        public Respuesta<List<ECarrera>> ObtenerCarrerasPorGrado(int idGradoAcademico)
        {
            try
            {
                List<ECarrera> rptLista = new List<ECarrera>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_CarrerasIdGrado", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdGradoAcademico", idGradoAcademico);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECarrera
                                {
                                    IdCarrera = Convert.ToInt32(dr["IdCarrera"]),
                                    IdGradoAcademico = Convert.ToInt32(dr["IdGradoAcademico"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECarrera>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "carreras obtenidas correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECarrera>>()
                {
                    Estado = false,
                    Mensaje = $"Error al obtener la lista de carreras: {ex.Message}",
                    Data = null
                };
            }
        }

        public Respuesta<int> GuardarOrEditCarrera(ECarrera oCarrera)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditCarrera", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Parámetros de entrada
                        cmd.Parameters.AddWithValue("@IdCarrera", oCarrera.IdCarrera);
                        cmd.Parameters.AddWithValue("@IdGradoAcademico", oCarrera.IdGradoAcademico); // Importante
                        cmd.Parameters.AddWithValue("@Nombre", oCarrera.Nombre);
                        cmd.Parameters.AddWithValue("@Estado", oCarrera.Estado);

                        // Parámetro de salida
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

                // Interpretación de códigos
                switch (resultadoCodigo)
                {
                    case 1:
                        response.Estado = false;
                        response.Valor = "warning"; // Ícono Amarillo
                        response.Mensaje = "Ya existe una carrera con ese nombre en el Grado Académico seleccionado.";
                        break;

                    case 2:
                        response.Estado = true;
                        response.Valor = "success"; // Ícono Verde
                        response.Mensaje = "Carrera registrada correctamente.";
                        break;

                    case 3:
                        response.Estado = true;
                        response.Valor = "success"; // Ícono Verde
                        response.Mensaje = "Carrera actualizada correctamente.";
                        break;

                    case 0:
                    default:
                        response.Estado = false;
                        response.Valor = "error"; // Ícono Rojo
                        response.Mensaje = "No se pudo completar la operación.";
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
