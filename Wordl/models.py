from database import database 

class Word(database.Model):
    id = database.Column(database.Integer, primary_key = True)
    word = database.Column(database.String(5), nullable = False)
    
    def __repr__(self):
        return f"<Word {self.word}>"