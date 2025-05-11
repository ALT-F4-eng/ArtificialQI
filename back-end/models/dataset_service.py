from models.dataset_use_case import DatasetUseCase
from adapter.dataset_repository import DatasetRepository
from adapter.question_answer_pair_repository import QuestionAnswerPairRepository
from adapter.test_repository import TestRepository


class DatasetService(DatasetUseCase):

    def __init__(self, dataset_repo:DatasetRepository = DatasetRepository(), qa_repo:QuestionAnswerPairRepository = QuestionAnswerPairRepository(), test_repo:TestRepository = TestRepository()):
        super().__init__()
        self.dataset_repo:DatasetRepository = dataset_repo
        self.qa_repo:QuestionAnswerPairRepository = qa_repo
        self.test_repo:TestRepository = test_repo