from uuid import UUID

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from adapter.outbound.sql_alchemy_model.llm import LlmSqlAlchemyModel


class KeyValuePairSqlAlchemyModel(DeclarativeBase):
    
    __tablename__ = "KeyValuePair"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    is_header: Mapped[bool] 
    llm: Mapped[UUID] = mapped_column(ForeignKey("llm.id"))
    key: Mapped[str]
    value: Mapped[str]
    
    llm_ref: Mapped[LlmSqlAlchemyModel] = relationship(LlmSqlAlchemyModel, back_populates="dataset_ref")


    