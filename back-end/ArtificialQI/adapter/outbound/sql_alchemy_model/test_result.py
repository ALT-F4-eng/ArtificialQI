from uuid import UUID

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, func, and_, select
from artificialqi.core.test_statistics import TestStatistics
from artificialqi.adapter.outbound.sql_alchemy_model.base import Base

class TestResultSqlAlchemyModel(Base):
    
    __tablename__ = "testresult"

    qa: Mapped[UUID] = mapped_column(ForeignKey("questionanswer.id"), primary_key=True)
    test: Mapped[UUID] = mapped_column(ForeignKey("test.id"), primary_key=True)
    obtained_answer: Mapped[str]
    similarity_score: Mapped[float]
    is_correct: Mapped[bool]

    qa_ref: Mapped["QuestionAnswerSqlAlchemyModel"] = relationship()
    test_ref: Mapped["TestSqlAlchemyModel"] = relationship(back_populates="results")



            