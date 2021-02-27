# Es. 4_027_Chart
## Obiettivo:
Realizzare un esercizio introduttivo alla libreria ***chartjs.org***.
## La libreria
Questa libreria JavaScript, responsive, open-source, molto flessibile, permette di creare rapidamente grafici efficaci, alimentando il motore di rendering con dati e opzioni in formato JSON.
- Come parametro un **canvas** HTML5 (area di disegno) su cui tracciare il grafico. 
- Per il suo utilizzo si può utilizzare il seguente CDN --> https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js
Utilizza diverse variabili: 
- keys
- values, che rappresenta i dati su cui è tracciato il grafico
- color
- borderColors
I principali grafici supportati sono:
- doughnut -->  ciambella  
- pie -->  torta 
- bar -->  diagramma a barre verticali
- radar -->  diagramma a ragnatela
Sono disponibili anche grafici 3D, che si aspettano come values un vettore enumrativo di JSON costituiti da tre campi: 
{  
    x: number,   // coordinata X  
    y: number,   // coordinata Y    
    r: number    // Bubble radius in pixels.
}
## Istruzioni:
Scrivere una applicazione che:
- Richieda a randomuser.me un elenco di 100 persone
- Visualizzi sotto forma di tabella (creata dinamicamente) il numero di persone appartenenti a ciascuna nazionalità
- Riporti la stessa informazione sotto forma di grafico
- Aggiunga dinamicamente in coda un pulsante che consenta di salvare l’immagine su disco.

*Racca Paolo*
