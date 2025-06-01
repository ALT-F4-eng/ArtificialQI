from abc import ABC, abstractmethod
from collections.abc import Iterator
from typing import BinaryIO 

class IQuestionAnswerFileReader(ABC):

    @abstractmethod
    def read_qa_pairs(self, file_stream: BinaryIO) -> Iterator[dict[str, str]]:
        pass