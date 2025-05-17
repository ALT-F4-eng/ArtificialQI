from uuid import UUID
from datetime import date
from dataclasses import dataclass
from core.test_statistics import TestStatistics

@dataclass
class Test:
    id:UUID
    dataset:UUID
    llm:UUID
    index:TestStatistics
    tmp:bool
    execution_date:date

def function_factory_test(id:UUID, dataset:UUID, llm:UUID, index:TestStatistics, tmp:bool, execution_date:date = date.today()) -> Test:
    """
    Crea un'istanza dell'entità Test a partire dai parametri forniti.
    
    Args:
        id (UUID): Identificativo univoco del test.
        dataset (UUID): Identificativo del dataset associato al test.
        llm (UUID): Identificativo del modello linguistico utilizzato.
        index (TestStatistics): Statistiche associate al test.
        tmp (bool): Indica se il test è temporaneo.
        execution_date (date, opzionale): Data di esecuzione del test (default: data corrente).

    Returns:
        Test: Nuova istanza del test creata con i parametri specificati.

    Raises:
        ValueError: Se uno dei parametri obbligatori è None.
    """
    if id is None:
        raise ValueError
    
    if dataset is None:
        raise ValueError
    
    if llm is None:
        raise ValueError
    
    if index is None:
        raise ValueError
    
    if tmp is None:
        raise ValueError
    
    if date is None:
        raise ValueError
    
    return Test(id, dataset, llm, index, tmp, execution_date)
