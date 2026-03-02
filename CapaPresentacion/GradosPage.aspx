<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="GradosPage.aspx.cs" Inherits="CapaPresentacion.GradosPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <h1 class="page-header">GRADOS <small>Modulo para Grados...</small></h1>
    <div class="row">
        <div class="col-xl-12">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Grados Academicos</h4>
                    <div class="panel-heading-btn">
                        <button id="btnNuevore" type="button" class="btn btn-xs btn-lime">
                            <i class="fas fa-pencil me-2"></i>Nuevo Registro</button>
                    </div>
                </div>
                <div class="panel-body">
                    <table id="tbGrados" width="100%" class="table table-striped table-bordered align-middle text-nowrap">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Nro Carreras</th>
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
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalle">Detalle</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label" for="txtNombre">Nombre</label>
                        <input class="form-control form-control-sm" type="text" id="txtNombre" placeholder="Nombre" name="Nombre" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="cboEstado">Select Estado</label>
                        <select class="form-select form-select-sm" id="cboEstado">
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-sm btn-danger" data-bs-dismiss="modal">Cancelar</a>
                    <button id="btnGuardarReg" type="button" class="btn btn-sm btn-lime">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalDetalles" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalleCar">Detalles</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <table id="tbDetallesCa" width="100%" class="table table-striped table-bordered align-middle text-nowrap">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Carreras</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-sm btn-danger" data-bs-dismiss="modal">Cancelar</a>
                    <!-- <button id="btnReporte" type="button" class="btn btn-sm btn-lime">Guardar Cambios</button> -->
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/GradosPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
