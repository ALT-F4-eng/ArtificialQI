from tools.dataset_page_dto import DatasetPageDto
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from port.page import Page

class DatasetPageDtoMapper:
    
    def to_dto(p: 'Page') -> DatasetPageDto:
        return DatasetPageDto(
            page_n=p.get_n(),
            qa_set=p.get_content()
        ).to_dict()

    def to_domain(dto: DatasetPageDto) -> 'Page':
        from port.page import Page
        return Page(
            n=dto.get_page_n(),
            content=dto.get_qa_set()
        )