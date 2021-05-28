<?php
//prima di aperto script e dopo chiuso script NON DEVE ESSERCI NULLA, NEANCHE UNO SPAZIO, in quanto viene restituito come risultato al client, potendo causare dei malfunzionamenti
//il json inviato come risposta deve essere serializzato (inviato come stringa) e le chiavi devono essere scritti come le virgolette doppie
    /*echo('{
        "ris":"ok"
    }')*/

    //dichiarazione del content type
    header('Content-type: text/html; charset=utf-8');

    require("php-mysqli.php");
    //step 1 
    //null
    //step 2
    $con = _openConnection("4bi_dischi");
    //step 3 esecuzione della query
    $sql="SELECT * FROM dischi";//per prendere tutti le righe ometto il where
    $rs=_eseguiQuery($con,$sql);
    //step 4: invio dei dati al client
    echo(json_encode($rs));
    //step 5: chiusura
    $con->close();

?>