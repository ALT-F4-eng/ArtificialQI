# type: ignore

from unittest.mock import Mock
from uuid import uuid4, UUID
import re

import pytest
from adapter.inbound.llm_service import LlmService
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
def llm_service(mock_dependencies):
    
    return LlmService(
        mock_dependencies["dataset_repo"],
        mock_dependencies["qa_repo"],
        mock_dependencies["test_repo"],
        mock_dependencies["result_repo"]
    )