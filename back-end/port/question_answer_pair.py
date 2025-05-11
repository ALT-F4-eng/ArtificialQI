from flask import request, jsonify
from flask.views import MethodView
from uuid import UUID
from tools.handle_exceptions import handle_exceptions
from models.qa_use_case import QaUseCase
from components.question_answer_pair_dto_mapper import QuestionAnswerPairDtoMapper
from models.qa_service import QaService



class QuestionAnswerPair(MethodView):
    def __init__(self, id:UUID = UUID(int=0), dataset:UUID = UUID(int=0), question:str = '', answer:str = ''):
        self.id:UUID = id
        self.dataset:UUID = dataset
        self.question:str = question
        self.answer:str = answer
    
    def get_id(self) -> UUID:
        return self.id

    def get_dataset(self) -> UUID:
        return self.dataset

    def get_question(self) -> str:
        return self.question

    def get_answer(self) -> str:
        return self.answer
    
    @handle_exceptions
    def create_qa(self, dataset_id:int):
        QaDto = request.form['QaDTO']
        qaService:QaUseCase = QaService()
        qaPair:QuestionAnswerPair = qaService.create_qa(QaDto['question'], QaDto['answer'])
        return jsonify(QuestionAnswerPairDtoMapper.to_dto(qaPair)), 200
    
    @handle_exceptions
    def update_qa(self, dataset_id:int, qa_id:int):
        QaDto = request.form['QaDTO']
        qaService:QaUseCase = QaService()
        qaPair:QuestionAnswerPair = qaService.update_qa(QuestionAnswerPairDtoMapper().to_domain(QaDto))
        return jsonify(QuestionAnswerPairDtoMapper.to_dto(qaPair)), 200
    
    @handle_exceptions
    def delete_qa(self, dataset_id:int, qa_id:int):
        qaService:QaUseCase = QaService()
        id:UUID = qaService.delete_qa(dataset_id)
        return jsonify({'id':id}), 200