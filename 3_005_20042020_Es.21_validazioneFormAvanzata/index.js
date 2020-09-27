"use strict"
let _nominativo, _sesso,_ateneo,_cap,_lavoratore,_descr;
let messaggioErrore=["","","","","","",""];
window.onload = function(){
    _nominativo=document.getElementById("nominativo")
    _sesso=document.getElementsByName("sesso");
    _ateneo=document.getElementsByName("ateneo")[0];
    _lavoratore=document.getElementsByName("lavoratore")[0];
    _descr=document.getElementsByName("descr")[0];
    _cap=document.getElementsByName("cap")[0];
}

function invio() {
    if (_nominativo.value==""){
        messaggioErrore[0]="Il nominativo è vuoto";
        _nominativo.classList.add("red-border");
    }
    if (_cap.value==""){
        messaggioErrore[1]="Il cap è vuoto";
        _cap.classList.add("red-border");
    }
    messaggioErrore[2]=_ateneo.selectedIndex==0?"Seleziona un ateneo":"";
    let select=false;
    for (let i=0;i<_sesso.length&&select==false;i++){
        if (_sesso[i].checked==true){
            select=true;
        }
    }
    messaggioErrore[3]=!select?"Seleziona un sesso":"";
    if (_lavoratore.checked){
        if (_descr.value==""){
            messaggioErrore[4]="Descrivi la tua occupazione";
            _descr.classList.add("red-border");
        }
        else {
            messaggioErrore[4]="";
            _descr.classList.remove("red-border");
        }

    }
    else{
        messaggioErrore[4]="";
    }
    let messaggioFinale="";
    for (let i=0;i<messaggioErrore.length;i++){
        if (messaggioErrore[i]!=""){
            messaggioFinale+=messaggioErrore[i]+"\n";
        }
    }

    if (messaggioFinale!=""){
        alert(messaggioFinale);
        return false;
    }
}


function cambioStatoChk () {
   _descr.disabled=!_lavoratore.checked;
    _descr.classList.remove("red-border");//nell'eventualità disattivassi il chk mentre è attiva la classe
}

function cambioStatoNominativo() {
    messaggioErrore[0]="";
    //anche se stringa è numero restituisce false
    let isNumber=false;
    for (let i=0;i<_nominativo.value.length&&!isNumber;i++){
        if(!isNaN(_nominativo.value[i])&&_nominativo.value[i]!=" "){//controllo anche spazio
            isNumber=true;
        }
    }
    if (isNumber){
        messaggioErrore[0]="É presente un carattere numerico nel nominativo";
        _nominativo.classList.add("red-border");

    }
    else{
        messaggioErrore[0]="";

        _nominativo.classList.remove("red-border");
    }
}

function cambioStatoCAP() {
    let errore,carattere=false;
    messaggioErrore[1]="";
    if (_cap.value.length!=5){
        messaggioErrore[1]+="La lunghezza del CAP è errata - ";
        _cap.classList.add("red-border");
        errore=true;
    }
    for (let i=0;i<_cap.value.length&&!carattere;i++) {
        if (isNaN(_cap.value[i])) {//correggeres
            carattere=true;
        }
    }
    if (carattere){
        errore=true;
        _cap.classList.add("red-border");
        messaggioErrore[1]+="Il cap contiene caratteri non numerici";
    }
     if(!errore){
        messaggioErrore[1]="";

        _cap.classList.remove("red-border");
    }
}