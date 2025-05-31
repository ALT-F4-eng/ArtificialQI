from artificialqi.core.test import Test
from artificialqi.core.dataset import Dataset
from artificialqi.core.llm import Llm
from artificialqi.mapper.test_mapper import TestDtoMapper
from artificialqi.models.test_list_dto import TestListDto


class TestListDtoMapper:

    @staticmethod
    def to_dto(domain: list[tuple[Test, Llm, Dataset]]) -> TestListDto:
        return TestListDto(
            test_list=[
                TestDtoMapper.to_dto(test, llm, dataset)
                for test, llm, dataset in domain
            ]
        )
