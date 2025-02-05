import csv
from models import Word
from database import database

def load_csv_from_file(file_path):
    try:
        # Clear the existing data in the database
        Word.query.delete()
        database.session.commit()  # Commit the deletion

        # Open CSV file
        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.reader(file)
            inserted_count = 0
            
            for row in reader:
                german_word = row[0].strip().lower()  # Normalize case and strip spaces

                # Only insert if the word is not empty
                if german_word:
                    # Create a new entry in the database
                    new_word = Word(word=german_word)
                    database.session.add(new_word)
                    inserted_count += 1
                else:
                    print(f"Skipping empty row")
            
            # Commit changes to the database
            database.session.commit()

            return {"message": f"CSV data loaded successfully, {inserted_count} words inserted."}, 200
    except Exception as e:
        print(f"Error processing CSV file: {e}")
        return {"error": f"Error processing CSV file: {e}"}, 500
