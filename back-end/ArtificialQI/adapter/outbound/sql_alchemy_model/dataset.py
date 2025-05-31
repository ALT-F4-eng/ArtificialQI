from datetime import date
from uuid import UUID
from typing import Optional, List

from sqlalchemy.orm import Mapped, mapped_column, relationship
from artificialqi.adapter.outbound.sql_alchemy_model.base import Base



class DatasetSqlAlchemyModel(Base):
    
    __tablename__ = "dataset"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    name: Mapped[Optional[str]]
    first_save_date: Mapped[Optional[date]]
    last_save_date: Mapped[Optional[date]]
    tmp: Mapped[bool]
    origin: Mapped[Optional[UUID]]

    qas: Mapped[List["QuestionAnswerSqlAlchemyModel"]] = relationship(back_populates="dataset_ref")
