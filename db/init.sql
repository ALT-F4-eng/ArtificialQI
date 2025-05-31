CREATE TABLE IF NOT EXISTS Llm (
    id uuid PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
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
    name VARCHAR(255),
    first_save_date DATE,
    last_save_date DATE,
    origin uuid REFERENCES Dataset(id)
);

CREATE TABLE IF NOT EXISTS Test (
    id uuid PRIMARY KEY,
    tmp BOOLEAN NOT NULL,
    name VARCHAR(255),
    execution_date DATE NOT NULL,
    llm uuid NOT NULL REFERENCES Llm(id),
    dataset uuid NOT NULL REFERENCES Dataset(id)
);

CREATE TABLE IF NOT EXISTS QuestionAnswer (
    id uuid PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
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


insert into dataset (id, name, tmp, first_save_date, last_save_date) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', 'Ed', 'false', current_date, current_date);
insert into Dataset (id, name, tmp, first_save_date, last_save_date) values ('4d3ff15b-6105-4b4a-a350-f6eb40571571', 'Drugi', 'false', current_date, current_date);

insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '229d5ced-8f13-46d2-af00-4c6f16487454', 'Subcontractor', 'Dragline');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '0184cc82-c178-4b14-b4cc-7e26bb972c33', 'Architect', 'Crawler');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '39b36fc9-0e44-4aec-941e-73539da55827', 'Subcontractor', 'Grader');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', 'ccf3bae0-3cae-4464-83c6-7e51b36c3935', 'Construction Expeditor', 'Compactor');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '5a4845b1-a2ce-4a5d-ae76-91ad70286e5b', 'Subcontractor', 'Trencher');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '518ffe35-1cd5-4060-b5f5-65d5f526d043', 'Construction Expeditor', 'Compactor');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '0b789e73-7993-495b-82b5-e7b05cfb2c50', 'Construction Expeditor', 'Crawler');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', 'b388fdc6-b660-4ec1-b574-288432251182', 'Construction Worker', 'Excavator');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', 'b5f9c455-f5c2-4118-b8e0-0b98ce1b05db', 'Engineer', 'Compactor');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', 'f7c5cc32-457b-494f-b439-876713461efd', 'Subcontractor', 'Compactor');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '0c1f4de5-3545-4c3a-94fe-274fbe338fc9', 'Electrician', 'Bulldozer');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '9ddec6eb-39df-4d2e-9b51-e29aaf0ffa5d', 'Construction Manager', 'Bulldozer');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', 'c5a6f14b-c3fe-4edb-8cb7-ccefe78c3984', 'Estimator', 'Excavator');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '5483cd56-de9c-488a-9173-34a03551f0e1', 'Construction Expeditor', 'Excavator');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', 'f3f6c7d9-ad28-4bb2-b516-b33309acf77a', 'Subcontractor', 'Compactor');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '85c408b8-bdf8-42bf-808a-c21580cbfdfa', 'Construction Foreman', 'Compactor');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', 'fdc6f901-f2ab-481d-b6de-8ee28c70c409', 'Architect', 'Excavator');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', 'd71abc14-6c7e-42b7-820e-75aa43499f6b', 'Estimator', 'Excavator');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', '4b4bd3ed-66c8-4c80-bc19-3fe13ea0905c', 'Engineer', 'Grader');
insert into QuestionAnswer (dataset, id, question, answer) values ('691e1afb-ced4-49e0-9805-69e8c6758bbe', 'fa2cee9c-8aba-47bc-b965-80058daf8ee4', 'Project Manager', 'Grader');