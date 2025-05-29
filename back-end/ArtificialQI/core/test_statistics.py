from dataclasses import dataclass
from typing import ClassVar


@dataclass
class TestStatistics:
    
    BINS: ClassVar[list[tuple[float,float]]] = [(0.0, 0.2), (0.2, 0.4), (0.4, 0.6), (0.6, 0.8), (0.8, 1.0)]

    similarity_avg: float
    similarity_std_dev: float
    result_distribution: list[int]
    correct_percentage: float


def test_statistics_factory_function(
    similarity_avg: float,
    similarity_std_dev: float,
    result_distribution: list[int],
    correct_percentage: float
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
            Se 'result_distribution' non ha un numero di elementi pari al numero dei bins della distribuzione.
            Se 'correct_percentage' non è compreso tra 0 e 1.
    """

    if similarity_avg < 0 or similarity_avg > 1:
        raise ValueError("La media dei valori di similarità deve essere compresa nel range [0,1].")
    
    if similarity_std_dev > 0.5 or similarity_std_dev < 0:
        raise ValueError("La deviazione standard dei valori di similarità deve essere compresa nel range [0,0.5].")

    if len(result_distribution) != len(TestStatistics.BINS):
        raise ValueError(f"Il numero di bins della distribuzione dei risultati deve essere esattamente {len(TestStatistics.BINS)}")

    if correct_percentage > 1 or correct_percentage < 0:
        raise ValueError("La percentuale delle risposte corrette deve essere compresa nel range di valori [0,1].")

    return TestStatistics(
        similarity_avg, similarity_std_dev, result_distribution, correct_percentage
    )
