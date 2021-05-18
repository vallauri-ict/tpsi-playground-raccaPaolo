<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> PHP </title>
	<link href="index.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="index.js"></script>
</head>

<body>
    <h1>Grazie della tua richiesta</h1>
        <?php
            $n1=0;
            $n2=0;
            $n3=0;

            //controllo dei parametri
            if(isset($_REQUEST["n1"])&&is_numeric($_REQUEST["n1"])){
                $n1=$_REQUEST["n1"];
            }
            else{
                die("Primo numero non valido");
            }
            if(isset($_REQUEST["n2"])&&is_numeric($_REQUEST["n2"])){
                $n2=$_REQUEST["n2"];
            }
            else{
                die("Secondo numero non valido");
            }
            if(isset($_REQUEST["n3"])&&is_numeric($_REQUEST["n3"])){
                $n3=$_REQUEST["n3"];
            }
            else{
                die("Terzo numero non valido");
            }

            //cerco maggiore
            if($n1>$n2&&$n1>$n3){
                echo("Il più alto è $n1");
            }
            else if($n2>$n3){
                echo("Il più alto è $n2");
            }
            else if($n3>$n2){
                echo("Il più alto è $n3");
            }
            echo("</br>Tipo di richiesta: <b>$_SERVER[REQUEST_METHOD]</b></br>");
            $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[PHP_SELF]";
            echo("URL Richiedente: <b>$actual_link</b></br>");
        ?>
</body>
</html>