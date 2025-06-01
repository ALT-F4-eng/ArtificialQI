from dependency_injector.wiring import inject, Provide
from artificialqi.port.inbound.qa_use_case import QaUseCase
from artificialqi.routes.containers import AppContainer
from flask import Blueprint, request
from artificialqi.core.question_answer_pair import QuestionAnswerPair
from artificialqi.core.page import Page
from uuid import UUID
from typing import Optional
from artificialqi.models.qa_dto import QuestionAnswerPairDto
from artificialqi.mapper.qa_mapper import QaDtoMapper
from flask import jsonify
from pydantic import ValidationError


qa_bp = Blueprint("qas_bp", __name__)

@qa_bp.route("/datasets/<id_dataset>/qas", methods=["GET"])
@inject
def get_qa_page(id_dataset: str, qa_service: QaUseCase = Provide[AppContainer.qa_service]):
    
    
    page_n: Optional[str] = request.args.get('p')
    query: Optional[str] = request.args.get('q')
    dataset: UUID = UUID(id_dataset)

    if page_n is None:
        page_n='0'
    
    if query is None:
        query = ""


    page: Page[QuestionAnswerPair] = qa_service.get_qa_page(
        int(page_n),
        dataset,
        query
    )

    return f"{page}"

@qa_bp.route("/datasets/<id_dataset>/qas", methods=["POST"])
@inject
def create_qa(id_dataset: str, qa_service: QaUseCase = Provide[AppContainer.qa_service]):

    try:
        dto: QuestionAnswerPairDto = QuestionAnswerPairDto.model_validate(request.json)

    except ValidationError as ex:
        raise ex
        
    return f"{qa_service.create_qa(
        dto.question,
        dto.answer,
        dto.dataset
    )}"
    

@qa_bp.route("/datasets/<id_dataset>/qas/<id_qa>", methods=["PUT"])
@inject
def update_qa(id_dataset: str, id_qa: str, qa_service: QaUseCase = Provide[AppContainer.qa_service]):
    
    try:
        dto: QuestionAnswerPairDto = QuestionAnswerPairDto.model_validate(request.json)
    except ValidationError as ex:
        raise ex
    
    return qa_service.update_qa(
        QaDtoMapper.to_domain(dto)
    )


@qa_bp.route("/datasets/<id_dataset>/qas/<id_qa>", methods=["DELETE"])
@inject
def delete_qa(id_dataset: str, id_qa: str, qa_service: QaUseCase = Provide[AppContainer.qa_service]):
    id: UUID = UUID(id_qa)

    qa_service.delete_qa(id)

    return id