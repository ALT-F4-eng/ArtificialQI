from uuid import UUID
from datetime import date

from adapter.outbound.sql_alchemy.model.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid, String, Date

class DatasetSqlAlchemyModel(Base):

    __tablename__="dataset"

    id: Mapped[UUID] = mapped_column(Uuid , primary_key=True)
    name: Mapped[str] = mapped_column(String(250), nullable=False, unique=True)
    creation_date: Mapped[date] = mapped_column(Date, nullable=False)