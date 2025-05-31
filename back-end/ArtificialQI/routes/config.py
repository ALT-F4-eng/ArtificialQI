from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import os



def get_session():
    db_url = os.environ["DB_URL"]
    session = Session(create_engine(db_url))
    
    return lambda: session
