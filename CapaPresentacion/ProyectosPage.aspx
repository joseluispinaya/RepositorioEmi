<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="ProyectosPage.aspx.cs" Inherits="CapaPresentacion.ProyectosPage" %>
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
    <div class="panel panel-inverse">
        <div class="panel-heading">
            <h4 class="panel-title">Proyectos Registrados</h4>
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

            <table id="tbProyect" width="100%" class="table table-striped table-bordered align-middle">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Documento</th>
                        <th>Autor</th>
                        <th>Fecha</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/select2ori/dist/js/select2.min.js"></script>
    <script src="js/ProyectosPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
