# from dependency_injector.wiring import inject, Provide
# from artificialqi.adapter.inbound.qa_service import QaService
# from artificialqi.routes.containers import AppContainer
# from flask import Blueprint, jsonify, request
# from artificialqi.core.question_answer_pair import QuestionAnswerPair
# from artificialqi.core.page import Page
# from uuid import UUID
# from typing import Optional
# from artificialqi.models.qa_dto import QuestionAnswerPairDto
# from artificialqi.models.dataset_page_dto import DatsetPageDto
# from artificialqi.mapper.qa_mapper import QaDtoMapper
# from pydantic import ValidationError


# qa_bp = Blueprint("datasets", __name__)

# @qa_bp.route("/datasets/<id_dataset>/qas", methods=["GET"])
# @inject
# def get_qa_page(id_dataset: str, qa_service: QaService = Provide[AppContainer.qa_service]):
    
    
#     page_n: Optional[str] = request.args.get('p')
#     query: Optional[str] = request.args.get('q')
#     dataset: UUID = UUID(id_dataset)

#     if page_n is None:
#         raise ValueError
    
#     if query is None:
#         query = ""


#     page: Page[QuestionAnswerPair] = qa_service.get_qa_page(
#         int(page_n),
#         dataset,
#         query
#     )
    


#     return page

# @qa_bp.route("/datasets/<id>/qas", methods=["POST"])
# @inject
# def create_dataset(qa_service: QaService = Provide[AppContainer.qa_service]):
    

# @qa_bp.route("/datasets/<id>/qas/<id>", methods=["PUT"])
# @inject
# def update(id: str, qa_service: QaService = Provide[AppContainer.qa_service]):
    

# @qa_bp.route("/datasets/<id>/qas/<id>", methods=["DELETE"])
# @inject
# def delete_dataset(id: str, qa_service: QaService = Provide[AppContainer.qa_service]):
