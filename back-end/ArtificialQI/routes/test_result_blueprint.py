from dependency_injector.wiring import inject, Provide
from artificialqi.routes.containers import AppContainer
from flask import Blueprint, jsonify, request
from artificialqi.core.test_result import TestResult
from artificialqi.adapter.inbound.test_result_service import TestResultService
from artificialqi.core.page import Page
from artificialqi.mapper.page_mapper import TestPageMapper



test_result_bp = Blueprint("test_result", __name__)

@test_result_bp.route("/tests/<test_id>/results", methods=["GET"])
@inject
def get_test_page(id: str, page: int, test_result_service: TestResultService = Provide[AppContainer.test_reult_service]):

    test_page : Page[TestResult] = test_result_service.get_result_page(id, page)

    if test_page is None:
        return jsonify({"error": "Test not found or no results"}), 404

    return TestPageMapper.to_dto(test_page).model_dump_json(), 200

