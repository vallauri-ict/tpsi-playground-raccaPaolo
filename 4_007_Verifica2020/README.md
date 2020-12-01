# Es. 4_007_Verifica2020
## Realizzare un esercizio Js seguendo le seguenti istruzioni:
Si vuole gestire una anagrafica di “ricette” (meals) di tutto il mondo basata sui seguenti files JSON : 
 categoryList.js contenente un elenco di ricette suddivise per categoria. Ogni ricetta contiene i seguenti campi:          "strMeal" – nome della ricetta          "strMealThumb - immagine          "idMeal"  - ID unmerico details.js contenente i dettagli di ogni singola ricetta identificata tramite idMeal presente anche nel file precedente 
 
All’avvio l’applicazione deve eseguire le seguenti operazioni: 
- Caricare i nomi di tutte le categoria all’interno di una sequenza di radio buttons così strutturati: <input type="radio" name="category" value="Breakfast"> <span> Breakfast </span> <br> 
- All’avvio il primo radio button (Breakfast) deve essere selezionato e, all’interno della tabella centrale, devono essere visualizzate tutte le relative ricette contenute in categoryList 
- Per ogni ricetta vengono visualizzati i tre campi di cui sopra: idMeal, strMeal e  strMealThumb (immagine) più una lente per la visualizzazione dei dettagli ed un pulsante delete per la cancellazione del record corrente. Le tre immagini hanno rispettivamente larghezza 55, 30, 30 
 
 
1. In corrispondenza della selezione di un radio button, la tabella centrale deve visualizzare le ricette relative alla categoria selezionata 
2. In corrispondenza del click sulla lente occorre visualizzare nel riquadro di destra i dettagli della ricetta, cioè il nome (strMeal in neretto) e le strInstructions reperibili all’interno del file details tramite l’utilizzo dell’ID 
3. In corrispondenza del click sul pulsante delete eliminare il record corrente dalla struttura di memoria. Dopo la cancellazione riaggiornare la tabella centrale Nota: Al prossimo riavvio i dati saranno di nuovo letti da file e quindi di nuovo presenti in tabella.
4. In corrispondenza del click sull’immagine aprire il filmato youtube relativo alla ricetta (contenuto all’interno dei details, campo strYoutube) 
5. Facoltativo (1 punto) : Visualizzare i record della tabella centrale a blocchi di 7 e gestire la barra di navigazione inferiore. Il pulsante nextPage carica i prossimi 7 record (dal 7° al 13°), prevPage carica la pagina precedente. first carica la prima pagina, last l’ultima. Tenere presente che l’ultima pagina probabilmente conterrà meno di 7 record. I numeri centrali indicano il n. pagina corrente / totale pagine 
