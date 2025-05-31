from uuid import UUID

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from artificialqi.adapter.outbound.sql_alchemy_model.base import Base


class KeyValuePairSqlAlchemyModel(Base):
    
    __tablename__ = "keyvaluepair"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    is_header: Mapped[bool] 
    llm: Mapped[UUID] = mapped_column(ForeignKey("llm.id"))
    key: Mapped[str]
    value: Mapped[str]
    
    llm_ref: Mapped["LlmSqlAlchemyModel"] = relationship(back_populates="config")


    