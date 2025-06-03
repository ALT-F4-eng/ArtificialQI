from dependency_injector import containers, providers, wiring
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from adapter.inbound.dataset_service import DatasetService
from adapter.outbound.sql_alchemy.dataset_adapter import SqlAlchemyDatasetAdapter

class AppContainer(containers.DeclarativeContainer):

    wiring_config = containers.WiringConfiguration(
        modules=["entry_point.dataset_blueprint"]
    )

    config = providers.Configuration()
    
    engine = providers.Singleton(create_engine, config.db_url)
    session_factory = providers.Singleton(sessionmaker, bind=engine)

    sql_alchemy_adapter: SqlAlchemyDatasetAdapter = providers.Factory(SqlAlchemyDatasetAdapter, session_factory)
    dataset_service: DatasetService = providers.Factory(DatasetService, sql_alchemy_adapter)