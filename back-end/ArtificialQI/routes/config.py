from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import os



def get_session()-> Session:
    db_url = os.environ["DB_URL"]
    return Session(create_engine(db_url))
