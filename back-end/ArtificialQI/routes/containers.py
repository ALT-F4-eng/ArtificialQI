from dependency_injector import containers, providers
from adapter.dataset_service import DatasetService
from port.outbound.dataset_repository import DatasetRepository
from port.outbound.question_answer_pair_repository import QuestionAnswerPairRepository
from port.outbound.test_repository import TestRepository
from port.outbound.test_result_repository import TestResultRepository

class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(packages=["routes"])

    dataset_repo = providers.Singleton(DatasetRepository)
    qa_repo = providers.Singleton(QuestionAnswerPairRepository)
    test_repo = providers.Singleton(TestRepository)
    result_repo = providers.Singleton(TestResultRepository)

    dataset_service = providers.Factory(
        DatasetService,
        dataset_repo=dataset_repo,
        qa_repo=qa_repo,
        test_repo=test_repo,
        result_repo=result_repo,
    )