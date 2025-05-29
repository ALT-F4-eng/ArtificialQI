from datetime import date
from uuid import UUID
from typing import Optional, List

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from adapter.outbound.sql_alchemy_model.test_result import TestResultSqlAlchemyModel

class TestSqlAlchemyModel(DeclarativeBase):
    
    __tablename__ = "Test"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    dataset: Mapped[UUID] = mapped_column(ForeignKey("dataset.id"))
    llm: Mapped[UUID] = mapped_column(ForeignKey("llm.id"))
    execution_date: Mapped[date]
    name: Mapped[Optional[str]]
    tmp: Mapped[bool]
    
    results: Mapped[List[TestResultSqlAlchemyModel]] = relationship(TestResultSqlAlchemyModel, back_populates="dataset_ref")


    