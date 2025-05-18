from port.inbound.qa_use_case import QaUseCase
from port.outbound.dataset_repository import DatasetRepository
from port.outbound.question_answer_pair_repository import QuestionAnswerPairRepository


class QaService(QaUseCase):
    
    def __init__(self, qa_repo:QuestionAnswerPairRepository = QuestionAnswerPairRepository(), dataset_repo:DatasetRepository = DatasetRepository()):
        super().__init__()
        self.qa_repo:QuestionAnswerPairRepository = qa_repo
        self.dataset_repo:DatasetRepository = dataset_repo