from qa_use_case import QaUseCase
from adapter.dataset_repository import DatasetRepository
from adapter.question_answer_pair_repository import QuestionAnswerPairRepository


class QaService(QaUseCase):
    
    def __init__(self, qa_repo, dataset_repo):
        super().__init__()
        self.qa_repo:QuestionAnswerPairRepository = qa_repo
        self.dataset_repo:DatasetRepository = dataset_repo