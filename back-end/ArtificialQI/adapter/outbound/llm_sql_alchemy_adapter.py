from typing import Optional
from uuid import UUID

from artificialqi.core.llm import Llm
from artificialqi.port.outbound.llm_repository import LlmRepository
from artificialqi.adapter.outbound.sql_alchemy_mapper.llm import LlmModelMapper
from artificialqi.adapter.outbound.sql_alchemy_model.llm import LlmSqlAlchemyModel
from sqlalchemy.orm import Session
from sqlalchemy import delete, update, select
