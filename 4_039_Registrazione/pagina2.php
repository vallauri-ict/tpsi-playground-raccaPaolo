<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> PHP </title>
	<link href="index.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="index.js"></script>
</head>

<body>
    <h1> Pagina 2 </h1>
    <?php
    //leggo e controllo parametri
        if(isset($_REQUEST["txtNome"])){
            $nome=$_REQUEST["txtNome"];
        }
        else{
            die("Nome mancante");
        }
        if(isset($_REQUEST["optIndirizzo"])){
            $indirizzo=$_REQUEST["optIndirizzo"];
        }
        else{
            die("Indirizzo mancante");
        }
        if(isset($_REQUEST["chkHobbies"])){//qua quadre non vanno messe
            $hobbies=$_REQUEST["chkHobbies"];
            $hobbies=implode(',',$hobbies);//C# Array.Join()
        }
        else{
            $hobbies="";
        }
    ?>
</body>
</html>