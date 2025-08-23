from config import db

class Contact(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80),unique=False, nullable=False)
    email = db.Column(db.String(100),unique=True, nullable=False)
    notes = db.Column(db.String(255), unique=False, nullable=True)
    

    def to_json(self):
        return {'id': self.id,
                'firstName': self.first_name,
                'lastName': self.last_name,
                'email': self.email,
                'notes': self.notes
                }
