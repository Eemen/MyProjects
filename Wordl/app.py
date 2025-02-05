from flask import *
from database import init_database, database
from models import Word
import random

from loadCsv import load_csv_from_file

app = Flask(__name__)
#config of the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///words.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#init the database
init_database(app)


@app.route('/main')
def home():
    return render_template('main.html')

@app.route('/submite', methods=['POST'])
def submit():
    #getting the values form the Inputs
    inputs = []
    inputs.extend(request.form['input1'])
    inputs.extend(request.form['input2'])
    inputs.extend(request.form['input3'])
    inputs.extend(request.form['input4'])
    inputs.extend(request.form['input5'])
    
    return jsonify(inputs)



users = 1
@app.route('/api/users', methods=['GET'])
def getusers():
    return jsonify(users)

#restapi for the random word
@app.route('/api/randomWord', methods=['GET'])
def getRandomWord():
    word = Word.query.order_by(database.func.random()).first()
    
    if word:  # Ensure that the word is not None
        return jsonify({"word": word.word})
    else:
        return jsonify({"error": "No words found in the database"}), 404
    
@app.route('/load_csv', methods=['GET'])
def load_csv_route():
    # Local CSV file path (example: 'data/words.csv')
    csv_file_path = 'Wordl\dump\words.csv'
    # Load the CSV data into the database
    response, status_code = load_csv_from_file(csv_file_path)
    return jsonify(response), status_code

if __name__ == '__main__':
    app.run(debug=True)