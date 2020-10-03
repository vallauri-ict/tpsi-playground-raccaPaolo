'use strict'

let _txtTitolo,_txtAutore,_txtCategoria,_txtLingua,_txtAnno,_txtPrezzo;
let jsonVet=[];

window.onload = function () {
    _txtTitolo=document.getElementById("txtTitolo");
    _txtAutore=document.getElementById("txtAutore");
    _txtCategoria=document.getElementById("txtCategoria");
    _txtLingua=document.getElementById("txtLingua");
    _txtAnno=document.getElementById("txtAnno");
    _txtPrezzo=document.getElementById("txtPrezzo");

    let json = localStorage.getItem("bookstore_json");
    jsonVet=JSON.parse(json);


}
function salva() {
    let jsonBook={};
    jsonBook.title=_txtTitolo.value;
    jsonBook["authors"]=[_txtAutore.value];
    jsonBook.category=_txtCategoria.value;
    jsonBook.lang=_txtLingua.value;
    jsonBook.year=_txtAnno.value;
    jsonBook.price=_txtPrezzo.value;
    jsonVet.push(jsonBook);
    alert("Record inserito");
    localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
    window.location.href="index.html";
}