from uuid import UUID

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from artificialqi.adapter.outbound.sql_alchemy_model.base import Base

class QuestionAnswerSqlAlchemyModel(Base):
    
    __tablename__ = "questionanswer"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    dataset: Mapped[UUID] = mapped_column(ForeignKey("dataset.id"))
    question: Mapped[str]
    answer: Mapped[str]

    dataset_ref: Mapped["DatasetSqlAlchemyModel"] = relationship(back_populates="qas")


    