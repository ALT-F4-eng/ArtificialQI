from dependency_injector import containers, providers
from adapter.inbound.dataset_service import DatasetService
from routes.config import get_session
from adapter.outbound.sql_alchemy_unit_of_work.dataset_unit_of_work import DatasetUnitOfWork
from adapter.outbound.sql_alchemy_unit_of_work.test_unit_of_work import TestUnitOfWork
from adapter.outbound.sql_alchemy_unit_of_work.test_result_unit_of_work import TestResultUnitOfWork

class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(packages=["routes"])

    dataset_unit_of_work = providers.Singleton(DatasetUnitOfWork, get_session)
    test_unit_of_work = providers.Singleton(TestUnitOfWork, get_session)
    test_result_unit_of_work = providers.Singleton(TestResultUnitOfWork, get_session)

    dataset_service = providers.Factory()