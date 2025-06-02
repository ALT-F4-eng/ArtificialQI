from src.db_config import db
import uuid

class LlmModel(db.Model):
    __tablename__ = 'llm'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    save_date = db.Column(db.DateTime, nullable=False)

    def get_id(self) -> str:
        
        return str(self.id)

    def get_name(self) -> str:
        
        return self.name

    def get_url(self) -> str:
        
        return self.url
    
    def json(self):
        return {
            'id': str(self.id),  # UUID come stringa
            'name': self.name,
            'url': self.url,
            'save_date': self.save_date.isoformat() if self.save_date else None  # Data in ISO 8601 string
        }

