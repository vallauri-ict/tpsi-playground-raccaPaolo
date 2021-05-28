<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    // step 1: lettura parametri
    if(isset($_REQUEST["username"])){
        $user=$_REQUEST["username"];
    }
    else{
        http_response_code(400);
        die ("Parametro mancante: username");
    }
    if(isset($_REQUEST["password"])){
        $pwd=$_REQUEST["password"];
    }
    else{
        http_response_code(400);
        die ("Parametro mancante: password");
    }

    // step 2: apertura connessione
    $con = _connection();

    // step 3: esecuzione query
    // per prendere tutti i record omettere WHERE
    // qualunque istruzione di selezione inizia con SELECT
    $sql = "SELECT * FROM correntisti WHERE Nome = '$user'";//dopo where CONDIZIONE DI JOIN, il campo in comune alle due tabelle
    $rs = _execute($con, $sql);

    if(count($rs)>0){
        // step 4: invio dei dati al client
        if($rs[0]["Pwd"]==$pwd)
        {
            //accedo all'oggetto di sistema session relativo all'utente
            session_start();
            //dentro a sessione creo delle variabili
            $_SESSION["cCorrentista"]=$rs[0]["cCorrentista"];
            $_SESSION["scadenza"]=time()+SCADENZA;
            //salvo la sessione nei cookie
            setcookie(session_name(),session_id(),time()+SCADENZA,"/");//con id mi aggancio alla session dell'utente, dove trovo i dati salvati
            echo('{"ris":"ok"}');//per passare json diretto DEVO scriverlo sotto forma di stringa già serializzata
        }
        else{
            $con -> close();
            http_response_code(401);
            die("Password non valida");
        }
        
    }
    else{
        $con -> close();
        http_response_code(401);
        die("Username non valido");
    }
    // step 5: chiusura della connessione
    $con -> close();
?>