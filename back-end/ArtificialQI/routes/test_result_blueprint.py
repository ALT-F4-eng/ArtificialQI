from dependency_injector.wiring import inject, Provide
from artificialqi.routes.containers import AppContainer
from flask import Blueprint, jsonify, request
from artificialqi.core.test_result import TestResult
from artificialqi.adapter.inbound.test_result_service import TestResultService
from artificialqi.core.page import Page
from artificialqi.mapper.page_mapper import TestPageMapper
from uuid import UUID
from typing import Optional
from flask import request

test_result_bp = Blueprint("test_result", __name__)

from flask import request

@test_result_bp.route("/tests/<test_id>/results", methods=["GET"])
@inject
def get_test_page(
    test_id: UUID,
    test_result_service: TestResultService = Provide[AppContainer.test_result_service]
):
    # Prendi i parametri dalla query string
    page_n = request.args.get("page_n", default=1, type=int) 
    q = request.args.get("q", default="", type=str)

    test_page: Page[TestResult] = test_result_service.get_result_page(test_id, page_n, q)

    if test_page is None:
        return jsonify({"error": "Test not found or no results"}), 404

    return TestPageMapper.to_dto(test_page).model_dump_json(), 200
