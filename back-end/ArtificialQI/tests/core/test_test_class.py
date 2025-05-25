# type: ignore

import unittest
from uuid import UUID, uuid4
from datetime import date

import pytest
from core.test import Test

class _TestClassTestEqualMethod:
    
    def _test_different_tests(self, get_saved_test, get_tmp_test):
        first: Test = get_saved_test
        second: Test = get_tmp_test

        assert first != second

    def _test_equal_tests(self, get_saved_test):
        first: Test = get_saved_test
        second: Test = get_saved_test

        assert first == second

class _TestClassTestTmpMethod:
    
    def _test_tmp_test(self, get_tmp_test):
        tmp_test: Test = get_tmp_test

        assert tmp_test.is_tmp()

    def _test_saved_test(self, get_saved_test):
        saved_test: Test = get_saved_test


        assert not saved_test.is_tmp()
