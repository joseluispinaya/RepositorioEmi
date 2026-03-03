<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="EstudiantesPage.aspx.cs" Inherits="CapaPresentacion.EstudiantesPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .est-perfil {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover; /* Evita que la imagen se estire o aplaste */
            object-position: center; /* Asegura que se vea el centro de la foto */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="panel panel-inverse">
        <div class="panel-heading">
            <h4 class="panel-title">Estudiantes Registrados</h4>
            <div class="panel-heading-btn">
                <button id="btnNuevore" type="button" class="btn btn-xs btn-lime"><i class="fas fa-pencil me-2"></i>Nuevo Registro</button>
            </div>
        </div>
        <div class="panel-body">

            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="input-group input-group-sm mb-2">
                                <label class="input-group-text" for="cboGradosGe">Grados Academicos</label>
                                <select class="form-select" id="cboGradosGe">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-group input-group-sm mb-2">
                                <label class="input-group-text" for="cboCarrerasGe">Carreras</label>
                                <select class="form-select" id="cboCarrerasGe">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />

            <table id="tbEstudiantes" width="100%" class="table table-striped table-bordered align-middle text-nowrap">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Imagen</th>
                        <th>Estudiantes</th>
                        <th>Nro CI</th>
                        <th>Correos</th>
                        <th>Carrera</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalle">Detalle Estudiantes</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xl-7">
                            <div class="row">
                                <div class="col-xl-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="txtNombrees">Nombres</label>
                                        <input class="form-control form-control-sm model" type="text" id="txtNombrees" placeholder="Nombres" name="Nombres" />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="txtNroci">Nro CI</label>
                                        <input class="form-control form-control-sm model" type="text" id="txtNroci" placeholder="Nro CI" name="Nro CI" />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="txtCelular">Celular</label>
                                        <input class="form-control form-control-sm model" type="text" id="txtCelular" placeholder="Nro celular" name="Celular" />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="cboGrados">Grado Academico</label>
                                        <select class="form-select form-select-sm" id="cboGrados">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="txtApellidos">Apellidos</label>
                                        <input class="form-control form-control-sm model" type="text" id="txtApellidos" placeholder="Apellidos" name="Apellidos" />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="txtCorreo">Correo</label>
                                        <input class="form-control form-control-sm model" type="text" id="txtCorreo" placeholder="Correo" name="Correo" />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="txtCodigo">Codigo</label>
                                        <input class="form-control form-control-sm model" type="text" id="txtCodigo" placeholder="Codigo" name="Codigo" />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="cboCarreras">Carreras</label>
                                        <select class="form-select form-select-sm" id="cboCarreras">
                                        </select>
                                    </div>
                                </div>

                                <%--<div class="col-12 d-flex justify-content-center">
                                    <div class="mb-3 w-50">
                                        <label class="form-label" for="cboEstado">Estado</label>
                                        <select class="form-select form-select-sm" id="cboEstado">
                                            <option value="1">Activo</option>
                                            <option value="0">Inactivo</option>
                                        </select>
                                    </div>
                                </div>--%>

                            </div>

                        </div>
                        <div class="col-xl-5">
                            <div class="mb-3">
                                <label class="form-label" for="cboEstado">Select Estado</label>
                                <select class="form-select form-select-sm" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>

                            <div class="mb-2">
                                <p class="mb-0">Debe seleccionar una foto</p>
                            </div>

                            <div class="mb-3">
                                <input class="form-control form-control-sm" type="file" id="txtFoto" accept="image/*" />
                            </div>

                            <div class="mb-3 text-center">
                                <img id="imgEstud" src="Imagen/sinimagen.png" alt="Foto est" class="est-perfil">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-sm btn-danger" data-bs-dismiss="modal">Cancelar</a>
                    <button id="btnGuardarReg" type="button" class="btn btn-sm btn-lime">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/EstudiantesPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
