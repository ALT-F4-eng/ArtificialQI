CREATE TABLE IF NOT EXISTS Llm (
    id uuid PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    url VARCHAR(512) NOT NULL,
    chiave_richiesta VARCHAR(255) NOT NULL,
    chiave_risposta VARCHAR(255) NOT NULL,
    data_registrazione TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS CoppiaChiaveValore (
    id uuid PRIMARY KEY,
    is_header BOOLEAN NOT NULL,
    chiave VARCHAR(255) UNIQUE,
    valore TEXT NOT NULL,
    llm uuid NOT NULL REFERENCES Llm(id)
);

CREATE TABLE IF NOT EXISTS Dataset (
    id uuid PRIMARY KEY,
    is_tmp BOOLEAN NOT NULL,
    nome VARCHAR(255) NOT NULL,
    data_creazione TIMESTAMP NOT NULL,
    data_ultima_modifica TIMESTAMP NOT NULL,
    origin uuid REFERENCES Dataset(id)
);

CREATE TABLE IF NOT EXISTS Test (
    id uuid PRIMARY KEY,
    is_tmp BOOLEAN NOT NULL,
    nome VARCHAR(255),
    data_esecuzione TIMESTAMP NOT NULL,
    llm uuid NOT NULL REFERENCES Llm(id),
    dataset uuid NOT NULL REFERENCES Dataset(id)
);

CREATE TABLE IF NOT EXISTS Elemento (
    id uuid PRIMARY KEY,
    domanda TEXT NOT NULL,
    risposta TEXT NOT NULL,
    dataset uuid REFERENCES Dataset(id)

);

CREATE TABLE IF NOT EXISTS Risultato (
    id SERIAL PRIMARY KEY,
    test uuid NOT NULL REFERENCES Test(id),
    elemento uuid NOT NULL REFERENCES Elemento(id),
    is_corretto BOOLEAN NOT NULL,
    grado_similarita NUMERIC(5,4) NOT NULL,
    risposta_ottenuta TEXT NOT NULL
);