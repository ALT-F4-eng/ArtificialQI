import ijson
from typing import Iterator, BinaryIO 
from os import path
from artificialqi.common.exceptions import FileError

from artificialqi.port.outbound.file_qa_reader import IQuestionAnswerFileReader

class QuestionAnswerJsonFileReader(IQuestionAnswerFileReader):

    def read_qa_pairs(self, file_stream: BinaryIO) -> Iterator[dict[str, str]]:
        """
        Legge i dati da uno stream di file JSON e restituisce un iteratore di coppie domanda-risposta.

        Args:
            file_stream (BinaryIO): Uno stream di file (es. un oggetto FileStorage di Flask)
                                    aperto in modalità binaria.

        Yields:
            dict[str, str]: Un dizionario con chiavi 'question' e 'answer' (stringhe).

        Raises:
            FileError: Se i dati letti non sono validi o non conformi al formato atteso,
                       o se c'è un errore di parsing JSON.
        """
 
        try:
            for record in ijson.items(file_stream, "item"):
                
                if not isinstance(record, dict) or "question" not in record or "answer" not in record:
                    raise FileError(f"Formato JSON non valido o chiavi 'question'/'answer' mancanti nel record: {record}")
                
                yield {"question": record["question"], "answer": record["answer"]}
        except ijson.common.JSONError as ex:
            raise FileError(f"Errore di parsing nel file {path_str}: {ex}")
        except Exception as e:
            raise FileError(f"Si è verificato un errore inatteso durante il parsing: {ex}")