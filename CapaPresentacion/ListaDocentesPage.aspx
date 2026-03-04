<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="ListaDocentesPage.aspx.cs" Inherits="CapaPresentacion.ListaDocentesPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="panel panel-inverse">
        <div class="panel-heading">
            <h4 class="panel-title">Docentes Registrados</h4>
            <div class="panel-heading-btn">
                <button id="btnNuevore" type="button" class="btn btn-xs btn-lime"><i class="fas fa-pencil me-2"></i>Nuevo Registro</button>
            </div>
        </div>
        <div class="panel-body">

            <table id="tbDocentes" width="100%" class="table table-striped table-bordered align-middle text-nowrap">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Imagen</th>
                        <th>Docentes</th>
                        <th>Nro CI</th>
                        <th>Correos</th>
                        <th>Celular</th>
                        <th>Estado</th>
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
    <script src="js/ListaDocentesPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
