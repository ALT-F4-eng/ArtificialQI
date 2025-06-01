from artificialqi.models.llm_dto import LlmDto
from artificialqi.core.llm import Llm, llm_factory_function
from artificialqi.mapper.config_mapper import to_domain, to_dto

class LlmMapper:

    @staticmethod
    def to_domain(dto: LlmDto) -> Llm:
        return llm_factory_function(
            id=dto.id,
            name=dto.name,
            last_mod=dto.last_mod,
            config=to_domain(dto.configuration)
    )

    @staticmethod
    def to_dto(llm: Llm) -> LlmDto:
        return LlmDto(
            id=llm.id,
            name=llm.name,
            last_mod=llm.last_mod,
            configuration=to_dto(llm.config)
    )