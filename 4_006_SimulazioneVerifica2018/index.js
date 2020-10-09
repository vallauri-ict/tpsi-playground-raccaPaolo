"use strict"

window.onload = function(){
    let _thead=document.getElementById("thead");
    let _tbody=document.getElementById("tbody");
    let _table=this.document.getElementById("table");
    _table.style.overflow="hidden";
    let _divDettagli=document.getElementById("dettagli");
    _divDettagli.style.lineHeight="0";//per evitare fuoriuscita da div dettagli
    let _lstNazioni=document.getElementById("lstNazioni");
    _lstNazioni.addEventListener("change",caricaTabella);
    let recordEliminati=[];
    //volendo si potrebbe fare json con dentro i 3 array, per poter accedere semplicemente con pos
    let nazioni=[];
    let contEliminati=[];
    let contNazioni=[];
    
    ordinaJson();
    creaVettoreNazioniECont();
    caricaLst();
    caricaIntestazioni();
    caricaTabella();


    //*******************funzioni***************************//
    function ordinaJson(){
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
    }

    function creaVettoreNazioniECont(){
        //creo vettore nazioni
        for(let i=0;i<json.results.length;i++){
            if(!nazioni.includes(json.results[i].nat)){
                nazioni.push(json.results[i].nat);
                let cont=0;
                for (const item of json.results) {
                    if(item.nat==nazioni[nazioni.length-1]){
                        cont++;
                    }
                }
                contNazioni.push(cont);
            }
        }
        //inizializzo a 0 per incremento con ++;
        for (let i = 0; i < nazioni.length; i++) {
            contEliminati[i]=0;            
        }
        console.log(nazioni);
        console.log(contNazioni);
    }

    function caricaLst(){
        _lstNazioni.innerHTML='<option value="tutti"> tutti </option>';

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
        let i=0;
        for (i=0;i<json.results.length;i++) {
            if(json.results[i].login.username==this.idItem){
                break;
            }
        }
        let pos=nazioni.indexOf(json.results[i].nat);
        contEliminati[pos]++;
        console.log(contEliminati);
        if(contEliminati[pos]==contNazioni[pos]){
            nazioni.splice(pos,1);
            contEliminati.splice(pos,1);
            contNazioni.splice(pos,1);
            _lstNazioni.selectedIndex=0;
            caricaLst();
        }
        caricaTabella();
    }
}



