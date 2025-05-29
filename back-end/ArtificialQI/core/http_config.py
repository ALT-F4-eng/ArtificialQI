from core.comunication_config import ComunicationConfig
from uuid import UUID
from dataclasses import dataclass
from core.http_key_value_pair import HttpKeyValuePair 
import regex as re 

@dataclass
class HttpConfig(ComunicationConfig):

    id: UUID
    url: str
    key_req: str
    key_resp: str
    header: set[HttpKeyValuePair]
    body: set[HttpKeyValuePair]

def http_config_function_factory(id: UUID, url: str, key_req: str, key_resp: str, header: set[HttpKeyValuePair], body: set[HttpKeyValuePair] ) -> HttpConfig:

    regex = re.compile(
        r'^https?://' 
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|' 
        r'localhost|'  
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
        r'(?::\d+)?'
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    
    if regex.search(url) is None:
        raise ValueError(f"{url} è in un formato invalido.")
    
    if not key_req:
        raise ValueError("La chiave della richiesta non può essere vuota.")
    
    if not key_resp:
        raise ValueError("La chiave della risposta non può essere vuota.")

    return HttpConfig(
        id=id, 
        url=url, 
        key_req=key_req, 
        key_resp=key_resp, 
        header=header, 
        body=body
    )

