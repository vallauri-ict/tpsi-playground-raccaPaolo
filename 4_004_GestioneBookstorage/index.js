'use strict'

window.onload = function () {
    let json = localStorage.getItem("bookstore_json");
    let jsonVet = JSON.parse(json);
    let _table = document.createElement("table");
    let _body = document.getElementsByTagName("body")[0];
    _body.appendChild(_table);

    //creo le intestazioni
    creaIntestazione();

    //lettura e caricamento dati
    caricaVisualizzaDati();

    //creazione dei dettagli
    let _divDettagli = document.createElement("div");
    _body.appendChild(_divDettagli);
    _divDettagli.setAttribute("class", "dettagli");

    let indiceLibroCorrente = 0;
    visualizzaDettagli();

    //creazione pulsanti
    creaPulsanti();

    function creaIntestazione() {
        let _tr = document.createElement("tr");
        _table.appendChild(_tr);
        let intestazioni = ["Title", "Authors", "Category", "Price", ""];
        for (let i = 0; i < intestazioni.length; i++) {
            let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            _tr.appendChild(_th);
        }
    }

    function caricaVisualizzaDati() {
        for (let i=0;i<jsonVet.length;i++) {
            //iteratore item = ogni book
            let item=jsonVet[i];

            let _tr = document.createElement("tr");
            _table.appendChild(_tr)

            let _td;
            _td = document.createElement("td");
            _td.innerHTML = item.title;
            _tr.appendChild(_td);

            _td = document.createElement("td");
            //authors è un enum, join unisce tutti elementi separati da stringa separatore
            //quando insersco JSON in un tag html fa serializzazione in automatico NB: separa con la virgola
            _td.innerHTML = item.authors.join(" ,");
            _tr.appendChild(_td);

            _td = document.createElement("td");
            _td.innerHTML = item.category;
            _tr.appendChild(_td);
            
            _td = document.createElement("td");
            _td.innerHTML = item.price;
            _tr.appendChild(_td);
            
            //creazione pulsante elimina
            _td = document.createElement("td");
            let _button = document.createElement("button");
            
            _button.innerHTML="Elimina";//button ha inner, input type button no, uso value
            _td.appendChild(_button)
            _tr.appendChild(_td);
            _button.addEventListener("click",eliminaRecord);
            _button.recordDaEliminare=i;
        }
    }

    function eliminaRecord(){
        let pos=this.recordDaEliminare;//this = button chiamante
        jsonVet.splice(pos,1);
        alert("Record eliminato");
        localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
        window.location.reload();
    }

    function visualizzaDettagli() {
        _divDettagli.innerHTML = "";
        let libroCorrente = jsonVet[indiceLibroCorrente];
        for (const key in libroCorrente) {
            //creo e appendo intestazione
            let _p1 = document.createElement("p");
            _p1.innerHTML = key + ": ";
            _p1.style.textAlign = "right",
                _p1.style.fontWeight = "bold";
            _divDettagli.appendChild(_p1);


            //creo e appendo contenuto
            let _p2 = document.createElement("p");
            _p2.innerHTML = libroCorrente[key];
            _divDettagli.appendChild(_p2);
        }
    }
    function creaPulsanti() {
        let _divPulsantiNavigazione = document.createElement("div");
        _divPulsantiNavigazione.setAttribute("class", "contenitorePulsantiNavigazione");
        _body.appendChild(_divPulsantiNavigazione);
        let nomiPulsanti = ["Primo", "Indietro", "Avanti", "Ultimo", "Aggiungi", "Elimina per categoria"];
        for (const item of nomiPulsanti) {
            let _button = document.createElement("button");
            //assegno come ID il nome del pulsante per poterlo rendere accessibile nelle altre procedure
            _button.id = item;
            _button.innerHTML = item;
            _button.setAttribute("class", "pulsantiNavigazione")
            _button.addEventListener("click", gestionePulsanti);
            _divPulsantiNavigazione.appendChild(_button);//button inline non va a capo


        }
        document.getElementById("Indietro").disabled = true;
    }

    function gestionePulsanti() {
        let _btnIndietro = document.getElementById("Indietro");
        let _btnAvanti = document.getElementById("Avanti");
        switch (this.innerHTML) {//this in questo caso si rifersce all'oggetto, perchè procedura diventa parte di quest'ultimo
            case "Primo":
                indiceLibroCorrente = 0;
                _btnIndietro.disabled = true;
                _btnAvanti.disabled = false;
                break;
            case "Indietro":
                indiceLibroCorrente--;
                if (indiceLibroCorrente == 0) {
                    _btnIndietro.disabled = true;

                }
                _btnAvanti.disabled = false;
                break;
            case "Avanti":
                indiceLibroCorrente++;
                if (indiceLibroCorrente == jsonVet.length - 1) {
                    _btnAvanti.disabled = true;

                }
                _btnIndietro.disabled = false;
                break;
            case "Ultimo":
                indiceLibroCorrente = jsonVet.length - 1;
                _btnAvanti.disabled = true;
                _btnIndietro.disabled = false;
                break;
            case "Aggiungi":
                //window.open("pagina2.html");
                window.location.href="pagina2.html";
                break;
            case "Elimina per categoria":
                let qta=0;
                let categoria=prompt("Inserisci la categoria da cancellare: ");
                //soluzione migliore è scorrere vettore al contrario, cosi che se elimino si spostano solo file già controllati
                for (let i = jsonVet.length-1; i >=0; i--) {
                    if(jsonVet[i].category==categoria){
                        jsonVet.splice(i,1);
                        qta++;
                    }
                }
                if(qta>0){
                    alert("Cancellati "+qta+" record");
                    //quando cancello dati solitamente si ricarica pagina, ma prima serializzo
                    localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
                    window.location.reload();
                }
                else{
                    alert("Nessun record trovato");
                }
                break;
            default:
                break;
        }
        visualizzaDettagli();
    }
}