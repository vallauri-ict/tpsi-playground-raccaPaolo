<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    // step 1: lettura parametri
   
    if(isset($_REQUEST["cBanca"])){
        $cBanca=$_REQUEST["cBanca"];
    }
    else{
        http_response_code(400);
        die ("Parametro mancante: cBanca");
    }

    // step 2: apertura connessione
    $con = _connection();

    // step 3: esecuzione query
    // per prendere tutti i record omettere WHERE
    // qualunque istruzione di selezione inizia con SELECT
    $sql = "SELECT cFiliale, Nome FROM filiali WHERE cBanca = $cBanca";
    $rs = _execute($con, $sql);
    if($rs){
        // step 4: invio dei dati al client
        echo(json_encode($rs));
    }
    else{
        $con -> close();
        http_response_code(500);
        die("Errore esecuzione query");
    }
    // step 5: chiusura della connessione
    $con -> close();
?>