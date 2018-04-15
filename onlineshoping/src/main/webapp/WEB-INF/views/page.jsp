<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<spring:url var="css" value="/resources/css" />
<spring:url var="js" value="/resources/js" />
<spring:url var="images" value="/resources/images" />
<c:set var="contextRoot" value="${pageContext.request.contextPath }"/>

<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Online Shopping ${title} </title>
	<script type="text/javascript">
		window.menu = '${title}';
		window.contextRoot='${contextRoot}';
	</script>
	
	
   <!-- Bootstrap Core CSS -->
<link href="${css}/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap Materia Theme -->
<link href="${css}/bootstrap.materia.theam.css" rel="stylesheet">


<!-- Bootstrap DataTables -->
<link href="${css}/dataTables.bootstrap4.css" rel="stylesheet">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

<!-- Custom CSS -->
<link href="${css}/myapp.css" rel="stylesheet">

  </head>

  <body>
  
  <div class="wrapper">

    <!-- Navigation -->
	<%@include file="./shared/navbar.jsp" %>   
	
    <!-- Page Content -->
    <!-- Home  -->
    <div class="content">
    <c:if test="${userClickHome==true }">
   		<%@include file="home.jsp" %>
   	</c:if>
   	
   	<!-- About US -->
   	 <c:if test="${userClickAbout==true }">
   		<%@include file="about.jsp" %>
   	</c:if>
   	
   	 <c:if test="${userClickContact==true }">
   		<%@include file="contact.jsp" %>
   	</c:if>
   	
   	<!-- All Products or Category -->
   	<c:if test="${userClickAllProducts==true or userClickCategoryProducts==true}">
   		<%@include file="listProducts.jsp" %>
   	</c:if>
   	
   	<!-- Single Product -->
   	<c:if test="${userClickShowProduct==true}">
   		<%@include file="singleProduct.jsp" %>
   	</c:if>
   	
   	<!-- Manage Product -->
   	<c:if test="${userClickedManageProducts==true}">
   		<%@include file="manageProduct.jsp" %>
   	</c:if>
   	
   	</div>
    <!-- /.container -->

    	<!-- Footer comes here -->
		<%@include file="./shared/footer.jsp"%>

		<!-- jQuery -->
		<script src="${js}/jquery.min.js"></script>
		
		<!-- Bootstrap Core JavaScript -->
		<script src="${js}/bootstrap.min.js"></script>
		
		<!-- DataTable Plugin -->
		<script src="${js}/jquery.dataTables.js"></script>
		
		<!-- DataTable Plugin -->
		<script src="${js}/dataTables.bootstrap4.js"></script>
		
		<!-- Jquery Validator -->
		<script src="${js}/jquery.validate.js"></script>
		
		
		<!-- Boot Box -->
		<script src="${js}/bootbox.min.js"></script>
		
		
		
		<!-- Self coded javascript -->
		<script src="${js}/myapp.js"></script>
	
	</div>
  </body>

</html>
