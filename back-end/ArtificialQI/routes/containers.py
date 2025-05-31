from dependency_injector import containers, providers

from artificialqi.routes.config import get_session
from artificialqi.adapter.outbound.sql_alchemy_unit_of_work.dataset_unit_of_work import DatasetUnitOfWork
from artificialqi.adapter.outbound.sql_alchemy_unit_of_work.qa_unit_of_work import QaUnitOfWork
from artificialqi.adapter.inbound.dataset_service import DatasetService
from artificialqi.adapter.inbound.qa_service import QaService
from artificialqi.adapter.inbound.test_result_service import TestResultService
from artificialqi.adapter.outbound.sql_alchemy_unit_of_work.test_result_unit_of_work import TestResultUnitOfWork
from artificialqi.adapter.inbound.test_service import TestService
from artificialqi.adapter.outbound.sql_alchemy_unit_of_work.test_unit_of_work import TestUnitOfWork

class AppContainer(containers.DeclarativeContainer):
    session_factory = providers.Singleton(get_session)

    dataset_unit_of_work = providers.Singleton(DatasetUnitOfWork, session_factory=session_factory)
    dataset_service = providers.Factory(DatasetService, dataset_unit_of_work)

    qa_unit_of_work = providers.Singleton(QaUnitOfWork, session_factory=session_factory)
    qa_service = providers.Factory(QaService, qa_unit_of_work)

    test_result_unit_of_work = providers.Singleton(TestResultUnitOfWork, session_factory=session_factory)
    test_reult_service = providers.Factory(TestResultService, test_result_unit_of_work)
    test_unit_of_work = providers.Singleton(TestUnitOfWork, session_factory=session_factory)
    test_service = providers.Factory(TestService, test_unit_of_work)
    


