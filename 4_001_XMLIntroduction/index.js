'use strict'

function crea(){
	//variabile bookstore presente in altro file
	localStorage.setItem("bookstore_xml",bookstore);
	alert("Dati salvati corretamente");
}
function visualizza(){
	//lettura della stringa dal local store
	let xml = localStorage.getItem("bookstore_xml");
	//istanzio un nuovo parser
	let parser = new DOMParser();
	//parsifico stringa xml
	let xmlDoc = parser.parseFromString(xml,"text/xml");
	//accedo alla radice dell'albero
	let root = xmlDoc.documentElement;
	let nLibri=root.children.length;
	alert("Dati letti correttamente. Num. di record letti: "+nLibri);

	//accedo a tBody e lo pulisco
	let _tBody= document.getElementById("tabLibri");
	_tBody.innerHTML="";

	//carico tBody
	for(let i=0;i<nLibri;i++){
		

		let titolo="", categoria="", autori="",lingua="",anno="",prezzo="";
		let libro=root.children[i];

		if(libro.hasAttribute("category")){
			categoria=libro.getAttribute("category");
		}



		//titolo= libro.children[0].textContent;

		//ipotizziamo record non ordinati
		for(let j=0;j<libro.children.length;j++){
			let campo=libro.children[j];
			switch(campo.nodeName){
				case('title'):
					titolo=campo.textContent;
					if(campo.hasAttribute("lang")){
						lingua=campo.getAttribute("lang");
					}
					break;
				case('year'):
					anno=campo.textContent;
					break;
				case('author'):
					autori+=autori==""?campo.textContent:" - "+campo.textContent;
					break;
				case('price'):
					prezzo=campo.textContent;
					break;				
			}
		}



		//creo la riga e la appendo al DOM
		let tr= document.createElement("tr");
		_tBody.appendChild(tr);
		//creo le celle

		let td;
		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=titolo;
		td.style.border=0;

		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=categoria;
		td.style.border=0;

		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=lingua;
		td.style.border=0;

		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=autori;
		td.style.border=0;

		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=anno;
		td.style.border=0;

		td=document.createElement("td");
		tr.appendChild(td);
		td.innerHTML=prezzo;
		td.style.border=0;


	}

	/*
	//prova
	let serializer = new XMLSerializer();
	let aus = serializer.serializeToString(xmlDoc);
	console.log(aus);
	*/
}