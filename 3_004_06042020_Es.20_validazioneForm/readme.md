# Esercizio 20 - Validazione Form
## Obiettivo:
realizzare un programma Javascript che consenta di controllare i dati inseriti dall'utente all'interno di una form prima di effettuare il submit di quest'ultima. Segnalare eventuali errori nell' input attraverso un' *alert* e eventualmente evidenziando con un bordo rosso il campo errato.
Utilizzare le funzioni **addClass()** oppure **.classList.add()** e **removeClass()** o **.classList.remove()**
## Procedimento:
dopo aver creato i puntatori ai vari elementi della pagina durante l'onload della pagina, andiamo a realizzare la procedura che verrà richiamata prima di ogni submit della form ad un eventuale server. 
In questa funzione, chiamata *validaForm*, vado ad effettuare in ordine i seguenti controlli:
1. Verifico che i *value* dei campi Cognome e nome (puntatori identificati come _cognome e _nome) non siano uguali a "stringa vuota" ("")
2. Verifico il *value* del puntatore _matricola (prima effettuo un casting della stringa in intero) attraverso la funzione **isNaN**, con la quale posso sia controllare che il campo non sia vuoto, sia verificare che il valore sia un valore numerico. 
3. Controllo l'indice attualmente selezionato nella listBox *regioni*. Se è diverso da 0, il valore nullo di default, continuo.
4. Verifico che almeno uno dei due campi di contatto *email* e *telefono* siano compilati, altimentri dopo aver avvisato con l'*alert* seleziono uno dei due campi (scelto a priori), in questo caso il numero di telefono.
5. Non effettuo controlli sulla *textarea*, essendo facoltativa.
In caso tutte queste condizioni siano soddisfatte, il sumbit procede, altrimenti viene segnalato l'errore con il relativo avviso e applicazione della classe ***red-border*** presente nel nostro file CSS, che imposta il colore del bordo a rosso. Inoltre, la funzione restituisce *false*, che non effettua il submit. In caso l'errore venga corretto, viene rimossa la classe.
## Osservazioni:
è necessario ricordarsi che in caso siano presenti più errori vengono segnalati solo uno alla volta. Ho deciso di utilizzare le funzioni **.classList.add()** e **.classList.remove()** in quanto più intuive a parer mio.

