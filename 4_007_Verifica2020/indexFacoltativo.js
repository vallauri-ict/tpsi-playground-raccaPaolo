"use strict"

let intestazioni = ["idMeal", "strMeal", "img", "", ""];
let larghezze = ["50px", "310px", "60px", "40px", "40px"];

window.onload=function()
{
    let record =0;
    let _radioWrapper=this.document.getElementById("radioWrapper");
    let _mainWrapper=document.getElementById("mainWrapper")
    let _table=document.getElementById("table");
    let _dettagliWrapper=document.getElementById("dettagliWrapper");
    let _nextPage=this.document.getElementById("nextPage");
    _nextPage.addEventListener("click",function(){
        record+=7;
        console.log(record);
        caricaTabella();
    })


    
    
    caricaRadioBtn();
    let _radioBtnVet=document.getElementsByName("category");
    console.log(_radioBtnVet);
    _radioBtnVet[0].checked=true;


    caricaTabella();



    //*********************functions**************************/
    
    function caricaRadioBtn() {
        _radioWrapper.innerHTML="";
        console.log

    for (const key in categoryList) {
        console.log(key)
        let _radioBtn=document.createElement("input");
        _radioBtn.type="radio";
        _radioBtn.name="category";
        _radioBtn.value=key;
        _radioWrapper.appendChild(_radioBtn);
        _radioBtn.addEventListener("click",caricaTabella);
        let _span=document.createElement("span");
        _span.innerHTML=key;
        _radioWrapper.appendChild(_span);
        let _br=document.createElement("br");
        _radioWrapper.appendChild(_br);
    }


    }

    function cercaSelectedRadio() {
        let i=0;
        for (i=0;i<_radioBtnVet.length;i++) {
            if(_radioBtnVet[i].checked){
                break;
            }
        }
        return i;
    }

    function caricaTabella() {
        _table.innerHTML="";
        creaIntestazione();
        let i;
        let pos=_radioBtnVet[cercaSelectedRadio()].value;
        for ( i = 0; i < categoryList[pos].length; i++) {

            if (record<=i&&i<record+7) {
                
            
            let _tr=document.createElement("tr");

            let _td=document.createElement("td");
            _td.innerHTML=categoryList[pos][i].idMeal;
            _tr.appendChild(_td);

            _td=document.createElement("td");
            _td.innerHTML=categoryList[pos][i].strMeal;
            _tr.appendChild(_td)

            _td=document.createElement("td");
            let _img=document.createElement("img");
            _img.src=categoryList[pos][i].strMealThumb;
            _img.style.width="55px";
            _img.idItem=categoryList[pos][i].idMeal;
            _img.addEventListener("click",mostraVideo);
            _tr.appendChild(_img);
            _tr.appendChild(_td);

            _td=document.createElement("td");
            _img=document.createElement("img");
            _img.src="img/lente.jpg";
            _img.idItem=categoryList[pos][i].idMeal;
            _img.nome=categoryList[pos][i].strMeal;
            _img.addEventListener("click",visualizzaDettagli);
            _img.style.width="30px";
            _tr.appendChild(_img);
            _tr.appendChild(_td);

            _td=document.createElement("td");
            _img=document.createElement("img");
            _img.src="img/delete.png";
            _img.categoria=pos;
            _img.posizione=i;
            _img.addEventListener("click",eliminaElemento);
            _img.style.width="30px";
            _tr.appendChild(_img);
            _tr.appendChild(_td);


            
            _table.appendChild(_tr);
            }
        }
            
        
    }
    
    function creaIntestazione() {
        let _tr=document.createElement("tr");
        for (let i=0;i<intestazioni.length;i++) {
            let _th=document.createElement("th");
            _th.innerHTML=intestazioni[i];
            _th.style.width=larghezze[i];
            _tr.appendChild(_th);
        }
        _table.appendChild(_tr);
    }

    function visualizzaDettagli() {
        _dettagliWrapper.innerHTML="";
        let _p=document.createElement("p");
        _p.innerHTML="<b>"+this.nome+"</b> ";

        for (let i = 0; i < details.meals.length; i++) {
            if(details.meals[i].meals[0].idMeal==this.idItem){
                _p.innerHTML+=details.meals[i].meals[0].strInstructions;
                break;
            }
            
        }
        _dettagliWrapper.appendChild(_p);

    }
    function eliminaElemento() {
        categoryList[this.categoria].splice(this.posizione,1);

        caricaTabella();
    }
    function mostraVideo() {
        for (let i = 0; i < details.meals.length; i++) {
            if(details.meals[i].meals[0].idMeal==this.idItem){
                window.open(details.meals[i].meals[0].strYoutube, "Video");
                break;
            }
            
        }
    }
}

//details.meals[i].meals[0].strCategory