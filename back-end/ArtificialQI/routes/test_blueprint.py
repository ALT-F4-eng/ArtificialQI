from dependency_injector.wiring import inject, Provide
from artificialqi.adapter.inbound.test_service import TestService
from artificialqi.adapter.inbound.llm_service import LlmService
from artificialqi.adapter.inbound.dataset_service import DatasetService
from artificialqi.routes.containers import AppContainer
from flask import Blueprint, jsonify, request
from artificialqi.core.test import Test
from artificialqi.core.llm import Llm
from artificialqi.core.dataset import Dataset
from uuid import UUID
from typing import Optional
from artificialqi.models.test_dto import TestDto
from artificialqi.mapper.test_mapper import TestDtoMapper
from artificialqi.mapper.test_list_mapper import TestListDtoMapper
from pydantic import ValidationError

test_bp = Blueprint("tests", __name__)

@test_bp.route("/tests/<id>", methods=["PUT"])
@inject
def update_test(id: str, test_service: TestService = Provide[AppContainer.test_service],
                #llm_service: LlmService = Provide[AppContainer.llm_service],
                dataset_service: DatasetService = Provide[AppContainer.dataset_service]
                ):
    try:
        dto: TestDto = TestDto.model_validate(request.json)
    except ValidationError as ex:
        return jsonify({"error": ex.errors()}), 400

    if str(dto.id) != id:
        return jsonify({"error": "ID nel body e nel path non corrispondono"}), 401

    updated_test: Test = test_service.update_test(dto.id, dto.name)

    # Recupera gli oggetti Llm e Dataset
    #llm = llm_service.get_by_id(updated_test.llm)  # supponendo che updated_test.llm sia un UUID
    dataset = dataset_service.get_by_id(updated_test.dataset)  # supponendo che updated_test.dataset sia un UUID

    return jsonify(TestDtoMapper.to_dto(updated_test, # llm, 
                                        dataset).model_dump())


@test_bp.route("/tests/<id>", methods=["DELETE"])
@inject
def delete_test(id: str, test_service: TestService = Provide[AppContainer.test_service]):
    to_del: UUID = UUID(id)
    test_service.delete_test(to_del)
    return jsonify({"id": str(to_del), "status": "deleted"})

@test_bp.route("/tests", methods=["GET"])
@inject
def get_all_tests(
    test_service: TestService = Provide[AppContainer.test_service],
    llm_service: LlmService = Provide[AppContainer.llm_service],
    dataset_service: DatasetService = Provide[AppContainer.dataset_service]
):
    query: Optional[str] = request.args.get("q", "")

    results_tests: list[Test] = test_service.get_all_tests(query)

    results : list[tuple[Test, Llm, Dataset]] = [
        (
            test,
            llm_service.get_by_id(test.llm),
            dataset_service.get_by_id(test.dataset)
        )
        for test in results_tests
    ]

    return jsonify(TestListDtoMapper.to_dto(results).model_dump())


@test_bp.route("/tests/<id>", methods=["GET"])
@inject
def get_test_by_id(
    id: str,
    test_service: TestService = Provide[AppContainer.test_service],
    #llm_service = Provide[AppContainer.llm_service],         
    dataset_service = Provide[AppContainer.dataset_service]
):
    test_id: UUID = UUID(id)
    test: Optional[Test] = test_service.get_test_by_id(test_id)
    if test is None:
        return jsonify({"error": "Test non trovato"}), 404

    #llm = llm_service.get_by_id(test.llm)
    dataset = dataset_service.get_by_id(test.dataset)

    return jsonify(TestDtoMapper.to_dto(test, #,llm, 
                                        dataset).model_dump())

@test_bp.route("/tests", methods=["POST"])
@inject
def run_test(
    test_service: TestService = Provide[AppContainer.test_service],
    dataset_service: DatasetService = Provide[AppContainer.dataset_service],
    # llm_service: LlmService = Provide[AppContainer.llm_service]  # se ti serve anche l'oggetto LLM
):
    try:
        dto: TestDto = TestDto.model_validate(request.json)
    except ValidationError as ex:
        return jsonify({"error": ex.errors()}), 400

    try:
        # Eseguiamo il test con dataset e llm indicati nel dto
        test: Test = test_service.run_test(dto.dataset, dto.llm)
    except ValueError as e:
        # Questo blocco gestisce eventuali errori del tipo "QA incompleti"
        # from artificialqi.models.qa_incomplete_list_dto import QaIncompleteListDto
        # if isinstance(e.args[0], QaIncompleteListDto):
        #     return jsonify(e.args[0].model_dump()), 422
        # return jsonify({"error": str(e)}), 400
        # except Exception as e:
        #     return jsonify({"error": "Errore interno"}), 500
        return jsonify({"error": ex.errors()}), 405

    # Recuperiamo il dataset per costruire il DTO
    dataset = dataset_service.get_by_id(test.dataset)

    return jsonify(TestDtoMapper.to_dto(test, dataset).model_dump()), 201
