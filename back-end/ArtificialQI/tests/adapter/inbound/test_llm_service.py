# type: ignore

from unittest.mock import Mock
from uuid import uuid4, UUID
import re

import pytest
from port.outbound.llm_repository import LlmRepository
from port.outbound.test_repository import TestRepository
from port.outbound.test_result_repository import TestResultRepository

@pytest.fixture
def mock_dependencies():

    return {
        "llm_repo": Mock(LlmRepository),
        "test_repo": Mock(TestRepository),
        "result_repo": Mock(TestResultRepository)
    }

@pytest.fixture
def llm_service(mock_dependencies, monkeypatch):
    
    monkeypatch.setattr(DatasetFactory, "saved", 
                        lambda id, dim, name, first_save_date, last_save_date:
                        Dataset(id=id, dim=dim, name=name, first_save_date=first_save_date, last_save_date=last_save_date, tmp=False, origin=None)
                    )
    monkeypatch.setattr(DatasetFactory, "tmp", lambda id, dim:
                        Dataset(id=id, dim=dim, name=None, first_save_date=None, last_save_date=None, tmp=True, origin=None)
                    )
    
    monkeypatch.setattr(DatasetFactory, "working_copy", lambda id, dim, origin:
                        Dataset(id=id, dim=dim, name=None, first_save_date=None, last_save_date=None, tmp=True, origin=origin)
                    )

    return DatasetService(
        mock_dependencies["dataset_repo"],
        mock_dependencies["qa_repo"],
        mock_dependencies["test_repo"],
        mock_dependencies["result_repo"]
    )