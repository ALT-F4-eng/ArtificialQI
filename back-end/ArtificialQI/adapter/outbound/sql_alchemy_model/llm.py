from uuid import UUID
from datetime import date

from sqlalchemy.orm import Mapped, mapped_column, relationship
from artificialqi.adapter.outbound.sql_alchemy_model.base import Base

class LlmSqlAlchemyModel(Base):
    
    __tablename__ = "llm"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    url: Mapped[str]
    key_response: Mapped[str]
    key_request: Mapped[str]
    save_date: Mapped[date]

    config: Mapped[list["KeyValuePairSqlAlchemyModel"]] = relationship(back_populates="llm_ref")






    