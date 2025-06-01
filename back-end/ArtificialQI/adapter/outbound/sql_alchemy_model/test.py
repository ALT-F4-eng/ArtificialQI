from datetime import date
from uuid import UUID
from typing import Optional, List

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from artificialqi.adapter.outbound.sql_alchemy_model.base import Base

class TestSqlAlchemyModel(Base):
    
    __tablename__ = "test"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    dataset: Mapped[UUID] = mapped_column(ForeignKey("dataset.id"))
    llm: Mapped[UUID] = mapped_column(ForeignKey("llm.id"))
    execution_date: Mapped[date]
    name: Mapped[Optional[str]]
    tmp: Mapped[bool]
    results: Mapped[List["TestResultSqlAlchemyModel"]] = relationship(back_populates="test_ref")


    