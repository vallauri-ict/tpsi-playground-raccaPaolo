# Es. 4_018_DataTable
## Obiettivo: 
Utilizzare per la prima volta e prendere confidenza con il *plug-in* **DataTables** per *JQuery*.
Caricare **dinamicamente** la tabella.

**NB**: Porre attenzione al fatto che ***ajax*** sia **asincrono**, ovvero viene eseguito su un *Thread* separato.
Il metodo *DataTable* deve essere richiamato solo che dopo la sua tabella veniva popolata per evitare che venga generata una riga con il messaggio "No data avaiable in table".
Bisogna quindi richiamare il metodo solo una volta terminata la ricezioni dei dati, alla fine della funzione ***Success***.

*Racca Paolo*