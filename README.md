# Progetto ArtificialQI

Benvenuti nel progetto ArtificialQI!


## Documentazione del Progetto

Per informazioni dettagliate sul progetto, inclusa l’architettura, le scelte progettuali e altro, consulta la nostra documentazione completa:

[**Visualizza la Documentazione del Progetto**](https://alt-f4-eng.github.io/Documentazione/)

## Tecnologie Utilizzate

ArtificialQI è costruito con uno stack tecnologico full-stack moderno e solido:

* **Angular**: Il framework scelto per sviluppare un’interfaccia utente dinamica e responsive.
* **Node.js**: Ambiente di esecuzione JavaScript utilizzato per gestire il runtime del frontend e strumenti di sviluppo.
* **Flask**: Un potente micro-framework Python utilizzato per costruire le API backend.
* **Docker**: Utilizzato per la containerizzazione dell’applicazione, semplificando la gestione e il deployment dell’ambiente.

## Come Iniziare

Per avviare l’intero progetto ArtificialQI sulla tua macchina locale, utilizziamo Docker Compose per una configurazione semplice e veloce. Segui questi passaggi:

1.  **Prerequisiti**:
    * Assicurati di avere installato [Docker](https://www.docker.com/) sul tuo sistema.
      
2.  **Clona il Repository**:
    ```bash
    git clone https://github.com/ALT-F4-eng/ArtificialQI.git
    cd ArtificialQI
    ```

3.  **Costruisci i Container**:
    ```bash
    docker compose build
    ```

4.  **Avvia l’Applicazione**:
    ```bash
    docker compose up
    ```

5.  **Accedi ai Servizi**:
    Quando i container sono avviati, puoi accedere all’applicazione tramite i seguenti URL:
    * **Frontend**: `http://localhost:4200`
    * **Backend**: `http://localhost:5000`
   
