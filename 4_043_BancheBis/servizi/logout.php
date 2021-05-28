<?php
    header('Content-type: application/json; charset=utf-8');
    
    session_start();//accedo alla sessione
    session_unset();//rimuove tutte le variabili di sessione
    session_destroy();//rimuove la sessione

    echo('{"ris":"ok"}');
?>