# 4_023_Strage
## Obiettivo:
Realizzare tramite jQuery la seguente applicazione per l’esecuzione di una verifica on line a risposte chiuse.
- All’avvio l’intestazione “Test di Cultura Generale” esegue una animazione che, in un tempo di 1,5
sec, moltiplica x 15 le dimensioni ed il font-size dell’elemento medesimo.
- Al termine dell’animazione il sistema visualizza l’elenco delle domande.
Le domande sono suddivise per gruppi di argomenti.
Ogni gruppo contiene 10 domande. Ogni domanda pesa 1 punto.
Le domande di ogni argomento vengono caricate all’interno di un apposito fieldset avente come
legend l’argomento del gruppo. La legend è visualizzata con colore blu e font-size 12pt.
- A fianco di ogni domanda vengono riportati due radio button mutuamente esclusivi, il primo con a
fianco la scritta T ed il secondo con a fianco la scritta F.
I valori T e F sono memorizzati anche all’interno del value dei rispettivi radio buttons.
All’interno dei radio button si può inserire anche una informazione relativa alla risposta corretta in
modo da semplificare il controllo delle risposte.
Nota: In una applicazione reale questo non andrebbe assolutamente fatto perché in questo modo
l’utente potrebbe visualizzare all’interno dell’inspector qual è la risposta esatta.
- Al termine delle domande viene creato e visualizzato un pulsante invia per la validazione del test.
- Sempre al termine dell’animazione iniziale viene avviato un timer che provvede a scandire il tempo,
aggiornandolo ad intervalli regolari di 1 secondo. All’interno del DIV relativo al timer occorre creare
in avvio due tag span, uno per i minuti e l’altro per i secondi separati dai due punti. Sia i minuti che
i secondi devono essere visualizzati su due cifre partendo da 00.
A tal si può utilizzare la semplice procedura pad() allegata alla consegna che consente appunto di
visualizzare un number come stringa su due cifre
- In corrispondenza del click sul pulsante invia Il sistema deve :
    - disabilitare il pulsante medesimo in modo che non possa rispondere una seconda volta al click, ricolorarlo di grigio (#cc sullo sfondo, #99 sul primo piano)
    - interrompere il timer
    - calcolare il voto nel modo seguente:
    - +1 punto per ogni risposta esatta
    - -0,25 per ogni risposta sbagliata (ricolorando di rosso la T o la F relative ala risposta
sbagliata)
- 0 per ogni risposta NON data
Il punteggio ottenuto viene visualizzato mediante semplice alert.
- Se l’utente non preme il pulsante INVIA entro 2 minuti, automaticamente il sistema interrompe
l’elaborazione eseguendo tutti i punti precedenti, calcolando e visualizzando il punteggio ottenuto
fino a quel momento.

*Racca Paolo*