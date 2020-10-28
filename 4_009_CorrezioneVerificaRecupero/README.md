# Es. 4_009_CorrezioneVerificaRecupero
## Realizzare un esercizio Js seguendo le seguenti istruzioni:
Si vuole creare una applicazione web per la vendita online di orologi basata sul file orologi.js allegato.
Esercizio 1
In corrispondenza del click sul pulsante “SALVA” l’applicazione provvede a salvare in local storage il
contenuto della variabile swatches in modo da renderla fruibile dall’esercizio successivo
Esercizio 2
La pagina principale, all’avvio, legge l’elenco degli orologi dal local storage e li visualizza all’interno di una
Tabella HTML avente larghezza 1020 pixel, bordo 2px e centrata orizzontalmente nella pagina (tutto da
impostare mediante java script).
La tabella deve contenere le seguenti 5 colonne : Gender, Code, Price, Color, Image.
A fondo pagina è presente un pulsante INSERISCI che apre una seconda pagina HTML per l’inserimento di
un nuovo orologio. Questa pagina è da completare soprattutto per quanto concerne i radio buttons
La pagina all’avvio legge i dati da local storage.
Il campo color viene inserito mediante una ListBox precaricata contenente i seguenti valori: Red, Blue,
Black, Burgundy (inseribili come valori statici direttamente nell’HTML oppure (facoltativo)
andando a leggerli nel file orologi.js)
Il campo image viene costruito automaticamente sulla base del campo color, come per gli orologi già
esistenti.
Il pulsante SALVA provvede a:
- aggiungere nella tabella swatches il nuovo orologio appena inserito (aggiungendolo all’interno del
relativo genere), senza controllare se il codice sia già esistente o meno
- salvare la tabella swatches all’interno del local storage
- ritornare alla pagina principale che provvederà a visualizzare l’elenco aggiornato
Il pulsante ANNULLA ricarica semplicemente la pagina iniziale.