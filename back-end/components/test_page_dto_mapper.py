from tools.test_page_dto import TestPageDto
from port.page import Page

class TestPageDtoMapper:
    def to_dto(test_page:Page) -> TestPageDto:
        return TestPageDto(
            page_n=test_page.get_n(),
            result_list=test_page.get_content()
            )
    
    def to_domain(dto:TestPageDto) -> Page:
        return Page(
            n=dto.get_page_n(),
            content=dto.get_result_list()
            ) 