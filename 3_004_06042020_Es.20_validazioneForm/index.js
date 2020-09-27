"use strict"
let _email,_cognome,_nome,_matricola,_regione,_telefono,_ricPart;
window.onload = function(){
    _cognome=document.getElementsByName("cognome")[0];
    _nome=document.getElementById("nome");
    _matricola=document.getElementsByName("matricola")[0];
    _regione=document.getElementsByName("regione")[0];
    _email=document.getElementsByName("email")[0];
    _telefono=document.getElementsByName("tel")[0];
    _ricPart=document.getElementsByName("richiesta")[0];

}
function validaForm() {
    if(_cognome.value==""){
        alert("Inserisci cognome");
        _cognome.classList.add("red-border");
        return false;//necessario per evitare submit
    }else{
        _cognome.classList.remove("red-border")
    }
    if(_nome.value==""){
        alert("Inserisci nome");
        _nome.classList.add("red-border");
        return false;//necessario per evitare submit
    }else{
        _nome.classList.remove("red-border")
    }
    if (isNaN(parseInt(_matricola.value))){
        alert("La matricola deve essere presente e numerica");
        _matricola.classList.add("red-border");
        return false;
    }else{
        _matricola.classList.remove("red-border");
    }
    if (_regione.selectedIndex==0){
        alert("Inserisci una regione");
        return false;
    }
    if(_telefono.value==""&&_email.value==""){
        alert("Inserisci un contatto");
        _telefono.classList.add("red-border");//seleziono solo uno
        return false;
    }else{
        _telefono.classList.remove("red-border");
    }
}

