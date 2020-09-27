'use strict'

window.onload=function(){
	let studente = {
		"nome" : "mario",
		"cognome" : "rossi",
		"eta" : 16,
		"studente" : true,
		"images" : ["smile.gif", "grim.gif", "frown.gif", "bomb.gif"],
		"hobbies" : [], // vettore al momento vuoto
		"pos": { "x": 40, "y": 300 }, // oggetto annidato
		"stampa" : function () { alert("Hello " + this.nome); },
		"fullName" : function () { return this.nome + " " + this.cognome; }
		};
		this.console.log(studente.eta); //this.console.log(studente["eta"]);
		studente.eta++;//incremento di 1 l'eta
		this.console.log(studente.eta);
		this.console.log(studente.fullName());//this.console.log(studente[fullName]());

		//aggiunta di una nuova chiave
		studente["residenza"]="Fossano";
		studente.classe="4B Info";

		this.console.log(studente.residenza);
		this.console.log(studente["classe"]);
		//verifico se la chiave classe è presente in studente
		if("classe" in studente){
			this.console.log(studente.classe);
		}
		else{
			this.console.log("Chiave inesistente");
		}
		//this.console.clear();

		//dichiarazione nuovo Object
		let studente2={};
		studente2.nome="Pluto";
		studente2.residenza="Alba";
		//scansione delle proprietà di un oggetto
		this.console.log("STUDENTE 2");
		for (const key in studente2) {//const è costante, posso usare anche let ma meglio const
			if (studente2.hasOwnProperty(key)) { //uguale a if(key in studente), ma dato che for in prende chiave da studente è inutile
				this.console.log(key +" - "+studente2[key]);
				
			}
		}
		this.console.log("STUDENTE");
		for (const key in studente) {//const è costante, posso usare anche let ma meglio const
			/*if (!(studente[key]).toString().includes("function")) { //uguale a if(key in studente), ma dato che for in prende chiave da studente è inutile
				this.console.log(key +" - "+studente[key]);
				
			}*/
			if ((typeof(studente[key])!="function")){ //uguale a if(key in studente), ma dato che for in prende chiave da studente è inutile
				this.console.log(key +" - "+studente[key]);
				
			}
		}

		//serializzazione d un oggetto
		this.console.log(studente);//console log serializza in automatico, alert no
		this.alert(studente);
		this.alert(this.JSON.stringify(studente));

		//vettore enumerativo di chiavi estratto da JSON
		let keys= Object.keys(studente);
		//consente di scorrere valori di vettore enumerativo
		for (const iterator of keys) {
			this.console.log(iterator);
		}

}