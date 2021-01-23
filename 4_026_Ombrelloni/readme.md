# Es. 4_026_Ombrelloni
## Obiettivo:
Realizzare l'esercizio assegnato seguendo la seguendo consegna.
## Istruzioni:
Si vuole realizzare una applicazione per la prenotazione degli ombrelloni sullo stabilimento Balneare n. 6 di
Lignano Sabbiadoro contenente 666 ombrelloni numerati a 1 a 666 e disposti per file.
Ogni ombrellone potrà essere prenotato nel periodo tra il 1 giugno e il 15 settembre. Il numero massimo di
giorni di prenotazione potrà essere 107 (intera stagione).
I due text di impostazione delle date sono già settati da html all’interno di questo range.
Le file sono complessivamente 9 + 9 = 18, Dopo la 9° file c’è una posizione vuota per il passaggio
Ogni fila contiene 22 + 15 ombrelloni = 37. Dopo il 22° c’è una posizione vuota per il passaggio.
Gli ombrelloni complessivamente sono quindi 37 x 18 = 666
Sulla mappa gli ombrelloni hanno diametro 9px ed una distanza fra i baricentri pari a 16px.
Man mano che si avanza nelle file, le nuove file partono ogni volta 2 pixel più a sinistra.
L’ ombrellone n. 1 (il primo in alto a sinistra) ha posizione X=180, Y=210
### All’avvio
la mappa è nascosta mentre textBox di fine soggiorno e pulsante “scegli ombrellone” sono disabilitati.
Il pulsante “scegli ombrellone” implementa la classe button, mentre la classe buttonEnabled sarà
applicata dinamicamente al momento dell’abilitazione del pulsante.
In corrispondenza della scelta della data di inizio soggiorno viene abilitato il text box relativo alla data di
fine soggiorno impostando anche come valor minimo di selezione la data di inizio soggiorno
In corrispondenza della scelta della data di fine soggiorno viene visualizzato un messaggio contenente il
numero di giorni impostato e viene abilitato il pulsante “scegli ombrellone”
### Base Dati
Come base dati si utilizza il json allegato gestito mediante un json-server in cui, per ogni ombrellone, è
riportato un ID (inutile, in quanto l’ID è sempre +1 rispetto alla posizione del record nel vettore) ed un
vettore di 107 numeri interi ognuno riferito ad uno dei 107 giorni compresi tra il 1/6 ed il 15/9.
Questi numeri indicano le prenotazioni di quel singolo ombrellone in ciascun giorno, dove :
- 0 significa ombrellone libero
- !=0 indica l’ID del cliente che ha prenotato l’ombrellone nel giorno corrispondente. Esempio:
“0 0 0 45 45 45 45 0 72 0 0 0 12 12 12 0 0 0 ……………………………………”
Il 1, 2 , 3 giugno l’ombrellone è libero, dal 4 al 7 giugno è stato prenotato dal cliente, mentre il
cliente 72 ha prenotato l’ombrellone per il solo giorno 9 giugno.
E’ allegata una semplice utility che crea questo json impostando tutti gli ombrelloni come sempre iberi.
### Scegli Ombrellone Click
L’applicazione invia una richiesta Ajax al json-server richiedendo lo stato aggiornato delle prenotazioni di
tutti gli ombrelloni. Ricevuta la risposta, l’applicazione visualizza la mappa e scorre il vettore degli
ombrelloni, visualizzando in verde gli ombrelloni che sono liberi in tutti i giorni scelti dall’utente e
visualizzando in rosso gli ombrelloni già prenotati in uno o più giorni fra quelli scelti dall’utente.
Gli ombrelloni rossi sono insensibili al click.
### Ombrellone verde click
L’ombrellone diventa blu. In corrispondenza di un eventuale successivo click, ritorna verde.
L’utente, nel periodo selezionato, può prenotare anche più ombrelloni.
Ogni ombrellone selezionato viene aggiunto all’interno di un apposito vettore.
### Pulsante Prenota Click
In basso a destra, in corrispondenza della visualizzazione della mappa, viene creato all’interno della mappa
un pulsante “prenota” sotto forma di tag ***a*** che, in corrispondenza del click, salverà l’intera struttura
dati sul file ombrelloni.json . Il pulsante “prenota” implementa le classi button, buttonEnabled e prenota.
In corrispondenza del click scorre il vettore delle prenotazioni e aggiorna la struttura json impostando, nel
vettore di stato degli ombrelloni selezionati, il codice dell’utente attuale relativamente a tutti i giorni
selezionati (impostare provvisoriamente il codice 1). Quindi salva la struttura dati su disco ed esegue il
refresh della pagina per la gestione di una nuova prenotazione.
### Login
Aggiungere all’interno della stessa pagina (single-page) una sezione iniziale di login. All’avvio il precedente
wrapper principale sarà nascosto ed al suo posto comparirà un wrapper di login in cui l’utente dovrà
inserire le proprie credenziali. In corrispondenza del click sul pulsante **INVIA** il client, tramite una chiamata
ajax, richiede al server l’elenco degli utenti registrati. Verifica quindi le credenziali.
- In caso di credenziali non valide visualizza una label di errore e, dopo 1 sec, esegue il refresh della pag
- In caso di credenziali valide nasconde il wrapper di login e visualizza il precedente wrapper principale.

*Racca Paolo*
