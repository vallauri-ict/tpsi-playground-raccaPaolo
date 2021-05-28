<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    //step 0: controllo sessione
    _checkSession("cCorrentista");
    // step 1: lettura parametri
    $cCorrentista=$_SESSION["cCorrentista"];

    // step 2: apertura connessione
    $con = _connection();

    // step 3: esecuzione query
    // per prendere tutti i record omettere WHERE
    // qualunque istruzione di selezione inizia con SELECT
    $sql = "SELECT filiali.Nome,filiali.cFiliale FROM filiali,conti WHERE conti.cFiliale=filiali.cFiliale and conti.cCorrentista = '$cCorrentista'";//dopo where CONDIZIONE DI JOIN, il campo in comune alle due tabelle
    $rs = _execute($con, $sql);
    $sql2 = "SELECT Nome FROM correntisti WHERE cCorrentista = '$cCorrentista'";
    $rs2 = _execute($con, $sql2);
    if($rs&&$rs2){
        // step 4: invio dei dati al client
        $ris=array();
        $ris["Nome"]=$rs2[0]["Nome"];
        $ris["Filiali"]=$rs;
        echo(json_encode($ris));
    }
    else{
        $con -> close();
        http_response_code(500);
        die("Errore esecuzione query");
    }
    // step 5: chiusura della connessione
    $con -> close();
?>