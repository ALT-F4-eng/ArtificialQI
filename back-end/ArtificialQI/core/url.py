from dataclasses import dataclass
from datetime import date
from uuid import UUID

@dataclass
class Url:
    domain: str
    path: str
    query: str

    
def url_factory_function(domain: str, path: str, query: str) -> Url:

    if not (domain.strip() or path.strip() or query.strip()):
        raise ValueError
    
    if domain and " " in domain:
        raise ValueError("Il dominio non può contenere spazi.")
    
    if path and not path.startswith("/"):
        raise ValueError("Il path deve iniziare con '/'.")

    if query and "=" not in query:
        raise ValueError("La query string deve contenere almeno un '='")

    return Url(
        domain=domain, path=path, query=query
    )
