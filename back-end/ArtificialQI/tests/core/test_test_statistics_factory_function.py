# type: ignore

import pytest
from core.test_statistics import test_statistics_factory_function, TestStatistics

def _test_negative_avg():
    AVG: float = -1

    with pytest.raises(ValueError):
        test_statistics_factory_function(
            similarity_avg=AVG,
            similarity_std_dev=0.5,
            result_distribution = [10, 10, 10, 10, 10],
            correct_percentage=0.5
        )

def _test_greater_than_one_avg():
    AVG: float = 1.01

    with pytest.raises(ValueError):
        test_statistics_factory_function(
            similarity_avg=AVG,
            similarity_std_dev=0.5,
            result_distribution = [10, 10, 10, 10, 10],
            correct_percentage=0.5
        )

def _test_negative_std_dev():
    STD_DEV: float = -1

    with pytest.raises(ValueError):
        test_statistics_factory_function(
            similarity_avg=0.1,
            similarity_std_dev=STD_DEV,
            result_distribution = [10, 10, 10, 10, 10],
            correct_percentage=0.5
        )

def _test_greater_than_half_std_dev():
    STD_DEV: float = 0.505

    with pytest.raises(ValueError):
        test_statistics_factory_function(
            similarity_avg=0.1,
            similarity_std_dev=STD_DEV,
            result_distribution = [10, 10, 10, 10, 10],
            correct_percentage=0.5
        )

def _test_lower_distribution_bins():
    DISTRBUTION: list[int] = [
        10, 10, 10, 10, 10, 10
    ]

    with pytest.raises(ValueError):
        test_statistics_factory_function(
            similarity_avg=0.1,
            similarity_std_dev=0.5,
            result_distribution = DISTRBUTION,
            correct_percentage=0.5
        )

def _test_bigger_distribution_bins():
    DISTRBUTION: list[int] = [
        10, 10, 10
    ]

    with pytest.raises(ValueError):
        test_statistics_factory_function(
            similarity_avg=0.1,
            similarity_std_dev=0.5,
            result_distribution = DISTRBUTION,
            correct_percentage=0.5
        )

def _test_percentage_correct_greater_than_1():
    CORRECT_PERCENTAGE: float = 1.01 

    with pytest.raises(ValueError):
        test_statistics_factory_function(
            similarity_avg=0.1,
            similarity_std_dev=0.5,
            result_distribution = [10, 10, 10, 10, 10],
            correct_percentage=CORRECT_PERCENTAGE
        )

def _test_percentage_correct_lower_than_0():
    CORRECT_PERCENTAGE: float = -0.1 

    with pytest.raises(ValueError):
        test_statistics_factory_function(
            similarity_avg=0.1,
            similarity_std_dev=0.5,
            result_distribution = [10, 10, 10, 10, 10],
            correct_percentage=CORRECT_PERCENTAGE
        )

def _test_valid_index(get_index_test):

    expected_index: TestStatistics = get_index_test
    
    res_index: TestStatistics = test_statistics_factory_function(
        similarity_avg=expected_index.similarity_avg,
        similarity_std_dev=expected_index.similarity_std_dev,
        result_distribution=expected_index.result_distribution,
        correct_percentage=expected_index.correct_percentage
    )

    assert res_index.similarity_avg == expected_index.similarity_avg
    assert res_index.similarity_std_dev == expected_index.similarity_std_dev
    assert res_index.result_distribution == expected_index.result_distribution
    assert res_index.correct_percentage == expected_index.correct_percentage
