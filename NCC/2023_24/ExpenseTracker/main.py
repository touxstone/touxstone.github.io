from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
app.config['SECRET_KEY'] = 'exe-290324'
db = SQLAlchemy(app)


class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, nullable=False)


@app.route('/')
def index():
    expenses = Expense.query.all()
    return render_template('index.html', expenses=expenses,
                           add_expense_url=url_for('add_expense'))


@app.route('/add_expense', methods=['GET', 'POST'])
def add_expense():
    if request.method == 'GET':
        # Display the form
        return render_template('add_expense.html')
    else:
        # Handle the form submission
        amount = request.form.get('amount')
        category = request.form.get('category')
        date_string = request.form.get('date')
        date_object = datetime.strptime(date_string, '%Y-%m-%d').date()
        new_expense = Expense(amount=amount, category=category,
                              date=date_object)
        db.session.add(new_expense)
        db.session.commit()
        flash('Expense added successfully!')
        return redirect(url_for('index'))


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
