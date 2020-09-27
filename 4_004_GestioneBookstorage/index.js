'use strict'

window.onload=function(){
    let json=this.localStorage.getItem("bookstore.json");
    let jsonVet=JSON.parse(json);
    let _table=this.document.createElement("table");
    let _body=this.document.getElementsByTagName("body")[0];
    _body.appendChild(_table);

    //creo le intestazioni
    let _tr=this.document.createElement("tr");
    _table.appendChild(_tr);
    let intestazioni=["Title","Authors","Category","Price"];
    for (let i = 0; i < intestazioni.length; i++) {
        let _th=this.document.createElement("th");
        _th.innerHTML=intestazioni[i];
        _tr.appendChild(_th);      
    }
}