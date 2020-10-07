"use strict"

window.onload = function(){
    let _table= document.getElementById("table");

    let _lstIngredienti=document.getElementById("lstIngredienti");
    let _td,_tr;
    let intestazioni=["","id","name","alcholic","main ingredients",""];
    let larghezza=[40,40,60,70,70,40];
    creaIntestazione();
    function creaIntestazione() {
        _tr = document.createElement("tr");
        _table.appendChild(_tr);


        for (let i = 0; i < 6; i++) {
               _td=document.createElement("td");
               _td.id="td"+i;
               _td.innerHTML=intestazioni[i];
               _td.style.width=larghezza[i]+"px";
               _tr.appendChild(_td);
            }
    }


  
    let listaIngredienti=[];
    listaIngredienti[0]="";
    for (let i = 0; i < ingredients.ingredients.length; i++) {
        listaIngredienti[i+1]=(ingredients.ingredients[i].strIngredient1);
        
    }
    listaIngredienti.sort();
    let _option;
    console.log(listaIngredienti);
    for (let i = 0; i < listaIngredienti.length; i++) {
        _option=document.createElement("option");
        _option.innerHTML=listaIngredienti[i];
        _lstIngredienti.appendChild(_option);
        
    }

    //creo tabella centrale
    creaTabellaCentrale();
    function creaTabellaCentrale() {

        for (let i = 0; i < cocktails.drinks.length; i++) {//coctails.children.lenght
            let _tr = document.createElement("tr");
            _table.appendChild(_tr);
            for (let j = 0; j < 6; j++) {
                _td=document.createElement("td");
                _td.id="tdDrinks"+i+"-"+j;
                _td.style.width=larghezza[j]+"px";
                _tr.appendChild(_td);
                switch (j) {
                    case 0:
                        _td.innerHTML='<img width=40px src='+cocktails.drinks[i].strDrinkThumb+'>';
                        break;
                    case 1:
                        _td.innerHTML=cocktails.drinks[i].idDrink;
                        break;
                    case 2:
                        _td.innerHTML=cocktails.drinks[i].strDrink;
                        break;
                    case 3:
                        _td.innerHTML=cocktails.drinks[i].strAlcoholic;
                        break;
                    case 4:
                        _td.innerHTML=cocktails.drinks[i].strIngredient1;
                        break;
                    case 5:
                        _td.innerHTML="<a href='#' >dettagli</a>";
                        break;
                    default:
                        break;
                }
             }
            
        }
    }
    let _optTutti=document.getElementById("optTutti");
    let _optAlcholic=document.getElementById("optAlcoholic");
    let _optNonAlcholic=document.getElementById("optNonAlcoholic");
    _optTutti.addEventListener("click",function(){_lstIngredienti.selectedIndex=0;_table.innerHTML="";creaIntestazione();creaTabellaCentrale()});
    _optAlcholic.addEventListener("click",function(){creaTabellaAlcohol("Alcoholic")});
    _optNonAlcholic.addEventListener("click",function(){creaTabellaAlcohol("Non alcoholic")});

    function creaTabellaAlcohol(alcol) {
        _lstIngredienti.selectedIndex=0;
        _table.innerHTML="";
        creaIntestazione();
        for (let i = 0; i < cocktails.drinks.length; i++) {//coctails.children.lenght
            if(cocktails.drinks[i].strAlcoholic==alcol){
            let _tr = document.createElement("tr");
            _table.appendChild(_tr);
            for (let j = 0; j < 6; j++) {
                _td=document.createElement("td");
                _td.id="tdDrinks"+i+"-"+j;
                _td.style.width=larghezza[j]+"px";
                _tr.appendChild(_td);
                switch (j) {
                    case 0:
                        _td.innerHTML='<img width=40px src='+cocktails.drinks[i].strDrinkThumb+'>';
                        break;
                    case 1:
                        _td.innerHTML=cocktails.drinks[i].idDrink;
                        break;
                    case 2:
                        _td.innerHTML=cocktails.drinks[i].strDrink;
                        break;
                    case 3:
                        _td.innerHTML=cocktails.drinks[i].strAlcoholic;
                        break;
                    case 4:
                        _td.innerHTML=cocktails.drinks[i].strIngredient1;
                        break;
                    case 5:
                        _td.innerHTML="<a href='#' >dettagli</a>";
                        break;
                    default:
                        break;
                }
             }
            
            }
        }
    }

    //gestisco listbox;
    _lstIngredienti.addEventListener("change",function () {
        if(_optTutti.checked){
        ricercaIngrediente("Tutti",listaIngredienti[_lstIngredienti.selectedIndex]);
        }
        else{
            if(_optAlcholic.checked){
                ricercaIngrediente("Alcoholic",listaIngredienti[_lstIngredienti.selectedIndex]);
            }
            else{
                ricercaIngrediente("Non alcoholic",listaIngredienti[_lstIngredienti.selectedIndex]);
            }
        }

    });

    function ricercaIngrediente(alcohol,item) {
        _table.innerHTML="";
        creaIntestazione();
        for (let i = 0; i < cocktails.drinks.length; i++) {//coctails.children.lenght
            if((cocktails.drinks[i].strAlcoholic==alcohol||alcohol=="Tutti")&&(cocktails.drinks[i].strIngredient1==item)){
            let _tr = document.createElement("tr");
            _table.appendChild(_tr);
            for (let j = 0; j < 6; j++) {
                _td=document.createElement("td");
                _td.id="tdDrinks"+i+"-"+j;
                _td.style.width=larghezza[j]+"px";
                _tr.appendChild(_td);
                switch (j) {
                    case 0:
                        _td.innerHTML='<img width=40px src='+cocktails.drinks[i].strDrinkThumb+'>';
                        break;
                    case 1:
                        _td.innerHTML=cocktails.drinks[i].idDrink;
                        break;
                    case 2:
                        _td.innerHTML=cocktails.drinks[i].strDrink;
                        break;
                    case 3:
                        _td.innerHTML=cocktails.drinks[i].strAlcoholic;
                        break;
                    case 4:
                        _td.innerHTML=cocktails.drinks[i].strIngredient1;
                        break;
                    case 5:
                        _td.innerHTML="<a href='#' >dettagli</a>";
                        break;
                    default:
                        break;
                }
             }
            
            }
        }
    
    }
}


