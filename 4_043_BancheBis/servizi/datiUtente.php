<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    //step 0: controllo sessione
    _checkSession("cCorrentista");
    // step 1: lettura parametri
    $cCorrentista=$_SESSION["cCorrentista"];
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
    $sql = "SELECT * FROM movimenti,conti,operazioni WHERE conti.cConto = movimenti.cConto and movimenti.cOperazione = operazioni.cOperazione and conti.cCorrentista = '$cCorrentista' and conti.cFiliale = '$cFiliale'";//dopo where CONDIZIONE DI JOIN, il campo in comune alle due tabelle
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