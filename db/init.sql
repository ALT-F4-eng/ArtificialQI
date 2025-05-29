CREATE TABLE IF NOT EXISTS Llm (
    id uuid PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(512) NOT NULL,
    key_response VARCHAR(255) NOT NULL,
    key_request VARCHAR(255) NOT NULL,
    save_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS KeyValuePair (
    id uuid PRIMARY KEY,
    is_header BOOLEAN NOT NULL,
    key VARCHAR(255) UNIQUE,
    value TEXT NOT NULL,
    llm uuid NOT NULL REFERENCES Llm(id)
);

CREATE TABLE IF NOT EXISTS Dataset (
    id uuid PRIMARY KEY,
    tmp BOOLEAN NOT NULL,
    name VARCHAR(255) NOT NULL,
    first_save_date TIMESTAMP,
    last_save_date TIMESTAMP,
    origin uuid REFERENCES Dataset(id)
);

CREATE TABLE IF NOT EXISTS Test (
    id uuid PRIMARY KEY,
    tmp BOOLEAN NOT NULL,
    name VARCHAR(255),
    execution_date TIMESTAMP NOT NULL,
    llm uuid NOT NULL REFERENCES Llm(id),
    dataset uuid NOT NULL REFERENCES Dataset(id)
);

CREATE TABLE IF NOT EXISTS QuestionAnswer (
    id uuid PRIMARY KEY,
    domanda TEXT NOT NULL,
    risposta TEXT NOT NULL,
    dataset uuid REFERENCES Dataset(id)

);

CREATE TABLE IF NOT EXISTS TestResult (
    test uuid REFERENCES Test(id),
    qa uuid REFERENCES QuestionAnswer(id),
    is_correct BOOLEAN NOT NULL,
    similarity_score NUMERIC NOT NULL,
    obtained_answer TEXT NOT NULL,
    PRIMARY KEY(test, qa)
);