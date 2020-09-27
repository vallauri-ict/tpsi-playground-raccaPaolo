# Esercizio 21 - Validazione Form Avanzata
## Obiettivo:
realizzare un programma Javascript simile all'esercizio 20, ma più complesso, che consenta di controllare i dati inseriti dall'utente all'interno di una form prima di effettuare il submit di quest'ultima. Segnalare eventuali errori nell' input man mano che l'utente compila i campi (durante l'evento *onChange* dei vari elementi, ove possibile) e al termine con una *alert* riassuntiva.
Utilizzare le funzioni **.classList.add()** e **.classList.remove()**, lavorare durante l'evento **onChange**
## Procedimento:
dopo aver creato i puntatori ai vari elementi della pagina durante l'onload della pagina, andiamo a realizzare la procedura che verrà richiamata prima di ogni submit della form ad un eventuale server. 
In questa funzione, chiamata *invio*, vado ad effettuare in ordine i seguenti controlli:
1. Verifico che i *value* del campo Nominativo e Cap, non siano uguali a "stringa vuota" (""), dato che se l'utente non avesse mai modificato questi campi dopo il *load* della pagina, non verrebbero generati errori.
2. Verifico che uno dei due *radio-button* del campo "sesso" sia stato selezionato
3. Controllo l'indice attualmente selezionato della listBox *ateneo* sia diverso da 0, il valore nullo di default.
4. Nel caso il check-button *lavoratore* sia selezionato, controllo che la *text-box* per la descrizione del lavoro non sia vuoto.
Inoltre:
- Quando viene modificato lo stato del check-button attivo o disattivo la relativa textbox, resettando anche lo stato di eventuali classi.
- Quando viene richiamato l'evento *onChange* relativo alla textbox *nominativo*, controllo che in quest'ultima non siano presenti caratteri numerici.
- Quando viene richiamato l'evento *onChange* relativo alla textbox *cap*, controllo che la lunghezza dell'input corrisponda a 5 e che tutti i caratteri del *value* siano numerici.
In caso una di queste condizioni non sia soddisfatta, nel relativo elemento del vettore *messaggioErrore* viene inserito l'errore, e dove possibile e applico la classe ***red-border*** presente nel nostro file CSS, che imposta il colore del bordo a rosso. Inoltre, la funzione *invio* restituisce ***false***, che non effettua il submit. In caso l'errore venga corretto, viene rimossa la classe e il valore dell'elemento è impostato a ""(stringa vuota). Quando vado a effetture la stampa sull'alert, attraverso un ciclo For, controllo che il valore di ogni elemento del vettore sia diverso da "", altrimenti lo aggiungo alla variabile *messaggioFinale*. In caso ques'ultima sia vuota, il submit procede.
## Osservazioni:
ho deciso di utilizzare un vettore per gestire i vari messaggi di errore, così da poterli gestire al meglio durante ogni modifica alla form, conoscendo il numero e l'ordine degli elementi della pagina.

