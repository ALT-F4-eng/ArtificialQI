from models.llm_dto import LlmDTO
from core.llm import Llm, llm_factory_function
from mapper.ConfigMapper import configdto_to_config, config_to_configdto



def dto_to_llm(dto: LlmDTO) -> Llm:
    return llm_factory_function(
        id=dto.id,
        name=dto.name,
        last_mod=dto.last_mod,
        config=configdto_to_config(dto.configuration)
    )

def llm_to_dto(llm: Llm) -> LlmDTO:
    return LlmDTO(
        id=llm.id,
        name=llm.name,
        last_mod=llm.last_mod,
        configuration=config_to_configdto(llm.config)
    )