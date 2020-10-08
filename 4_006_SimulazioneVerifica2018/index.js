"use strict"

window.onload = function(){
    let _thead=document.getElementById("thead");
    let _tbody=document.getElementById("tbody");
    let _divDettagli=document.getElementById("dettagli");
    _divDettagli.style.lineHeight="0";//per evitare fuoriuscita da div dettagli
    let _lstNazioni=document.getElementById("lstNazioni");
    _lstNazioni.addEventListener("change",caricaTabella);
    let recordEliminati=[];

    caricaLst();
    caricaIntestazioni();
    caricaTabella();

    //*******************funzioni***************************//

    function caricaLst(){
        let nazioni=[];
        //ordino json in base a nazioni
        json.results.sort(function(record1, record2) {
            let str1 = record1.nat.toUpperCase();
            let str2 = record2.nat.toUpperCase();
            if (str1 < str2)
            return -1;
            else if (str1 > str2)
            return 1;
            else return 0;
            }); 
        //creo vettore nazioni
        for(let i=0;i<json.results.length;i++){
            if(!nazioni.includes(json.results[i].nat)){
                nazioni.push(json.results[i].nat);
            }
        }
        console.log(nazioni);

        //carico listbox
        for (const item of nazioni) {
            let _option=document.createElement("option");
            _option.innerHTML=item;
            _lstNazioni.appendChild(_option);
        }

    }

    function caricaTabella() {
        _tbody.innerHTML="";
        _divDettagli.innerHTML="";
        for (const item of json.results) {
            if ((_lstNazioni.value=="tutti"||_lstNazioni.value==item.nat)&&(!recordEliminati.includes(item.login.username))) {
                let _tr=document.createElement("tr");
                _tbody.appendChild(_tr);

                let _td=document.createElement("td");
                _td.innerHTML=item.name.first+" "+item.name.last;
                _tr.appendChild(_td)

                _td=document.createElement("td");
                _td.innerHTML=item.login.username;
                _tr.appendChild(_td)

                _td=document.createElement("td");
                _td.innerHTML=item.location.state;
                _tr.appendChild(_td)

                _td=document.createElement("td");
                _td.innerHTML=item.nat;
                _tr.appendChild(_td)

                _td=document.createElement("td");
                let _img=document.createElement("img");
                _img.src=item.picture.thumbnail;
                _img.style.width="50px";
                _img.idItem=item.login.username;//non utilizzare nomi già presenti nel Json
                _img.addEventListener("click",visualizzaDettagli);
                _td.appendChild(_img);
                _tr.appendChild(_td)
            }
        }
            
    }

    function caricaIntestazioni() {
        let intestazioni=["name","username","state","nat","img"];
        let _tr=document.createElement("tr");
        _thead.appendChild(_tr);
        let _th;
        for (const item of intestazioni) {
            _th=document.createElement("th");
            _th.innerHTML=item;
            _tr.appendChild(_th);
        } 
    }

    function visualizzaDettagli(){
        _divDettagli.innerHTML="";
        for (const item of json.results) {
            if (item.login.username==this.idItem) {
                let _img=document.createElement("img");
                _img.src=item.picture.large;
                _divDettagli.appendChild(_img);

                let _p=document.createElement("p");
                _p.innerHTML=item.name.first+" "+item.name.last;
                _divDettagli.appendChild(_p);

                _p=document.createElement("p");
                _p.innerHTML=item.email;
                _divDettagli.appendChild(_p);

                _p=document.createElement("p");
                _p.innerHTML=item.phone;
                _divDettagli.appendChild(_p);

                _p=document.createElement("p");
                _p.innerHTML=item.cell;
                _divDettagli.appendChild(_p);

                let _button=document.createElement("button");
                _button.innerHTML="elimina";
                _button.idItem=this.idItem;
                _button.addEventListener("click",eliminaRecord);
                _divDettagli.appendChild(_button);
            }
        }
    }
    function eliminaRecord(){
        _divDettagli.innerHTML="";
        recordEliminati.push(this.idItem);
        caricaTabella();
    }
}



