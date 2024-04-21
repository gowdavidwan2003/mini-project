# Import the request module
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2 import Error

app = Flask(__name__)
CORS(app)

# Connect to PostgreSQL database
def connect_to_db():
    try:
        connection = psycopg2.connect(
            user="postgres",
            password="Vidwan",
            host="localhost",
            port="5432",
            database="mini-project"
        )
        return connection
    except Error as e:
        print("Error connecting to PostgreSQL database:", e)
        return None

# Endpoint to fetch subjects associated with the class of the student
@app.route('/api/subjects', methods=['GET'])
def get_subjects():
    student_id = request.args.get('student_id')
    if not student_id:
        return jsonify({"error": "Student ID is required"}), 400

    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to fetch subjects based on student ID
            query = """
                SELECT subject_id, subject_name
                FROM subject
                JOIN class ON subject.class_id = class.class_id
                JOIN student ON student.class_id = class.class_id
                WHERE student.student_id = %s;
            """
            cursor.execute(query, (student_id,))
            subjects = [{"subject_id": row[0], "subject_name": row[1]} for row in cursor.fetchall()]
            return jsonify(subjects)
        except Error as e:
            print("Error executing SQL query:", e)
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify([])

@app.route('/api/student/<int:id>', methods=['GET'])
def get_student(id):
    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            query = """SELECT * FROM student WHERE student_id = %s;"""
            cursor.execute(query, (id,))
            result = cursor.fetchone()  # Fetch only one row
        except Error as e:
            print("Error executing SQL query:", e)
        finally:
            if connection:
                cursor.close()
                connection.close()
    if result is None:
        return jsonify({"error": "Student not found"}), 404
    else:
        # Convert the result into a dictionary for better JSON serialization
        student = {
            "student_id": result[0],
            "full_name": result[1],
            "dob": result[2]
        }
        return jsonify(student)
    


@app.route('/api/questions', methods=['GET'])
def get_questions():
    subject_id = request.args.get('subject_id')
    level = request.args.get('level')
    if not subject_id:
        return jsonify({"error": "Subject ID is required"}), 400

    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to fetch questions based on subject ID
            query = """
                SELECT question_id, question, option_a, option_b, option_c, option_d, correct_option
                FROM questions
                WHERE subject_id = %s AND level = %s
                LIMIT 10;  -- Fetching only 10 questions
            """
            cursor.execute(query, (subject_id, level))
            questions = [{
                "question_id": row[0],
                "question": row[1],
                "options": [row[2], row[3], row[4], row[5]],
                "correct_option": row[6]
            } for row in cursor.fetchall()]
            return jsonify(questions)
        except Error as e:
            print("Error executing SQL query:", e)
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify([]), 404  # Return 404 if no questions found for the subject





if __name__ == '__main__':
    app.run(debug=True)
