from datetime import date
from uuid import UUID, uuid4
import unittest

import pytest
from core.test import Test

@pytest.mark.usefixtures("test_pairs")
class _TestClassTestEqualMethod(unittest.TestCase):
    
    def test_different_tests(self):
        FIRST, SECOND = self.neq_test_pair

        res: bool = FIRST == SECOND

        self.assertFalse(res)

    def test_equal_tests(self):
        FIRST, SECOND = self.eq_test_pair

        res: bool = FIRST == SECOND

        self.assertTrue(res)
