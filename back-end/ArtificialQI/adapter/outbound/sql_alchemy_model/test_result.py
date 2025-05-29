from uuid import UUID

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, func, and_, select
from adapter.outbound.sql_alchemy_model.test import TestSqlAlchemyModel 
from adapter.outbound.sql_alchemy_model.qa import QuestionAnswerSqlAlchemyModel
from core.test_statistics import TestStatistics

class TestResultSqlAlchemyModel(DeclarativeBase):
    
    __tablename__ = "TestResult"

    qa: Mapped[UUID] = mapped_column(ForeignKey("question_answer.id"), primary_key=True)
    test: Mapped[UUID] = mapped_column(ForeignKey("test.id"), primary_key=True)
    obtained_answer: Mapped[str]
    similarity_score: Mapped[float]
    is_correct: Mapped[bool]

    qa_ref: Mapped[QuestionAnswerSqlAlchemyModel] = relationship(QuestionAnswerSqlAlchemyModel)
    test_ref: Mapped[TestSqlAlchemyModel] = relationship(TestSqlAlchemyModel, back_populates="results")

    @staticmethod
    def get_test_statistic(test: UUID):

        count_query = []

        for lower, upper in TestStatistics.BINS:
            count_query.append( # type: ignore
               select(func.count(TestResultSqlAlchemyModel.test)).where(
                    and_(
                        TestResultSqlAlchemyModel.test == test,
                        TestResultSqlAlchemyModel.similarity_score >= lower,
                        TestResultSqlAlchemyModel.similarity_score < upper
                    )
                )     
            )
        
        to_array = func.array_agg(count_query)

            