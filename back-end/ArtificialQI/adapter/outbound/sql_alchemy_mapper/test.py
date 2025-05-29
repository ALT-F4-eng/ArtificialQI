# type: ignore

from adapter.outbound.sql_alchemy_model.test import TestSqlAlchemyModel 
from core.test_factory import TestFactory
from sqlalchemy.engine import RowMapping
from core.test_statistics import test_statistics_factory_function, TestStatistics
from core.test import Test

class TestModelMapper:

    @staticmethod
    def to_domain(model: TestSqlAlchemyModel, tindex: RowMapping) -> Test:
        index: TestStatistics = test_statistics_factory_function(
                similarity_avg=tindex["similarity_avg"],
                similarity_std_dev=tindex["similarity_std_dev"],
                result_distribution=tindex["result_distribution"],
                correct_percentage=tindex["correct_percentage"]
            )
        
        if model.tmp:

            res: Test = TestFactory.tmp(
                id=model.id,
                dataset=model.dataset,
                llm=model.llm,
                index=index,
                execution_date=model.execution_date
            )
        else:

            res: Test = TestFactory.saved(
                id=model.id,
                dataset=model.dataset,
                llm=model.llm,
                index=index,
                execution_date=model.execution_date,
                name=model.name
            )

        return res


    @staticmethod
    def from_domain(domain: Test) -> TestSqlAlchemyModel:
        return TestSqlAlchemyModel(
            id=domain.id,
            dataset=domain.dataset,
            llm=domain.llm,
            execution_date=domain.execution_date,
            name=domain.name,
            tmp=domain.tmp
        )