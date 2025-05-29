from datetime import date
from uuid import UUID
from typing import Optional, List

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from adapter.outbound.sql_alchemy_model.qa import QuestionAnswerSqlAlchemyModel


class DatasetSqlAlchemyModel(DeclarativeBase):
    
    __tablename__ = "Dataset"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    name: Mapped[Optional[str]]
    first_save_date: Mapped[Optional[date]]
    last_save_date: Mapped[Optional[date]]
    tmp: Mapped[bool]
    origin: Mapped[Optional[bool]]

    qas: Mapped[List[QuestionAnswerSqlAlchemyModel]] = relationship(QuestionAnswerSqlAlchemyModel, back_populates="dataset_ref")
