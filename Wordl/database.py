from flask_sqlalchemy import SQLAlchemy

database = SQLAlchemy()

def init_database(app):
    database.init_app(app)
    with app.app_context():
        database.create_all()