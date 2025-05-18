from dataclasses import dataclass
from datetime import date
from uuid import UUID

from core.test_statistics import TestStatistics


@dataclass
class Test:

    id: UUID
    dataset: UUID
    llm: UUID
    index: TestStatistics
    tmp: bool
    name: str
    execution_date: date

    def __eq__(self, test: "Test") -> bool:
        return self.id == test.id

    def __ne__(self, test: "Test") -> bool:
        return self.id != test.id

    def is_tmp(self) -> bool:
        return self.tmp


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
            - ValueError: Se uno dei parametri obbligatori è None o se execution_date è futura.
        """

        if id is None:
            raise ValueError

        if dataset is None:
            raise ValueError

        if llm is None:
            raise ValueError

        if index is None:
            raise ValueError

        if execution_date is None:
            raise ValueError
        
        if execution_date > date.today:
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
            - ValueError: Se uno dei parametri è None, se name è vuoto o se execution_date è futura.
        """

        if id is None:
            raise ValueError

        if dataset is None:
            raise ValueError

        if llm is None:
            raise ValueError

        if index is None:
            raise ValueError

        if execution_date is None:
            raise ValueError
        
        if execution_date > date.today:
            raise ValueError

        if name is None or not name.strip():
            raise ValueError

        return Test(id, dataset, llm, index, False, name, execution_date)
