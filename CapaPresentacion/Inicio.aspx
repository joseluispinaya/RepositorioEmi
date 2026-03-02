<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-xl-5">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Formularios</h4>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label class="form-label" for="txtNombre">Nombre</label>
                                <input class="form-control form-control-sm model" type="text" id="txtNombre" placeholder="Nombres" name="Nombres" />
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="txtNroci">Nro CI</label>
                                <input class="form-control form-control-sm model" type="text" id="txtNroci" placeholder="Nro CI" name="Nro CI" />
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="cboAsoci">Asociacion</label>
                                <select class="form-select form-select-sm" id="cboAsoci">
                                </select>
                            </div>

                        </div>
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label class="form-label" for="txtApellidos">Apellidos</label>
                                <input class="form-control form-control-sm model" type="text" id="txtApellidos" placeholder="Apellidos"
                                    name="Apellidos" />
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="txtCelular">Celular</label>
                                <input class="form-control form-control-sm model" type="text" id="txtCelular" placeholder="Celular" name="Celular" />
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="cboEstado">Estado</label>
                                <select class="form-select form-select-sm" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">No Activo</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div class="input-group input-group-sm">
                        <div class="input-group-text">Nombres</div>
                        <input type="text" class="form-control" placeholder="Username">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-7">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Panel Title here</h4>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xl-12 text-center mb-3">
                            <%--<a href="#modal-dialog" class="btn btn-sm btn-success w-100px" data-bs-toggle="modal"><i class="fas fa-pencil me-2"></i>Demo</a>--%>
                            <button id="btnNuevoReg" type="button" class="btn btn-sm btn-lime"><i class="fas fa-pencil me-2"></i>Nuevo Registro</button>
                            <button id="btnSwaln" type="button" class="btn btn-sm btn-success"><i class="fas fa-pencil me-2"></i>Swal</button>
                            <button id="btnAlertaa" type="button" class="btn btn-sm btn-danger"><i class="fas fa-pencil me-2"></i>Alerta Nu</button>
                            <a href="javascript:;" id="add-regular" class="btn btn-sm btn-dark w-100px">Alerta</a>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12">
                            <table id="data-table-default" width="100%" class="table table-striped table-bordered align-middle text-nowrap">
                                <thead>
                                    <tr>
                                        <th width="1%"></th>
                                        <th width="1%" data-orderable="false"></th>
                                        <th class="text-nowrap">Rendering</th>
                                        <th class="text-nowrap">Browser</th>
                                        <th class="text-nowrap">Platform(s)</th>
                                        <th class="text-nowrap">Engine</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="odd gradeX">
                                        <td width="1%" class="fw-bold">1</td>
                                        <td width="1%" class="with-img">
                                            <img src="assets/img/user/user-1.jpg"
                                                class="rounded h-30px my-n1 mx-n1" /></td>
                                        <td>Trident</td>
                                        <td>Internet Explorer 4.0</td>
                                        <td>Win 95+</td>
                                        <td>4</td>
                                    </tr>
                                    <tr class="even gradeC">
                                        <td class="fw-bold">2</td>
                                        <td class="with-img">
                                            <img src="assets/img/user/user-2.jpg" class="rounded h-30px my-n1 mx-n1" />
                                        </td>
                                        <td>Trident</td>
                                        <td>Internet Explorer 5.0</td>
                                        <td>Win 95+</td>
                                        <td>5</td>
                                    </tr>
                                    <tr class="odd gradeA">
                                        <td class="fw-bold">3</td>
                                        <td class="with-img">
                                            <img src="assets/img/user/user-3.jpg" class="rounded h-30px my-n1 mx-n1" />
                                        </td>
                                        <td>Trident</td>
                                        <td>Internet Explorer 5.5</td>
                                        <td>Win 95+</td>
                                        <td>5.5</td>
                                    </tr>
                                    <tr class="gradeA">
                                        <td class="fw-bold">50</td>
                                        <td class="with-img">
                                            <img src="assets/img/user/user-8.jpg" class="rounded h-30px my-n1 mx-n1" />
                                        </td>
                                        <td>Misc</td>
                                        <td>NetFront 3.1</td>
                                        <td>Embedded devices</td>
                                        <td>-</td>
                                    </tr>
                                    <tr class="gradeA">
                                        <td class="fw-bold">51</td>
                                        <td class="with-img">
                                            <img src="assets/img/user/user-9.jpg" class="rounded h-30px my-n1 mx-n1" />
                                        </td>
                                        <td>Misc</td>
                                        <td>NetFront 3.4</td>
                                        <td>Embedded devices</td>
                                        <td>-</td>
                                    </tr>
                                    <tr class="gradeX">
                                        <td class="fw-bold">52</td>
                                        <td class="with-img">
                                            <img src="assets/img/user/user-10.jpg" class="rounded h-30px my-n1 mx-n1" />
                                        </td>
                                        <td>Misc</td>
                                        <td>Dillo 0.8</td>
                                        <td>Embedded devices</td>
                                        <td>-</td>
                                    </tr>
                                    <tr class="gradeX">
                                        <td class="fw-bold">53</td>
                                        <td class="with-img">
                                            <img src="assets/img/user/user-11.jpg" class="rounded h-30px my-n1 mx-n1" />
                                        </td>
                                        <td>Misc</td>
                                        <td>Links</td>
                                        <td>Text only</td>
                                        <td>-</td>
                                    </tr>
                                    <tr class="gradeX">
                                        <td class="fw-bold">54</td>
                                        <td class="with-img">
                                            <img src="assets/img/user/user-12.jpg" class="rounded h-30px my-n1 mx-n1" />
                                        </td>
                                        <td>Misc</td>
                                        <td>Lynx</td>
                                        <td>Text only</td>
                                        <td>-</td>
                                    </tr>
                                    <tr class="gradeC">
                                        <td class="fw-bold">55</td>
                                        <td class="with-img">
                                            <img src="assets/img/user/user-13.jpg" class="rounded h-30px my-n1 mx-n1" />
                                        </td>
                                        <td>Misc</td>
                                        <td>IE Mobile</td>
                                        <td>Windows Mobile 6</td>
                                        <td>-</td>
                                    </tr>
                                    <tr class="gradeC">
                                        <td class="fw-bold">57</td>
                                        <td class="with-img">
                                            <img src="assets/img/user/user-14.jpg" class="rounded h-30px my-n1 mx-n1" />
                                        </td>
                                        <td>Misc</td>
                                        <td>PSP browser</td>
                                        <td>PSP</td>
                                        <td>52</td>
                                    </tr>
                                    <tr class="gradeU">
                                        <td class="fw-bold">58</td>
                                        <td class="with-img">
                                            <img src="assets/img/user/user-1.jpg" class="rounded h-30px my-n1 mx-n1" />
                                        </td>
                                        <td>Other browsers</td>
                                        <td>All others</td>
                                        <td>-</td>
                                        <td>6.2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Modal Dialog</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <p>
                        Modal body content here...
                    </p>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-white" data-bs-dismiss="modal">Close</a>
                    <a href="javascript:;" class="btn btn-success">Action</a>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/Inicio.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
