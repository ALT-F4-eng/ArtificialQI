from typing import Set
from artificialqi.core.test_result import TestResult
from artificialqi.core.page import Page, page_factory_function
from artificialqi.models.test_page_dto import TestPageDto
from artificialqi.mapper.test_result_mapper import TestResultMapper

class TestPageMapper:

    @staticmethod
    def to_dto(domain: Page[TestResult]) -> TestPageDto:
        return TestPageDto(
            page_n=domain.page_n,
            result_list=[TestResultMapper.to_dto(r) for r in domain.content]
        )

    @staticmethod
    def to_domain(dto: TestPageDto) -> Page[TestResult]:
        content: Set[TestResult] = set(
            TestResultMapper.to_domain(r) for r in dto.result_list
        )
        return page_factory_function(dto.page_n, content)