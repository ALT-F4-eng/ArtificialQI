from core.comunication_config import ComunicationConfig
from uuid import UUID
from common.exceptions import *
from dataclasses import dataclass
from core.key_value_list import KeyValueList
import validators

@dataclass
class HttpConfig(ComunicationConfig):

    id: UUID
    url: str
    key_req: str
    key_resp: str
    header: KeyValueList
    body: KeyValueList


def http_config_function_factory(id: UUID, url: str, key_req: str, key_resp: str, header: KeyValueList, body: KeyValueList ) -> HttpConfig:
    """
    Crea un'istanza della classe HttpConfig a partire dalle informazioni fornite.

    Preconditions:
 

    Args:
        id (UUID, opzionale): Identificativo univoco. Se non specificato, viene generato automaticamente.
        url (str): url che identifica LLM da utilizzare.
        key_req (str): chiave per le richieste.
        key_resp (str): chiave per le risposte.
        header (KeyValueList): lista di coppie chiave-valore d inserire nell'header.
        body (KeyValueList): lista di coppie chiave-valore d inserire nel body

    Returns:
        HttpConfig: Oggetto che rappresenta una configurazione di un LLM.
    """

    if not (key_req.strip() or key_resp.strip()):
        raise ValueError
    
    if not (validators.url(url)):
        raise ValueError

    return HttpConfig(
        id=id, 
        url=url, 
        key_req=key_req, 
        key_resp=key_resp, 
        header=header, 
        body=body
    )

