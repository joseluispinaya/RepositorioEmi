<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="ModuloProyectoPage.aspx.cs" Inherits="CapaPresentacion.ModuloProyectoPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/select2ori/dist/css/select2.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <h1 class="page-header">MODULO <small id="tituloPagina">Cargando...</small></h1>
    <div class="row">
        <div class="col-xl-4">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Formulario Autor</h4>
                </div>
                <div class="panel-body">
                    <input type="hidden" value="0" id="txtIdEstud">
                    <div class="mb-3">
                        <label class="form-label" for="cboBuscarEstudiante">Buscar Estudiante</label>
                        <select id="cboBuscarEstudiante" class="default-select2 form-control" style="width: 100%;">
                            <option value="">Escriba el nombre o CI del Estudiante...</option>
                        </select>
                    </div>

                    <div class="d-flex mb-3">
                        <div class="w-50px">
                            <img src="Imagen/sinimagen.png" id="imgEstud" alt="" class="mw-100 rounded-pill">
                        </div>
                        <div class="flex-1 ps-3">
                            <h5 id="lblNombrecom" class="mb-1">Espera...</h5>
                            <p id="lblDatos" class="mb-0">Espera...</p>
                            <%--<p class="mb-0">Cras sit amet nibh libero, in</p>--%>
                        </div>
                    </div>
                    <hr class="bg-gray-500">
                </div>
            </div>
        </div>
        <div class="col-xl-4">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Formulario Tutor</h4>
                </div>
                <div class="panel-body">
                    <input type="hidden" value="0" id="txtIdTutor">
                    <div class="mb-3">
                        <label class="form-label" for="cboBuscarDocente">Buscar Tutor</label>
                        <select id="cboBuscarDocente" class="default-select2 form-control" style="width: 100%;">
                            <option value="">Escriba el nombre o CI del Tutor...</option>
                        </select>
                    </div>

                    <div class="d-flex mb-3">
                        <div class="w-50px">
                            <img src="Imagen/sinimagen.png" id="imgDocente" alt="" class="mw-100 rounded-pill">
                        </div>
                        <div class="flex-1 ps-3">
                            <h5 id="lblNombrecomTu" class="mb-1">Espera...</h5>
                            <%--<p class="mb-2">Cras sit amet nibh libero, in</p>--%>
                            <p id="lblDatosTu" class="mb-0">Espera...</p>
                        </div>
                    </div>
                    <hr class="bg-gray-500">
                </div>
            </div>
        </div>
        <div class="col-xl-4">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Formulario Proyecto</h4>
                </div>
                <div class="panel-body">
                    <div class="note alert-warning mb-3">
                        <div class="note-content">
                            <h5><b>Nota Detalle</b></h5>
                            <p class="mb-0">Debe llenar todos <b>los datos requeridos</b></p>
                        </div>
                    </div>

                    <div class="mb-2">
                        <div class="input-group input-group-sm">
                            <label class="input-group-text" for="cboGradosGe">Grados Academicos</label>
                            <select class="form-select" id="cboGradosGe">
                            </select>
                        </div>
                    </div>
                    <div class="mb-1">
                        <div class="input-group input-group-sm">
                            <label class="input-group-text" for="cboCarrerasGe">Carreras</label>
                            <select class="form-select" id="cboCarrerasGe">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-7">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Datos del Proyecto</h4>
                </div>
                <div class="panel-body">
                    
                    <div class="mb-3">
                        <label class="form-label" for="txtTitulo">Titulo del Proyecto</label>
                        <textarea id="txtTitulo" class="form-control" rows="3"></textarea>
                    </div>

                    <p class="lead mb-10  text-dark">
                        Seleccionar Revisores del proyecto
                    </p>
                    <input type="hidden" value="0" id="txtIRevisr">
                    <input type="hidden" value="0" id="txtImagens">
                    <div class="row g-2">
                        <div class="col-auto">
                            <label for="staticRevisores" class="visually-hidden">Revisores</label>
                            <input type="text" readonly class="form-control-plaintext" id="staticRevisores" value="Buscar Revisores">
                        </div>
                        <div class="col-auto">
                            <label for="cboBuscarRevisores" class="visually-hidden">Buscar Revisores</label>
                            <select id="cboBuscarRevisores" class="default-select2 form-control" style="width: 100%;">
                                <option value="">Escriba el nombre o CI del Revisor...</option>
                            </select>
                        </div>
                        <%--<div class="col-auto">
                            <div class="input-group">
                                <div class="input-group-text">Revisor</div>
                                <input type="text" id="txtNombrecompletoRe" class="form-control" readonly>
                            </div>
                        </div>--%>
                    </div>

                    <hr class="bg-gray-500 mb-3">

                    <div class="row g-3">

                        <div class="col-auto">
                            <div class="input-group">
                                <div class="input-group-text">Revisor</div>
                                <input type="text" id="txtNombrecompletoRe" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="input-group">
                                <label class="input-group-text" for="cboTiposRevisor">Tipo de Revisor</label>
                                <select class="form-select" id="cboTiposRevisor">
                                    <option value="1">Activosdd</option>
                                    <option value="0">Inactivodsds</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-auto">
                            <button id="btnAgregar" type="button" class="btn btn-primary mb-3">Agregar</button>
                        </div>
                    </div>

                    <div class="table-responsive mt-3 mb-3">
                        <table class="table table-striped table-hover mb-0 align-middle">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email Address</th>
                                    <th width="1%"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="assets/img/user/user-1.jpg" class="rounded h-30px">
                                    </td>
                                    <td>Nicky Almera</td>
                                    <td>nicky@hotmail.com</td>
                                    <td nowrap="">
                                        <a href="#" class="btn btn-sm btn-primary w-60px me-1">Edit</a>
                                        <a href="#" class="btn btn-sm btn-white w-60px">Delete</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="../assets/img/user/user-3.jpg" class="rounded h-30px">
                                    </td>
                                    <td>Harvinder Singh</td>
                                    <td>harvinder@gmail.com</td>
                                    <td class="with-btn" nowrap="">
                                        <a href="#" class="btn btn-sm btn-primary w-60px me-1">Edit</a>
                                        <a href="#" class="btn btn-sm btn-white w-60px">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="row">
                        <div class="col-xl-12 text-center mt-3 mb-2">
                            <button id="btnGuardarReg" type="button" class="btn btn-sm btn-lime me-2"><i class="fas fa-pencil me-2"></i>Guardar Cambios</button>
                            <a href="ListaDocentesPage.aspx" class="btn btn-sm btn-success"><i class="fas fa-circle-arrow-left me-2"></i>Volver</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-5">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <h4 class="panel-title">Documento Proyecto</h4>
                </div>
                <div class="panel-body">
                    <div class="mb-3">
                        <label for="txtpdf" class="form-label">Debe seleccionar Documento en PDF</label>
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
    <script src="js/ModuloProyectoPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
