from uuid import UUID
from datetime import date

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from adapter.outbound.sql_alchemy_model.key_value_pair import KeyValuePairSqlAlchemyModel

class LlmSqlAlchemyModel(DeclarativeBase):
    
    __tablename__ = "Llm"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    url: Mapped[str]
    key_response: Mapped[str]
    key_request: Mapped[str]
    save_date: Mapped[date]

    config: Mapped[list[KeyValuePairSqlAlchemyModel]] = relationship(KeyValuePairSqlAlchemyModel, back_populates="results")






    