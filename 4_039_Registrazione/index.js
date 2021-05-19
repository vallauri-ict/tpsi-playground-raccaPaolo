"use strict";
$(document).ready(function () {
    $("select[name=lstCitta]").prop("selectedIndex",-1);
	$("#btnInvia").on("click",function(){
        let msg = "";
        if ($("#txtNome").val()==""){
            msg+="Nome non inserito</br>";
        }
        if($("input[name=optIndirizzo]:checked").length==0){
            msg+="Nessun opt selezionato</br>";
        }
        let indice = $("select[name=lstCitta]").prop("selectedIndex");
        if(indice==-1){
            msg+="Residenza non selezionata";
        }
        if(msg!=""){
            $("#msg").html(msg);
        }
        else{
            $("#msg").empty();
        }
        let _form = ("#form1");
        _form.prop("action","pagina2.php");
        _form.prop("method","get");
        _form.submit();
    })
});