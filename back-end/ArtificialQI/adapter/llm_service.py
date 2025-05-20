from port.inbound.llm_use_case import LlmUseCase
from uuid import UUID, uuid4
from typing import Optional
from common.exceptions import *
from typing import IO
from core.page import Page
from core.llm import Llm, llm_factory_function
from core.llm_config import Config
from port.outbound.llm_repository import LlmRepository
from datetime import date


class LlmService(LlmUseCase):
    
    def __init__(self, llm_repo: LlmRepository):
        self.llm_repo:LlmRepository = llm_repo

    
    def create_llm(self, name: str, config:Config, last_mod: date) -> Llm:

        # Creazione di un nuovo llm
        llm : Llm = llm_factory_function(uuid4(), name, config, last_mod)

        # Salvataggio del llm su db
        result: Optional[Llm] = self.llm_repo.create_llm(llm)

        if result is None:
            raise PersistenceException("Errore durante la creazione del llm.")
        
        return result

    
    def get_llm_by_id(self, id:UUID) -> Llm:

        llm: Optional[Llm] = self.llm_repo.get_llm_by_id(id)

        if llm is None:
            raise LlmNonExistentException(f"Non esiste llm con identificativo {id}.")
        
        return llm
    
    def get_all_llm(self) -> list[Llm]:

        # Ottiene gli llm e controlla che l'operazione sia andata a buon fine
        llms: Optional[list[Llm]] = self.llm_repo.get_all_llms()

        if llms is None:
            raise PersistenceException(
                "Errore di persistenza durante l'ottenimento degli llm salvati."
            )

        return llms
    
    def update_llm(self, llm_id: UUID, name: str, config:Config, last_mod: date) -> Llm:

        # Ottiene la llm da aggiornare e controlla che l'operazione sia andata a buon fine
        llm_to_update: Optional[Llm] = self.llm_repo.get_llm_by_id(llm_id)

        if llm_to_update is None:
            raise LlmNonExistentException(f"Non esiste un llm con id {id}.")

        # Costruisce un nuovo llm che rappresenta il llm aggiornato
        updated_llm: Llm = llm_factory_function(llm_to_update.id,name,config,last_mod)

        # Aggiorna il llm e controlla che l'operazione sia andata a buon fine
        res: Optional[Llm] = self.llm_repo.update_llm(updated_llm)

        if res is None:
            raise PersistenceException("Errore di persistenza durante l'aggiornamento del llm.")
        
        return res
    
    def delete_llm(self, id:UUID) -> UUID:
      
        # Controllo che la llm da eliminare esista
        llm: Optional[Llm] = self.llm_repo.get_llm_by_id(id)

        if llm is None:
            raise LlmNonExistentException(f"llm con ID {id} non esiste.")

        # Elimina la llm dal repo
        res_llm_elim: Optional[UUID] = self.llm_repo.delete_llm(id)

        if res_llm_elim is None:
            raise PersistenceException(f"Errore durante l'eliminazione del llm {id}.")

        return res_llm_elim
