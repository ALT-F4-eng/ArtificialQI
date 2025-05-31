# # type: ignore
# from uuid import uuid4
# from datetime import date, timedelta

# import pytest
# from core.llm import  llm_factory_function, Llm

# def _test_empty_name(get_llm_config):
#     NAME: str = ""

#     with pytest.raises(ValueError):
#         llm_factory_function(
#             id=uuid4(),
#             name=NAME,
#             config=get_llm_config,
#             last_mod=date.today()
#         )

# def _test_future_last_mod_date(get_llm_config):
#     LAST_MOD: date = date.today() + timedelta(days=1)

#     with pytest.raises(ValueError):
#         llm_factory_function(
#             id=uuid4(),
#             name="prova",
#             config=get_llm_config,
#             last_mod=LAST_MOD
#         )

# def _test_only_spaces_name(get_llm_config):
#     NAME: str = "   "

#     with pytest.raises(ValueError):
#         llm_factory_function(
#             id=uuid4(),
#             name=NAME,
#             config=get_llm_config,
#             last_mod=date.today()
#         )

# def _test_valid_llm(get_llm):
#     expected_llm: Llm = get_llm

#     res_llm: Llm = llm_factory_function(
#         id=expected_llm.id,
#         name=expected_llm.name,
#         config=expected_llm.config,
#         last_mod=expected_llm.last_mod
#     )

#     assert expected_llm.id == res_llm.id
#     assert expected_llm.name == res_llm.name
#     assert expected_llm.config == res_llm.config
#     assert expected_llm.last_mod == res_llm.last_mod

