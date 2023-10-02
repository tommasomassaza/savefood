# SAVEFOOD

## Descrizione

Piattaforma per prenotare e acquistare cibo avanzato dai locali sotto forma di launch box

## Requisiti

- Java 17
- nmp & node js

## Installazione

1. Clona il repository: `git clone https://github.com/tommasomassaza/savefood.git`
2. Vai alla directory del progetto: `cd savefood`
3. Esegui il comando di build: `./build.sh`
4. Esegui il comando per avviare i container docker: `docker compose build && docker compose up`

Frontend
1. Vai alla directory del progetto: `cd savefood`
2. Vai alla directory del frontend: `cd frontend`
3. Esegui il comando: `npm install && npm start`
4. Naviga nel browser su `localhost:3000`

## Utilizzo

Esegui l'accesso tramite Clerk.

### Accesso come Vendor

1. Accedi come Vendor selezionando questa opzione dalla schermata iniziale.
2. Sarai reindirizzato alla pagina dei tuoi locali, dove potrai:
    - **Aggiungere Locale**: Clicca su "Aggiungi Locale" per inserire un nuovo locale.
    - **Modificare Locale**: Clicca su un locale esistente per apportare modifiche.
    - **Eliminare Locale**: Se necessario, puoi eliminare un locale esistente.
3. Clicca su uno dei tuoi locali per accedere alla pagina delle box per quel locale, dove potrai:
    - **Aggiungere Box**: Inserisci nuove box per il tuo locale.
    - **Rimuovere Box**: Elimina le box che non sono più disponibili.
    - **Modificare Box**: Modifica le informazioni delle box esistenti.

### Accesso come Customer

1. Accedi come Customer selezionando questa opzione dalla schermata iniziale.
2. Verrai indirizzato a una pagina che elenca tutte le box disponibili.
3. Per prenotare una box, fai clic su quella desiderata e inserisci la quantità desiderata.
4. L'ordine verrà registrato.
5. Puoi accedere alla pagina "I Miei Ordini" per visualizzare lo stato delle tue prenotazioni.
