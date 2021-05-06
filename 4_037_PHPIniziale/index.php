<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> PHP </title>
	<link href="index.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="index.js"></script>
</head>

<body>
<?php
 $nome = "pippo";
 echo ("Il mio nome &egrave; $nome <br>");
 visualizza ($nome);
 function visualizza($nome) {
 echo ("<p style='font-weight:bold''>Il mio nome &egrave; $nome </p>");
 }
?>
<h1> Contenuto della variabile globale $_SERVER</h1>
</body>
</html>