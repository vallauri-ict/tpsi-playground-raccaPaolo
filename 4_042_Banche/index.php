<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Sistema Bancario Italiano</title>	
	<link rel="icon" href="img/icoVallauri.png" type="image/png"/>
	
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css">
	<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">	
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">

	<script src="https://code.jquery.com/jquery-3.4.1.min.js"> </script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
	<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js" charset="utf8"></script>

	<script src="libreria.js"></script>
	<script src="index.js"></script>
</head>


<body>
<div class="container-fluid">
<div class="row" style="margin-top:2%">
  <div class="col-sm-3"></div>
  <div class="col-sm-6">
	<!-- Barra di navigazione -->
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark">		
		<a class="navbar-brand" href="#">
			<img src="img/icoVallauri.png" class="img-fluid" style="width:40px;">
		</a>		  
		<!-- Links Container -->
	    <ul class="navbar-nav">
			<li class="nav-item active">  
			  <a class="nav-link" href="#">Home</a>
			</li>
			<li class="nav-item">
			  <a class="nav-link" href="#">Page2</a>
			</li>
			<li class="nav-item">
			  <a class="nav-link" href="#">Page3</a>
			</li>
	    </ul>
		<!-- Pulsanti a destra -->
        <ul class="navbar-nav ml-auto"> 
			<li class="nav-item">
				<span class="input-group-text bg-dark"> 
					<i class="fas fa-user-edit"> </i>
					<a class="nav-link" href="#">cambia password</a>
				</span>
			</li>
			<li class="nav-item">
				<span class="input-group-text bg-dark"> 
					<i class="fas fa-sign-out-alt"> </i>
					<a class="nav-link" href="#">logout</a>
				</span>
	    </ul>
	</nav>	
    <br>
	
	<!-- titolo -->
	<div class="alert alert-info">
		<h2 class="text-center">			
			Sistema Bancario Italiano 
		</h2>
	</div>

	<!-- Lista Banche -->
	<div class="form-group alert alert-info" id="wrapBanche">
		<div class="row">
			<div class="col-sm-3"></div>
			<div class="col-sm-6">
				<label for="lstBanche">Scegli una banca:</label>
				<select class="form-control" id="lstBanche">
					<?php
						require("servizi/php-mysqli.php");
						//step 2
						$con=_connection();
						//step 3
						$sql="SELECT cBanca,Nome FROM Banche";
						$rs=_execute($con,$sql);						
						foreach($rs as $item){
							$cBanca=$item["cBanca"];
							echo("<option value=$cBanca>".$item["Nome"]."</option>");
						}
						$con->close();
					?>
				</select>
			</div>
			<div class="col-sm-3"></div>
		</div>
	</div>

	<!-- Lista Filiali -->
	<div class="form-group alert alert-info" id="wrapFiliali">
		<div class="row">
			<div class="col-sm-3"></div>
			<div class="col-sm-6">
				<label for="lstFiliali">Scegli una Filiale:</label>
				<select class="form-control" id="lstFiliali"></select>
			</div>
			<div class="col-sm-3"></div>
		</div>
	</div>

	<!-- Tabella Correntisti -->
	<div class="table-responsive" id="wrapCorrentisti">
		<table class="table table-hover" id="tabCorrentisti">
			<thead class="bg-info">
				<tr>
					<th>ID</th>
					<th>Nome</th>
					<th>Comune</th>
					<th>Telefono</th>
					<th>n. conto</th>
					<th>Saldo</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
		
  </div>
  <div class="col-sm-3"></div>
	
</div>	
</div>
</body>
</html>