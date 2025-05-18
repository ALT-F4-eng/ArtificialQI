from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")


@dataclass
class Page(Generic[T]):
    page_n: int
    content: set[T]


def function_factory_page(page_n: int, page_content: set[T]) -> Page[T]:
    """
    Crea un'istanza della classe Page a partire dal numero della pagina e dal contenuto.

    Args:
        - page_n (int): Numero della pagina. Deve essere >= 0.
        - page_content (set[Generic[T]]): Contenuto della pagina, rappresentato come un insieme di elementi generici.

    Returns:
        Page[T]: Oggetto Page contenente il numero di pagina e il relativo contenuto.

    Raises:
        - ValueError: Se 'page_n' è None o minore di 0, o se 'page_content' è None.
    """
    if page_n is None:
        raise ValueError

    if page_n < 0:
        raise ValueError

    if page_content is None:
        raise ValueError

    return Page(page_n, page_content)
