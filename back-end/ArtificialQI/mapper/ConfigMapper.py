from uuid import uuid4, UUID
from core.http_config import HttpConfig, http_config_function_factory
from models.configuration_dto import ConfigurationDTO



def configdto_to_config(dto: ConfigurationDTO, id: UUID) -> HttpConfig:
    return http_config_function_factory(
        id = id or uuid4(),
        url = dto.url,
        key_req = dto.key_req,
        key_resp = dto.key_resp,
        header = dto.header,
        body = dto.body
    )


def config_to_configdto(config: HttpConfig) -> ConfigurationDTO:
    return ConfigurationDTO(
        ulr=str(config.url),
        key_req=config.key_req,
        key_resp=config.key_resp,
        header=config.header.to_dict(),  
        body=config.body.to_dict()
    )