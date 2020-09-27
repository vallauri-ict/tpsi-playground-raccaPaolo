# Es. 19 - Calcolatrice
## Obiettivo: 
* Realizzare attraverso l'utilizzo di HTML, CSS e Javascript un sito web che svolga le funzioni di una semplice calcolatrice.
* Comprendere a pieno l'utilizzo della procedura *setAttribute*, gestire i vari eventi possibili
## Procedimento:
1. Dopo aver dichiarato globalmente diverse variabili, procediamo alla creazione dei vari puntatori agli elementi del dom, durante la  l'evento *onload* della pagina.
2. Utilizzando la procedura **setAttribute** impostiamo mediante un ciclo for la funzione "numero(valore)" ad ogni bottone con name "btnNumero". Procediamo analogalmente con i vari operatori.
3. Nella funzione "numero (valore)" scrivo le varie istruzioni per permettere l'input degli operandi. Utilizzo la variabile *contOper* per controllare i turni di inserimento e le variabili input1 e input2 per permettere gli input degli operatori. Inizialmente li utilizzo come stringhe per permetterne il concatenamento, per poi convertirli in interi nella funzione "operazione(indice)" per l'operatore 1 e nella funzione "calcola()" per l'operatore 2.
4. Nelle funzione "operazione (indice)" dapprima controllo il turno degli input, per capire se l'utente sta tentando di svolgere un'operazione nonostante ne abbia già precedentemente iniziata un'altra, e dopo assegno alla variabile globale "operatore" l'operatore cliccato dall'utente. Incremento il contatore "contOper" e azzero la textbox "txtDisplay".
5. Nella funzione "calcola()" controllo il corretto inserimento di entrambi gli operandi e successivamente attraverso uno switch verifico quale operando sia stato inserito. A questo punto effettuo l'operazione richiesta e predispongo la calcolatrice a effettuare ulteriori calcoli sul risultato appena ottenuto. Volessi invece effettuare un'operazione da capo o effettuassi errori, attraverso il click del pulsante "C" cancello le variabili reativi alle precedenti operazioni e la textbox "txtDisplay", resettando la calcolatrice. 

