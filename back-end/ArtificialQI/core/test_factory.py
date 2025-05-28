from uuid import UUID
from datetime import date

from core.test import Test
from core.test_statistics import TestStatistics

class TestFactory:

    @staticmethod
    def tmp(
        id: UUID,
        dataset: UUID,
        llm: UUID,
        index: TestStatistics,
        execution_date: date = date.today(),
    ) -> Test:
        """
        Crea un'istanza temporanea di Test.

        Args:
            - id: Identificatore univoco del test.
            - dataset: Identificatore del dataset utilizzato.
            - llm: Identificatore del modello linguistico utilizzato.
            - index: Statistiche del test.
            - execution_date: Data di esecuzione del test (default: oggi).

        Returns:
            Istanza di Test marcata come temporanea (tmp=True), con nome impostato a None.

        Raises:
            - ValueError: se 'execution_date' è futura.
        """
        
        if execution_date > date.today():
            raise ValueError

        return Test(id, dataset, llm, index, True, None, execution_date)
   
    @staticmethod
    def saved(
        id: UUID,
        dataset: UUID,
        llm: UUID,
        index: TestStatistics,
        name: str,
        execution_date: date = date.today(),
    ) -> Test:
        """
        Crea un'istanza salvata di Test.

        Args:
            - id: Identificatore univoco del test.
            - dataset: Identificatore del dataset utilizzato.
            - llm: Identificatore del modello linguistico utilizzato.
            - index: Statistiche del test.
            - name: Nome del test (non vuoto).
            - execution_date: Data di esecuzione del test (default: oggi).

        Returns:
            Istanza di Test marcata come non temporanea (tmp=False) e con nome assegnato.

        Raises:
            - ValueError: Se name è vuoto o se execution_date è futura.
        """
        
        if execution_date > date.today():
            raise ValueError

        if not name.strip():
            raise ValueError

        return Test(id, dataset, llm, index, False, name, execution_date)
