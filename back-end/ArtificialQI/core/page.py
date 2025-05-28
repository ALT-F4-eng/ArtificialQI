from dataclasses import dataclass
from typing import ClassVar
from typing import Generic, TypeVar

T = TypeVar("T")


@dataclass
class Page(Generic[T]):

    ELEMENT_PER_PAGE: ClassVar[int] = 25

    page_n: int
    content: set[T]


def page_factory_function(page_n: int, page_content: set[T]) -> Page[T]:
    """
    Crea un'istanza della classe Page a partire dal numero della pagina e dal contenuto.

    Args:
        page_n (int): Numero della pagina. Deve essere >= 0.
        page_content (set[Generic[T]]): Contenuto della pagina, rappresentato come un insieme di elementi generici.

    Returns:
        Page[T]: Oggetto Page contenente il numero di pagina e il relativo contenuto.

    Raises:
        ValueError: Se 'page_n' è minore di 0.
    """

    if page_n < 0:
        raise ValueError

    return Page(page_n, page_content)
