"use strict"

let intestazioni = ["idMeal", "strMeal", "img", "", ""];
let larghezze = ["50px", "310px", "60px", "40px", "40px"];

window.onload=function()
{
    let _radioWrapper=this.document.getElementById("radioWrapper");
    let _table=document.getElementById("table");
    let _dettagliWrapper=document.getElementById("dettagliWrapper");
    let categoria="Breakfast";
    caricaRadioBtn();
    caricaTabella();



    //*********************functions**************************/
    
    function caricaRadioBtn() {
        for (const key in categoryList) {//for in per scorrere chiavi di un vettore associativo
            let _radioBtn=document.createElement("input");
            _radioBtn.type="radio";
            _radioBtn.name="category";
            _radioBtn.value=key;
            _radioWrapper.appendChild(_radioBtn);
            _radioBtn.addEventListener("click", function(){
                categoria=this.value;
                caricaTabella();
            });
            let _span=document.createElement("span");
            _span.innerHTML=key;
            _radioWrapper.appendChild(_span);
            let _br=document.createElement("br");
            _radioWrapper.appendChild(_br);
            if(key=="Breakfast"){
                _radioBtn.checked=true;
            }
        }
    }

    function caricaTabella() {
        _table.innerHTML="";
        creaIntestazione();
        for (const item of categoryList[categoria]) {
            let _tr=document.createElement("tr");
            
            //idMeal
            let _td=document.createElement("td");
            _td.innerHTML=item.idMeal;
            _tr.appendChild(_td);

            ///strMeal
            _td=document.createElement("td");
            _td.innerHTML=item.strMeal;
            _tr.appendChild(_td)
            
            //strMealThumb
            _td=document.createElement("td");
            let _img=document.createElement("img");
            _img.src=item.strMealThumb;
            _img.style.width="55px";
            _img.idMeal=item.idMeal;
            _img.addEventListener("click",mostraVideo);
            _td.appendChild(_img);
            _tr.appendChild(_td);

            //lente
            _td=document.createElement("td");
            _img=document.createElement("img");
            _img.src="img/lente.jpg";
            _img.style.width="30px";
            _img.idMeal=item.idMeal;
            _img.nome=item.strMeal;
            _img.addEventListener("click",visualizzaDettagli);
            _td.appendChild(_img);
            _tr.appendChild(_td);

            //elimina
            _td=document.createElement("td");
            _img=document.createElement("img");
            _img.src="img/delete.png";
            _img.style.width="30px";
            _img.idMeal=item.idMeal;
            _img.addEventListener("click",eliminaElemento);
            _td.appendChild(_img);
            _tr.appendChild(_td);

            _table.appendChild(_tr);
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
        for (const item of details.meals) {
            let meal=item.meals[0];
            if (meal.idMeal==this.idMeal) {
                _dettagliWrapper.innerHTML="<b>"+meal.strMeal+"</b> "+meal.strInstructions;
                break;
            }
        }
    }
    function eliminaElemento() {
        let item=categoryList[categoria];
        for (let i=0;i<item.length;i++) {
            if(categoryList[categoria][i].idMeal==this.idMeal){
                item.splice(i,1);
                break;
            }
        }
        caricaTabella();
    }
    function mostraVideo() {
        for (const item of details.meals) {
            let meal=item.meals[0];
            if (meal.idMeal==this.idMeal) {
                window.open(meal.strYoutube);
                break;
            }
        }
    }
}