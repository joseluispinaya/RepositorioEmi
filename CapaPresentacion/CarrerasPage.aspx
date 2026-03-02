<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="CarrerasPage.aspx.cs" Inherits="CapaPresentacion.CarrerasPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <h1 class="page-header">CARRERAS <small>Modulo para Carreras...</small></h1>
    <div class="row">
        <div class="col-xl-12">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Carreras Registradas</h4>
                    <div class="panel-heading-btn">
                        <button id="btnNuevore" type="button" class="btn btn-xs btn-lime"><i class="fas fa-pencil me-2"></i>Nuevo Registro</button>
                    </div>
                </div>
                <div class="panel-body">
                    <table id="tbCarreras" width="100%" class="table table-striped table-bordered align-middle text-nowrap">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Grado</th>
                                <th>Nro Ests.</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalle">Carrera</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label" for="txtNombre">Nombre de la Carrera</label>
                        <input class="form-control form-control-sm" type="text" id="txtNombre" placeholder="Nombre" name="Nombre" />
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label" for="cboGrados">Grado Academico</label>
                                <select class="form-select form-select-sm" id="cboGrados">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label" for="cboEstado">Select Estado</label>
                                <select class="form-select form-select-sm" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
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
    <script src="js/CarrerasPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
