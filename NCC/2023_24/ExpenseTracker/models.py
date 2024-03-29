from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

# Initialize the database object
db = SQLAlchemy()


# Define the Expense data model
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
