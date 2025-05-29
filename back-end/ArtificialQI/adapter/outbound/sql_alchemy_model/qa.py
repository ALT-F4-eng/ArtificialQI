from uuid import UUID

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from adapter.outbound.sql_alchemy_model.dataset import DatasetSqlAlchemyModel


class QuestionAnswerSqlAlchemyModel(DeclarativeBase):
    
    __tablename__ = "QuestionAnswer"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    dataset: Mapped[UUID] = mapped_column(ForeignKey("Dataset.id"))
    question: Mapped[str]
    answer: Mapped[str]

    dataset_ref: Mapped[DatasetSqlAlchemyModel] = relationship(DatasetSqlAlchemyModel, back_populates="results")



    