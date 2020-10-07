"use strict"

window.onload = function(){
    let intestazioni=["","id","name","alcholic","main ingredients",""];
    let larghezza=[40,40,60,70,70,40];
    let _table= this.document.getElementById("table");
    let _lstIngredients=document.getElementById("lstIngredienti");
    _lstIngredients.addEventListener("change",caricaTabellaCocktails);
    let _optTutti=document.getElementById("optTutti");
    let _optAlcoholic=document.getElementById("optAlcoholic");
    let _optNonAlcoholic=document.getElementById("optNonAlcoholic");
    _optTutti.addEventListener("click",caricaTabellaCocktails);
    _optAlcoholic.addEventListener("click",caricaTabellaCocktails);
    _optNonAlcoholic.addEventListener("click",caricaTabellaCocktails);
    caricaListaIngredienti();
    caricaTabellaCocktails();


    //**********FUNCTIONS**************/
    function creaIntestazione(){
        let _tr=document.createElement("tr");
        _table.appendChild(_tr);
        for (let i = 0; i < intestazioni.length; i++) {
            let _th=document.createElement("th");
            _th.innerHTML=intestazioni[i];
            _th.style.width=larghezza[i]+"px";
            _tr.appendChild(_th);
        }
    }

    function caricaListaIngredienti(){
        let vetIngredients=ingredients.ingredients;//ingredients["ingredients"];

        //ordino il vettore di Object
        //avendo object devo indicare per quale campo devo ordinare. faccio io il confronto tra i due record
        vetIngredients.sort(function(record1, record2) {
            let str1 = record1.strIngredient1.toUpperCase();
            let str2 = record2.strIngredient1.toUpperCase();
            if (str1 < str2)
            return -1;
            else if (str1 > str2)
            return 1;
            else return 0;
        });
        //console.log(vetIngredients);
        
        //caricamento della listbox
        let _option=document.createElement("option");
        _option.innerHTML="";
        _lstIngredients.appendChild(_option);
        for (const item of vetIngredients) {
            _option=document.createElement("option");
            _option.innerHTML=item.strIngredient1;
            _lstIngredients.appendChild(_option);
        }
    }
    function caricaTabellaCocktails() {
        _table.innerHTML="";
        creaIntestazione();
        let vetCocktails=cocktails.drinks;
        for (const item of vetCocktails) {
            if ((_optTutti.checked||(_optAlcoholic.checked&&item.strAlcoholic=="Alcoholic")||(_optNonAlcoholic.checked&&item.strAlcoholic=="Non alcoholic"))&&(_lstIngredients.value==""||_lstIngredients.value==item.strIngredient1)) {
                let _tr=document.createElement("tr");
                let _td;
                _table.appendChild(_tr);
                //immagine
                _td=document.createElement("td");
                _tr.appendChild(_td);
                let _img=document.createElement("img");
                _img.src=item.strDrinkThumb;
                _img.style.width="40px";
                _td.appendChild(_img);


                //id
                _td=document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML=item.idDrink;

                //id
                _td=document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML=item.strDrink;

                //alcoholic
                _td=document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML=item.strAlcoholic;
                
                //id
                _td=document.createElement("td");

                _tr.appendChild(_td);
                _td.innerHTML=item.strIngredient1;

                //dettagli
                _td=document.createElement("td");
                _tr.appendChild(_td);
                let _a = document.createElement("a");
                _td.appendChild(_a);
                _a.href="#";
                _a.innerHTML="dettagli"
                _a.idDrink=item.idDrink;
                _a.addEventListener("click",visualizzaDettagli);
            }
        }
            
    }

    function visualizzaDettagli(){
        let  _divDettagli=document.getElementById("dettagli");
        _divDettagli.innerHTML="";
        for (const item of cocktails.drinks) {
            if (this.idDrink==item.idDrink) {

                //h3
                let _h3=document.createElement("h3");
                _h3.innerHTML=item.strDrink;
                _divDettagli.appendChild(_h3);

                //ingredients
                let ingredients="";
                for (let i = 1; i <= 5; i++) {
                    if(item["strIngredient"+i]!=null){
                        ingredients+=item["strIngredient"+i]+" - ";    
                    }      
                }
                let _p=document.createElement("p");
                _p.innerHTML=ingredients;
                //_p.style.width="100px";
                _divDettagli.appendChild(_p);

                //img
                let _img = document.createElement("img");
                _img.src=item.strDrinkThumb;
                _img.style.width="140px";
                _divDettagli.appendChild(_img);
                break;
            }
        }
    }
}