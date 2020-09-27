'use strict'

window.onload=function(){
    let _btn= this.document.getElementById("btnConverti");
    _btn.addEventListener("click",converti);//puntatore a variabile, se mettessi le tonde me la richiama subito

    //utilizzo localstorage creato da esercizio 001
    function converti(){
        let xml=localStorage.getItem("bookstore_xml");

        //parsifico
        let parser=new DOMParser;
        let xmlDoc=parser.parseFromString(xml,"text/xml");

        //accedo alla radice dell'albero
        let root=xmlDoc.documentElement;

        //vettore enumerativo in cui salvo i vari libri in formato JSON
        let jsonVet=[];

        //scansione dell'albero XML
        //root.children è un vettore enumerativo che contine tutti i book figli di root
        for (let i = 0; i < root.children.length; i++) {
            let book=root.children[i];
            let title="", category="",lang="",year="",price="",authors=[];//autori è un vettore enumerativo nel caso fossero > 1
            if (book.hasAttribute("category")) {
                category=book.getAttribute("category");
            }
            for (let j = 0; j < book.children.length; j++) {
                let campo=book.children[j];
                switch(campo.nodeName){
                    case('title'):
                        title=campo.textContent;
                        if(campo.hasAttribute("lang")){
                            lang=campo.getAttribute("lang");
                        }
                        break;
                    case('year'):
                        year=campo.textContent;
                        break;
                    case('price'):
                        price=campo.textContent;
                        break;	
                    case('author'):
                        //push aggiunge l'elemento in coda al vettore
                        authors.push(campo.textContent);
                        break;
                }                
            }
            console.log("BOOK");
            console.log(title);
            console.log(category);
            console.log(lang);
            console.log(year);
            console.log(price);
            console.log(authors);

            //dichiaro un vettore associativo (json) in modo rapido
            let jsonBook={};
            jsonBook.title=title;
            jsonBook.category=category;
            jsonBook.lang=lang;
            jsonBook.year=year;
            jsonBook["price"]=price;//sintassi alternativa
            jsonBook["authors"]=authors;
            jsonVet.push(jsonBook);
        }
        
        //alert(JSON.stringify(jsonVet));
        alert("Dati convertiti corretamente");
        //serializzo per salvare in localStorage
        localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
    }
}