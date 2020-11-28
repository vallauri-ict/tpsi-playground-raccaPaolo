# Es. 4_019_Login
## Obiettivo:
Data la pagina HTML allegata contenente due Text Box ed un pulsante di submit, utilizzando **SOLO** metodi *jQuery*,  scrivere un programma di autenticazione che, partendo dal seguente vettore precaricato:

var utenti = [ {"user":"pippo",  "pwd":"pwdPippo"},
               {"user":"pluto",  "pwd":"pwdPluto"},
		       {"user":"minnie", "pwd":"pwdMinnie"} ];

esegua le operazioni indicate di seguito :
- In corrispondenza dell’abbandono del campo user (evento change) verifichi che il nome utente non sia vuoto e corrisponda ad uno dei nomi presenti nel vettore.
- In caso di non corrispondenza applicare al TextBox un bordino rosso e visualizzare a fianco con effetto fadeIn un apposito messaggio di errore con colore del testo rosso (Utente non valido).
- In caso di corrispondenza applicare al TextBox un bordino nero e visualizzare a fianco con effetto fadeIn un apposito messaggio di OK con colore verde.
- In caso di passaggio del mouse sui TextBox, il bordo diventa blu e lo sfondo diventa blu chiaro (#CCF);
- In corrispondenza dell’abbandono del campo pwd (evento change) verifichi che la password inserita sia lunga almeno 8 caratteri, contenga almeno 1 carattere letterale ed almeno un carattere numerico e, in caso affermativo, verifiche che sia presente nel vettore delle password e ci sia corrispondenza di posizione con lo username inserito. Gestire Errori e Ok esattamente come nel caso dello User.

**NB**:
Per verificare la presenza di caratteri letterali / numerici si può utilizzare il metodo java script s.charCodeAt(pos) che restituisce il codice ASCII del carattere che si trova nella posizione indicata
Oppure, meglio ancora, si può utilizzare il metodo ***c = s.charAt(pos)*** che restituisce come stringa il carattere corrente.
- Per i caratteri numerici, utilizzare il metodo statico --> $.isNumeric(c) che restituisce true se il carattere è numerico oppure false. 
- Per i caratteri letterali  si può utilizzare la seguente funzione da implementare manualmente--> isLetter(c)   {  if (c.toLowerCase() == c.toUpperCase() ) return false;  else return true;  }

*Racca Paolo*
