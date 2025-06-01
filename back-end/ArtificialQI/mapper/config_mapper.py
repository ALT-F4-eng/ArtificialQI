from uuid import uuid4, UUID
from artificialqi.core.http_config import HttpConfig, http_config_function_factory
from artificialqi.models.configuration_dto import ConfigurationDto



def to_domain(dto: ConfigurationDto, id: UUID) -> HttpConfig:
    return http_config_function_factory(
        id = id or uuid4(),
        url = dto.url,
        key_req = dto.key_req,
        key_resp = dto.key_resp,
        header = dto.header,
        body = dto.body
    )


def to_dto(config: HttpConfig) -> ConfigurationDto:
    return ConfigurationDto(
        ulr=str(config.url),
        key_req=config.key_req,
        key_resp=config.key_resp,
        header=config.header.to_dict(),  
        body=config.body.to_dict()
    )