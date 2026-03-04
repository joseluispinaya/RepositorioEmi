<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="DocentesPage.aspx.cs" Inherits="CapaPresentacion.DocentesPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/select2ori/dist/css/select2.min.css" rel="stylesheet" />
    <style>
        .est-perfil {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover; /* Evita que la imagen se estire o aplaste */
            object-position: center; /* Asegura que se vea el centro de la foto */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <h1 class="page-header">MODULO <small id="tituloPagina">Cargando...</small></h1>
    <div class="row">
        <div class="col-xl-7">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Formularios</h4>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label class="form-label" for="txtNombrees">Nombre</label>
                                <input class="form-control form-control-sm model" type="text" id="txtNombrees"
                                    placeholder="Nombres" name="Nombres" />
                            </div>

                        </div>
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label class="form-label" for="txtApellidos">Apellidos</label>
                                <input class="form-control form-control-sm model" type="text" id="txtApellidos"
                                    placeholder="Apellidos" name="Apellidos" />
                            </div>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-4">
                            <div class="mb-3">
                                <label class="form-label" for="txtNroci">Nro CI</label>
                                <input class="form-control form-control-sm model" type="text" id="txtNroci"
                                    placeholder="Nro CI" name="Nro CI" />
                            </div>
                        </div>
                        <div class="col-xl-4">
                            <div class="mb-3">
                                <label class="form-label" for="txtCelular">Celular</label>
                                <input class="form-control form-control-sm model" type="number" id="txtCelular"
                                    placeholder="Celular" name="Celular" />
                            </div>
                        </div>
                        <div class="col-xl-4">
                            <div class="mb-3">
                                <label class="form-label" for="cboEstado">Estado</label>
                                <select class="form-select form-select-sm" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">No Activo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-xl-4">
                            <div class="mb-3">
                                <label class="form-label" for="txtCorreo">Correo</label>
                                <input class="form-control form-control-sm model" type="text" id="txtCorreo" placeholder="Correo" name="Correo" />
                            </div>
                        </div>
                        <div class="col-xl-8">
                            <div class="mb-3">
                                <label class="form-label" for="cboCarreras">Carreras Asignadas <span class="text-danger">*</span></label>

                                <select id="cboCarreras" class="form-control multiple-select2" multiple="multiple" style="width: 100%;">
                                </select>

                                <small class="form-text text-muted">Puede seleccionar una o más carreras para este docente.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-5">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Panel Title here</h4>
                </div>
                <div class="panel-body">
                    <div class="mb-2">
                        <p class="mb-0">Debe seleccionar una foto</p>
                    </div>

                    <div class="mb-3">
                        <input class="form-control form-control-sm" type="file" id="txtFoto" accept="image/*" />
                    </div>

                    <div class="mb-3 text-center">
                        <img id="imgDocente" src="Imagen/sinimagen.png" alt="Foto docente" class="est-perfil">
                    </div>

                    
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-7">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Perfil Profesional</h4>
                </div>
                <div class="panel-body">
                    <div class="note alert-warning mb-3">
                        <div class="note-content">
                            <h4><b>Nota para el Resumen de Perfil Profesional</b></h4>
                            <p>
                                Debe describir de manera clara y profesional su formación
                            académica, especialidad, experiencia laboral, áreas de
                            desempeño y competencias principales relacionadas
                            con su profesión.
                            </p>
                            <p>
                                Este resumen debe estar redactado en tercera persona y tener un
                            mínimo de <b>400 caracteres</b>.
                            </p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="txtResumen">Resumen Perfil Profesional</label>
                        <textarea id="txtResumen" class="form-control" rows="9"></textarea>
                    </div>

                    <div class="row">
                        <div class="col-xl-12 text-center mb-2">
                            <button id="btnGuardarReg" type="button" class="btn btn-sm btn-lime me-2"><i class="fas fa-pencil me-2"></i>Guardar Cambios</button>
                            <button id="btnSwaln" type="button" class="btn btn-sm btn-success"><i class="fas fa-pencil me-2"></i>Volver</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-xl-5">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Documento C.V.</h4>
                </div>
                <div class="panel-body">
                    <div class="mb-3">
                        <label for="txtpdf" class="form-label">Debe seleccionar su C.V. en PDF</label>
                        <input type="file" id="txtpdf" class="form-control form-control-sm" accept=".pdf">
                    </div>
                    <div class="text-center">
                        <iframe id="verPdf" src="Docpdf/sindoc.pdf" style="width: 90%; height: 400px; border: none;"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/select2ori/dist/js/select2.min.js"></script>
    <script src="js/DocentesPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
