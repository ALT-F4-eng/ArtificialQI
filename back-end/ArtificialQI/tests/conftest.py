# type: ignore

from datetime import date
from uuid import uuid4
from unittest.mock import Mock

import pytest
from core.dataset import Dataset
from core.test import Test
from core.test_statistics import TestStatistics
from core.page import Page
from core.question_answer_pair import QuestionAnswerPair
from adapter.qa_service import QaService
from core.llm_config import Config
from core.llm import Llm
from core.test_result import TestResult

@pytest.fixture
def get_empty_saved_dataset() -> Dataset:
    return Dataset(
        id=uuid4(), dim=0, name="prova", 
        first_save_date=date.today(), last_save_date=date.today(), 
        tmp=False, origin=None
    )

@pytest.fixture
def get_non_empty_saved_dataset() -> Dataset:
    return Dataset(
        id=uuid4(), dim=10, name="prova", 
        first_save_date=date.today(), last_save_date=date.today(), 
        tmp=False, origin=None
    )

@pytest.fixture
def get_empty_tmp_dataset() -> Dataset:
    return Dataset(
        id=uuid4(), dim=0, name=None, 
        first_save_date=None, last_save_date=None, 
        tmp=True, origin=None
    )

@pytest.fixture
def get_non_empty_tmp_dataset() -> Dataset:
    return Dataset(
        id=uuid4(), dim=10, name=None, 
        first_save_date=None, last_save_date=None, 
        tmp=True, origin=None
        )

@pytest.fixture
def get_empty_working_copy_dataset() -> Dataset:
    return Dataset(
        id=uuid4(), dim=0, name=None, 
        first_save_date=None, last_save_date=None, 
        tmp=True, origin=uuid4()
    )

@pytest.fixture
def get_non_empty_working_copy_dataset() -> Dataset:
    return Dataset(
        id=uuid4(), dim=10, name=None, 
        first_save_date=None, last_save_date=None, 
        tmp=True, origin=uuid4()
    )


@pytest.fixture
def get_index_test() -> TestStatistics:

    return TestStatistics(
        similarity_avg=0.5,
        similarity_std_dev=0.5,
        result_distribution=[10, 100, 10, 10, 10],
        correct_percentage=0.8
    )

@pytest.fixture
def get_saved_test(get_index_test) -> Test:
    return Test(
        id=uuid4(),
        dataset=uuid4(),
        llm=uuid4(),
        index=get_index_test,
        tmp=False,
        name="prova",
        execution_date=date.today()
    )

@pytest.fixture
def get_tmp_test() -> Test:

    return Test(
        id=uuid4(),
        dataset=uuid4(),
        llm=uuid4(),
        index=get_index_test,
        tmp=True,
        name=None,
        execution_date=date.today()
    )

@pytest.fixture
def get_qa_pair() -> QuestionAnswerPair:

    return QuestionAnswerPair(
        id=uuid4(),
        dataset=uuid4(),
        question="prova?",
        answer="prova"
    )

@pytest.fixture
def get_qa_set() -> set[QuestionAnswerPair]:

    return set(
        [
            QuestionAnswerPair(
            id=uuid4(),
            dataset=uuid4(),
            question="prova?",
            answer="prova"
            ) 
        for i in range(0, QaService.QA_PER_PAGE)
        
        ]
    )

@pytest.fixture
def get_dataset_page(get_qa_set) -> Page[QuestionAnswerPair]:

    return Page[QuestionAnswerPair](
        page_n=1,
        content=get_qa_set 
    )

@pytest.fixture
def get_llm_config() -> Config:

    return Mock()

@pytest.fixture
def get_llm(get_llm_config)->Llm:
    return Llm(
        id=uuid4(),
        name="prova",
        config=get_llm_config,
        last_mod=date.today()
    )

@pytest.fixture
def get_test_result(get_qa_pair)->TestResult:
    return TestResult(
        test_id=uuid4(),
        question_answer_pair=get_qa_pair,
        obtained_answer="prova",
        similarity_score=0.2,
        is_correct=False
    )