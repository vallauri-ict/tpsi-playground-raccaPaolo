# Es. 18 
## Obiettivo: 
comprendere l'utilizzo della funzione **Element.addEventListener()** e testare gli eventi **onClick**, **onMouseOver** e **onMouseOut**. Inziare ad utilizzare come parametro il value della keyword ***this***.
## Procedimento:
* dopo aver dichiarato le variabili globali, procediamo a realizzare la funzione da richiamare durante il *load* della pagina, nella quale creiamo i vari puntatori per collegare le variabili ai relativi elementi HTML. Inoltre, inizializziamo l'immagine di sfondo dei div *imgBox* e *imgRoll*. Infine, attravefso un ciclo For assegno ad ogni Radio Button presente nell'array di indici *radioBtns* il richiamo alla funzione *cambiaImmagine(this.value)* in caso di click, mediante la procedura **Element.addEventListener()**.
* realizzo la funzione *cambiaImmagine(this.value)*, nella quale prima associo il valore attuale della listBox al relativo Radio Button e vicerversa, così da mantenere sempre la corretta correlazione tra quest'ultimi. Successivamente, inserisco come sfondo di *imgBox* l'immagine scelta dall'utente, non prima di aver effettuato un **casting**.
* termino con le funzioni *rollOn()* e *rollOff*. Nella prima, richiamata durante l'hover sul div *imgRoll*, dopo aver generato un numero casuale, imposto la relativa immagine come background del div. Una volta terminato l'evento, viene richiamta la seconda funzione, che reimposta come sfondo del div l'immagine iniziale.

