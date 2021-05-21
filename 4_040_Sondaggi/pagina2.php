﻿<!DOCTYPE html>
<html lang="it">
 <head>
 <meta charset="UTF-8"/>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> PHP </title>
	<script> src="https://code.jqeury.com/jquery-3.6.0.js"
	integrity="sha256-H+K7U5CnX"
	crossorigin="anonymus"</script>
	<link rel="stylesheet" href="index.css"/>
	<script type="application/javascript" src="index.js"> </script>
</head>

	<body>
		<?php
            require("php-mysqli.php");
            // step 1: lettura e controllo parametri
            if(isset($_REQUEST["lstSondaggi"]))
                $id = $_REQUEST["lstSondaggi"];
            else die("Parametro mancante: id");

			// step 2: connessione
            $con = _connection("4b_sondaggi");
            
			// step 3: esecuzione query
			$sql = "SELECT * FROM sondaggi WHERE id=$id";
            $rs = _eseguiQuery($con,$sql)[0];
            
			// step 4: visualizzazione dati
            echo("<h1> Sondaggio su : $rs[titolo] </h1>");
            echo("<hr> <img width=200px style='margin:15px' src=img/$rs[img]>");
            echo("<h3 style='margin:15px'> Rispondi alla seguente domanda: </h3>$rs[domanda]<hr>");
		?>
		<form action="risultati.php" method="POST">
			<div style='margin:15px'>
			<input type="radio" name="optRisposta" value="nSi">Si<br/>
			<input type="radio" name="optRisposta" value="nNo">No<br/>
			<input type="radio" name="optRisposta" value="nNs">Non so<br/>
			</div>
			<?php
			echo("<input type='hidden' name='id' value=$id>")
			?>
			<input type="submit" value="invia"><br/>
		</form>
		<?php 
			//step 5 chiusura connessione
			$con->close();
		?>
	</body>
</html>