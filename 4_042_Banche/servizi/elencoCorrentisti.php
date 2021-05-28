<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    // step 1: lettura parametri
   
    if(isset($_REQUEST["cFiliale"])){
        $cFiliale=$_REQUEST["cFiliale"];
    }
    else{
        http_response_code(400);
        die ("Parametro mancante: cFiliale");
    }

    // step 2: apertura connessione
    $con = _connection();

    // step 3: esecuzione query
    // per prendere tutti i record omettere WHERE
    // qualunque istruzione di selezione inizia con SELECT
    $sql = "SELECT * FROM conti,correntisti WHERE correntisti.cCorrentista = conti.cCorrentista and cFiliale = $cFiliale";//dopo where CONDIZIONE DI JOIN, il campo in comune alle due tabelle
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