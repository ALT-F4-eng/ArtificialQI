from dataclasses import dataclass
from datetime import date
from uuid import UUID
from core.comunication_config import ComunicationConfig

@dataclass
class Llm:
    id: UUID
    name: str
    config: ComunicationConfig
    last_mod: date

def llm_factory_function(id: UUID, name:str, config:ComunicationConfig, last_mod: date) -> Llm:
    """
    Crea un'istanza della classe Llm a partire dalle informazioni ricevute.

    Args:
        id (UUID): Id del llm da creare.
        name (str): Nome dell'llm.
        config (Config): Configurazione per l'interazione con llm.
        last_mod (date): Data dell'ultima modifica.

    Returns:
        Llm: Istanza della classe Llm.

    Raises:
        ValueError: 
            Se 'name' è vuoto o composto da soli spazi.
            Se 'last_mod' è una data futura.
    """

    if not name.strip():
        raise ValueError("Il nome di un llm non può essere vuoto o composto da soli spazi.")

    if last_mod > date.today():
        raise ValueError("La data di ultima modifica non può essere futura.")

    return Llm(
        id=id, name=name, config=config, last_mod=last_mod
    )