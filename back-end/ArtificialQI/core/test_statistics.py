from dataclasses import dataclass


@dataclass
class TestStatistics:

    similarity_avg: float
    similarity_std_dev: float
    result_distribution: list[int]
    correct_percentage: float


def test_statistics_factory_function(
    similarity_avg: float,
    similarity_std_dev: float,
    result_distribution: list[int],
    correct_percentage: float,
) -> TestStatistics:
    """
    Crea un'istanza della classe TestStatistics a partire da valori aggregati ottenuti da un test.

    Args:
        similarity_avg (float): Valore medio della similarità tra le risposte attese e quelle ottenute.
        similarity_std_dev (float): Deviazione standard dei valori di similarità.
        result_distribution (list[int]): Lista contenente la distribuzione dei risultati del test (fino a 5 intervalli).
        correct_percentage (float): Percentuale di risposte corrette, espressa come valore compreso tra 0 e 1.

    Returns:
        TestStatistics: Oggetto che rappresenta le statistiche complessive di un test.

    Raises:
        ValueError 
            Se 'similarity_avg' è minore di 0 o maggiore di 1.
            Se  'similarity_std_dev' è minore di 0 o maggiore di 0.5. 
            Se 'result_distribution' non ha un numero di elementi pari al valore DISTRIBUTION BEANS.
            Se 'correct_percentage' non è compreso tra 0 e 1.
    """

    DISTRIBUTION_BINS: int = 5

    if similarity_avg < 0:
        raise ValueError
    
    if similarity_avg > 1:
        raise ValueError

    if similarity_std_dev < 0:
        raise ValueError
    
    if similarity_std_dev > 0.5:
        raise ValueError

    if len(result_distribution) != DISTRIBUTION_BINS:
        raise ValueError

    if correct_percentage > 1 or correct_percentage < 0:
        raise ValueError

    return TestStatistics(
        similarity_avg, similarity_std_dev, result_distribution, correct_percentage
    )
