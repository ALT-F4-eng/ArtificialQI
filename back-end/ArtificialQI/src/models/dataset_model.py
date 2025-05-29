
from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from src.db_config import db

class DatasetModel(db.Model):
    __tablename__ = 'dataset'

    id = Column(Integer, primary_key=True)
    is_tmp = Column(Boolean, nullable=False, default=False)
    nome = Column(String(255), nullable=False)
    data_creazione = Column(DateTime, nullable=False, server_default=func.now())
    data_ultima_modifica = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())