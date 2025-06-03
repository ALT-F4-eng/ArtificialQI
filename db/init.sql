CREATE TABLE IF NOT EXISTS dataset (
    id uuid PRIMARY KEY,
    name VARCHAR(250) NOT NULL UNIQUE,
    creation_date DATE NOT NULL
);

INSERT INTO dataset (id, name, creation_date)
VALUES
    (GEN_RANDOM_UUID(), 'ClimateData_2023', '2023-01-15'),
    (GEN_RANDOM_UUID(), 'FinancialTransactions_Q1_2024', '2024-03-20'),
    (GEN_RANDOM_UUID(), 'MedicalImages_PatientX', '2023-11-01'),
    (GEN_RANDOM_UUID(), 'SystemLogs_ServerA_Daily', '2024-05-10'),
    (GEN_RANDOM_UUID(), 'IoTSensorData_Factory1', '2024-02-28');