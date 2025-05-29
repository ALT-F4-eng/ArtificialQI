from abc import ABC, abstractmethod
from collections.abc import Iterator


class IQuestionAnswerFileReader(ABC):


    @abstractmethod
    def read_qa_pairs(self, path_str: str) -> Iterator[dict[str, str]]: 
        pass