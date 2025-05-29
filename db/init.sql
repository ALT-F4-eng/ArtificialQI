CREATE TABLE CoppiaChiaveValore (
    id SERIAL PRIMARY KEY,
    is_header BOOLEAN NOT NULL DEFAULT FALSE,
    chiave VARCHAR(255) UNIQUE NOT NULL,
    valore TEXT NOT NULL
);

CREATE TABLE LLM (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    url VARCHAR(512) NOT NULL,
    chiave_richiesta VARCHAR(255) NOT NULL,
    chiave_risposta VARCHAR(255) NOT NULL,
    data_registrazione TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chiave_richiesta) REFERENCES CoppiaChiaveValore(chiave),
    FOREIGN KEY (chiave_risposta) REFERENCES CoppiaChiaveValore(chiave)
);

CREATE TABLE ParametroLLM (
    id SERIAL PRIMARY KEY,
    coppia_id INTEGER NOT NULL UNIQUE,
    llm_id INTEGER,
    FOREIGN KEY (coppia_id) REFERENCES CoppiaChiaveValore(id) ON DELETE CASCADE,
    FOREIGN KEY (llm_id) REFERENCES LLM(id) ON DELETE CASCADE
);

CREATE TABLE Test (
    id SERIAL PRIMARY KEY,
    is_tmp BOOLEAN NOT NULL DEFAULT FALSE,
    nome VARCHAR(255) NOT NULL,
    data_esecuzione TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE LLMTestato (
    test_id INTEGER NOT NULL,
    llm_id  INTEGER NOT NULL,
    PRIMARY KEY (test_id, llm_id),
    FOREIGN KEY (test_id) REFERENCES Test(id) ON DELETE CASCADE,
    FOREIGN KEY (llm_id) REFERENCES LLM(id) ON DELETE CASCADE
);

CREATE TABLE Elemento (
    id SERIAL PRIMARY KEY,
    domanda TEXT NOT NULL,
    risposta TEXT,
    is_tmp BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Risultato (
    id SERIAL PRIMARY KEY,
    test_id INTEGER NOT NULL,
    elemento_id INTEGER,
    is_corretto BOOLEAN NOT NULL DEFAULT FALSE,
    grado_similarita NUMERIC(5,4) NOT NULL,
    risposta_ottenuta TEXT NOT NULL,
    FOREIGN KEY (test_id) REFERENCES Test(id) ON DELETE CASCADE,
    FOREIGN KEY (elemento_id) REFERENCES Elemento(id) ON DELETE SET NULL
);

CREATE TABLE Dataset (
    id SERIAL PRIMARY KEY,
    is_tmp BOOLEAN NOT NULL DEFAULT FALSE,
    nome VARCHAR(255) NOT NULL,
    data_creazione TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_ultima_modifica TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE TestSet (
    test_id    INTEGER NOT NULL,
    dataset_id INTEGER NOT NULL,
    PRIMARY KEY (test_id, dataset_id),
    FOREIGN KEY (test_id) REFERENCES Test(id) ON DELETE CASCADE,
    FOREIGN KEY (dataset_id) REFERENCES Dataset(id) ON DELETE CASCADE
);

CREATE TABLE ContenutoDataset (
    dataset_id INTEGER NOT NULL,
    elemento_id INTEGER NOT NULL UNIQUE,
    PRIMARY KEY (dataset_id, elemento_id),
    FOREIGN KEY (dataset_id) REFERENCES Dataset(id) ON DELETE CASCADE,
    FOREIGN KEY (elemento_id) REFERENCES Elemento(id) ON DELETE CASCADE
);

CREATE TABLE ModLoadDatasetSalvato (
    id SERIAL PRIMARY KEY,
    original_dataset_id INTEGER,
    saved_dataset_id    INTEGER,
    FOREIGN KEY (original_dataset_id) REFERENCES Dataset(id) ON DELETE CASCADE,
    FOREIGN KEY (saved_dataset_id) REFERENCES Dataset(id) ON DELETE SET NULL
);