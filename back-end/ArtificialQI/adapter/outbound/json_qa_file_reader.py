import ijson
from typing import Iterator
from os import path

from artificialqi.port.outbound.file_qa_reader import IQuestionAnswerFileReader

class QuestionAnswerJsonFileReader(IQuestionAnswerFileReader):

    def read_qa_pairs(self, path_str: str) -> Iterator[dict[str, str]]:
        """
        Legge i dati da un file JSON restituisce un iteratore di coppie domanda-risposta.

        Yields:
            dict[str, str]: Un dizionario con chiavi 'question' e 'answer' (stringhe).

        Raises:
            ValueError: Se i dati letti non sono validi o non conformi al formato atteso.
        """

        if not path.exists(path_str):
            raise FileNotFoundError

        with open(path_str, "r") as f:

            for record in ijson.items(f, "item"):
                
                if not isinstance(record, dict) or "question" not in record or "answer" not in record:
                    raise ValueError(f"Formato JSON non valido o chiavi 'question'/'answer' mancanti nel record: {record}")
                
                yield {"question": record["question"], "answer": record["answer"]}