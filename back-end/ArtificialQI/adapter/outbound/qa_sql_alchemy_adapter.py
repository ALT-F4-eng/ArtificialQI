from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy import func, literal, update, delete, select, insert
from sqlalchemy.orm import Session

from core.question_answer_pair import QuestionAnswerPair
from port.outbound.qa_repository import QuestionAnswerPairRepository
from adapter.outbound.sql_alchemy_mapper.qa import QuestionAnswerModelMapper
from adapter.outbound.sql_alchemy_model.qa import QuestionAnswerSqlAlchemyModel


class SqlAlchemyQaPairAdapter(QuestionAnswerPairRepository):

    def __init__(self, session: Session):
        self.session = session


    def update_qa(self, qa: QuestionAnswerPair) -> Optional[QuestionAnswerPair]:
        res: Optional[QuestionAnswerPair] = qa

        update_query = update(QuestionAnswerSqlAlchemyModel).where(QuestionAnswerSqlAlchemyModel.id == qa.id).values(
            question=qa.question,
            answer=qa.answer,
            dataset=qa.dataset
        )

        try:
            self.session.execute(update_query).one()
        except Exception:
            res = None
        
        return res


    def create_qa(self, qa: QuestionAnswerPair) -> Optional[QuestionAnswerPair]:
        res: Optional[QuestionAnswerPair] = qa

        new_qa: QuestionAnswerSqlAlchemyModel = QuestionAnswerModelMapper.from_domain(qa)

        try:
            self.session.add(new_qa)
        except Exception:
            res = None
        
        return res


    def delete_qa(self, qa: UUID) -> Optional[UUID]:
        res: Optional[UUID] = qa

        del_query = delete(QuestionAnswerSqlAlchemyModel).where(QuestionAnswerSqlAlchemyModel.id == qa)

        try:
            self.session.execute(del_query).one()
        except Exception:
            res = None

        return res

    def delete_all_from_dataset(self, dataset: UUID) -> Optional[UUID]:
        res: Optional[UUID] = dataset

        del_query = delete(QuestionAnswerSqlAlchemyModel).where(QuestionAnswerSqlAlchemyModel.dataset == dataset)

        try:
            self.session.execute(del_query).all()
        except Exception:
            res = None

        return res

    def copy_all_from_dataset(self, src_dataset: UUID, dst_dataset: UUID) -> bool:

        res: bool = True

        select_query = select(
           QuestionAnswerSqlAlchemyModel.question, QuestionAnswerSqlAlchemyModel.answer,  literal(dst_dataset).label("dataset"), literal(uuid4()).label("id")
        )

        insert_query = insert(QuestionAnswerSqlAlchemyModel).from_select(
            ["id", "dataset", "question", "answer"],
            select_query
        )

        try: 
            self.session.execute(insert_query)
        except Exception:
            res = False

        return res


    def get_qa_set(self, dataset: UUID, start: int, offset: int, q: str = "") -> Optional[set[QuestionAnswerPair]]:
        
        get_query = select(QuestionAnswerSqlAlchemyModel).where(
            (QuestionAnswerSqlAlchemyModel.dataset == dataset) &
            ((func.lower(QuestionAnswerSqlAlchemyModel.question).like(f"%{q.lower()}%")) |
            (func.lower(QuestionAnswerSqlAlchemyModel.answer).like(f"%{q.lower()}%")))
        ).offset(start).limit(offset)

        try:
            q_res = self.session.scalars(get_query).all()
        except Exception:
            return None
        
        res_set: set[QuestionAnswerPair] = {QuestionAnswerModelMapper.to_domain(res) for res in q_res}

        return res_set
    
 
    def get_qa_by_id(self, id: UUID) -> Optional[QuestionAnswerPair]:
        
        get_query = select(QuestionAnswerSqlAlchemyModel).where(
            QuestionAnswerSqlAlchemyModel.id == id
        )

        try:
            q_res = self.session.scalars(get_query).one()
        except Exception:
            return None
        
        return QuestionAnswerModelMapper.to_domain(q_res)
        


