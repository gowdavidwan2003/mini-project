# Import the request module
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2 import Error
from statistics import mean, median
import cv2
import mediapipe as mp
import time
import matplotlib.pyplot as plt
import io
import base64
import numpy as np
import seaborn as sns



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
                WHERE subject_id = %s AND level = %s ORDER BY RANDOM()
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




@app.route('/api/add_student', methods=['POST'])
def add_student():
    data = request.json
    full_name = data.get('full_name')
    dob = data.get('dob')
    class_id = data.get('class_id')
    student_id = data.get('student_id')

    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to insert a new student into the database
            query = """
                INSERT INTO student
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (student_id,full_name, dob, class_id))
            connection.commit()
            return jsonify({"student_id": student_id})
        except Error as e:
            print("Error executing SQL query:", e)
            return jsonify({"error": "Failed to add student"}), 500
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify({"error": "Failed to connect to database"}), 500

# Endpoint to delete a student
@app.route('/api/delete_student/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to delete a student from the database
            query = """
                DELETE FROM student WHERE student_id = %s
            """
            cursor.execute(query, (student_id,))
            connection.commit()
            return 'Student deleted successfully'
        except Error as e:
            print("Error executing SQL query:", e)
            return jsonify({"error": "Failed to delete student"}), 500
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify({"error": "Failed to connect to database"}), 500


# Endpoint to add a new question
@app.route('/api/add_question', methods=['POST'])
def add_question():
    data = request.json
    question = data.get('question')
    option_a = data.get('option_a')
    option_b = data.get('option_b')
    option_c = data.get('option_c')
    option_d = data.get('option_d')
    correct_option = data.get('correct_answer')
    level = data.get('level')
    subject_id = data.get('subject_id')

    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to insert a new question into the database
            query = """
                INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_option, level, subject_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (question, option_a, option_b, option_c, option_d, correct_option, level, subject_id))
            connection.commit()
            return 'Question added successfully'
        except Error as e:
            print("Error executing SQL query:", e)
            return jsonify({"error": "Failed to add question"}), 500
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify({"error": "Failed to connect to database"}), 500

# Endpoint to delete a question
@app.route('/api/delete_question/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to delete a question from the database
            query = """
                DELETE FROM questions WHERE question_id = %s
            """
            cursor.execute(query, (question_id,))
            connection.commit()
            return 'Question deleted successfully'
        except Error as e:
            print("Error executing SQL query:", e)
            return jsonify({"error": "Failed to delete question"}), 500
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify({"error": "Failed to connect to database"}), 500

@app.route('/api/add_score', methods=['POST'])
def add_score():
    data = request.json
    student_id = data.get('student_id')
    subject_id = data.get('subject_id')
    score = data.get('score')
    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to insert a new question into the database
            query = """
                insert into test(student_id,subject_id,score) values(%s, %s, %s)
            """
            cursor.execute(query, (student_id,subject_id,score))
            connection.commit()
            return 'Score added successfully'
        except Error as e:
            print("Error executing SQL query:", e)
            return jsonify({"error": "Failed to add score"}), 500
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify({"error": "Failed to connect to database"}), 500


@app.route('/api/student_report/<student_id>', methods=['GET'])
def get_student_report(student_id):
    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to insert a new question into the database
            query = """
                select * from test t1 join subject s on t1.subject_id=s.subject_id where student_id = %s
            """
            cursor.execute(query, (student_id,))
            connection.commit()
            report = [{
                "student_id": row[0],
                "subject_id": row[6],
                "score": row[2],
                "date": row[3],
                "test_id": row[4]
            } for row in cursor.fetchall()]

            
            return jsonify(report)
        except Error as e:
            print("Error executing SQL query:", e)
            return jsonify({"error": "Failed to get student report"}), 500
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify({"error": "Failed to connect to database"}), 500



@app.route('/api/subject_report/<subject_id>', methods=['GET'])
def get_subject_report(subject_id):
    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to retrieve test scores for the given subject
            query = """
                SELECT * FROM test WHERE subject_id = %s
            """
            cursor.execute(query, (subject_id,))
            scores = [row[2] for row in cursor.fetchall()]
            sid = [row[0] for row in cursor.fetchall()]
            if scores:
                max_score = max(scores)
                min_score = min(scores)
                avg_score = mean(scores)
                median_score = median(scores)
                num_students = len(scores)
                subject_report = {
                    "subject_id": subject_id,
                    "max_score": max_score,
                    "min_score": min_score,
                    "avg_score": avg_score,
                    "median_score": median_score,
                    "num_students": num_students,
                    "sid_count" :sid
                }
                
                return jsonify(subject_report)
            else:
                return jsonify({"error": "No test scores available for this subject"}), 404
        except Error as e:
            print("Error executing SQL query:", e)
            return jsonify({"error": "Failed to get subject report"}), 500
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify({"error": "Failed to connect to database"}), 500


# Camera option
@app.route('/api/select_option', methods=['POST'])
def select_option():
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.5)
    mp_drawing = mp.solutions.drawing_utils
    cap = cv2.VideoCapture(0)
    cv2.namedWindow("Frame", cv2.WINDOW_NORMAL)
    cv2.setWindowProperty("Frame", cv2.WND_PROP_TOPMOST, 1)

    # Get the screen resolution
    screen_width = 1500 
    screen_height = 768

    # Calculate the position for the window
    window_width = 640  # Width of the frame window
    window_height = 480  # Height of the frame window
    x_pos = int(screen_width - window_width )  # 50 pixels padding from the right edge
    y_pos = int(screen_height - window_height )  # 50 pixels padding from the bottom edge

    # Set the window position
    cv2.moveWindow("Frame", x_pos, y_pos)
    
    last_quadrant = None
    start_time = None

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            continue
        
        

        frame = cv2.flip(frame, 1)
        height, width, _ = frame.shape
        cv2.line(frame, (width//2, 0), (width//2, height), (255, 0, 0), 2)
        cv2.line(frame, (0, height//2), (width, height//2), (255, 0, 0), 2)
        cv2.putText(frame, "A", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, "B", (width//2 + 50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, "C", (50, height//2 + 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, "D", (width//2 + 50, height//2 + 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)

        results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                cx, cy = int(hand_landmarks.landmark[0].x * width), int(hand_landmarks.landmark[0].y * height)

                quadrant = 0 if cx < width//2 and cy < height//2 else 1 if cx > width//2 and cy < height//2 else 2 if cx < width//2 and cy > height//2 else 3

                if quadrant == last_quadrant:
                    if time.time() - start_time > 3:
                        selected_ans = quadrant
                        start_time = time.time()
                        cap.release()
                        cv2.destroyAllWindows()
                else:
                    last_quadrant = quadrant
                    start_time = time.time()

        cv2.imshow('Frame', frame)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
    print('option_index', quadrant)
    return jsonify({'option_index': quadrant})


@app.route('/api/add_class', methods=['POST'])
def add_class():
    data = request.json
    class_id = data.get('class_id')
    class_name = data.get('class_name')

    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to insert a new class into the database
            query = """
                INSERT INTO class
                VALUES (%s, %s)
            """
            cursor.execute(query, (class_id, class_name))
            connection.commit()
            return jsonify({"class_id": class_id})
        except Error as e:
            print("Error executing SQL query:", e)
            return jsonify({"error": "Failed to add class"}), 500
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify({"error": "Failed to connect to database"}), 500


@app.route('/api/add_subject', methods=['POST'])
def add_subject():
    data = request.json
    subject_id = data.get('subject_id')
    subject_name = data.get('subject_name')
    class_id = data.get('class_id')

    connection = connect_to_db()
    if connection:
        try:
            cursor = connection.cursor()
            # Query to insert a new subject into the database
            query = """
                INSERT INTO subject
                VALUES (%s, %s, %s)
            """
            cursor.execute(query, (subject_id, subject_name, class_id))
            connection.commit()
            return jsonify({"subject_id": subject_id})
        except Error as e:
            print("Error executing SQL query:", e)
            return jsonify({"error": "Failed to add subject"}), 500
        finally:
            if connection:
                cursor.close()
                connection.close()
    return jsonify({"error": "Failed to connect to database"}), 500



@app.route('/api/colorshape', methods=['POST'])
def colorshape():
    data = request.json
    color1 = data.get('selectedcolor')
    shape = data.get('selectedshape')
    

    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.5)  # Changed max_num_hands to 2

    mp_drawing = mp.solutions.drawing_utils

    # Create a white background.
    background = np.ones((720, 1280, 3), dtype=np.uint8) * 255

    shapes = {
    'Rectangle': [(300, 200), (1000, 500)],
    'Triangle': [(600, 200), (300, 500), (900, 500)],
    'Circle': [(650, 350), 150]
    }

    colors = {
    'green': (0, 255, 0),
    'blue': (255, 0, 0),
    'orange':(0, 165, 255),
    'yellow': (0, 255, 255),
    'pink':(203, 192, 255),
    'purple':(128, 0, 128),
    'red': (0, 0, 255)
    }

    color = colors[color1]

    mask = np.zeros((720, 1280), dtype=np.uint8)
    if shape == 'rectangle':
        cv2.rectangle(background, shapes['Rectangle'][0], shapes['Rectangle'][1], (0,0,0), 2)
        cv2.rectangle(mask, shapes['Rectangle'][0], shapes['Rectangle'][1], 255, -1)
    elif shape == 'triangle':
        cv2.polylines(background, [np.array(shapes['Triangle'])], isClosed=True, color=(0,0,0), thickness=2)
        cv2.fillPoly(mask, [np.array(shapes['Triangle'])], 255)
    elif shape == 'circle':
        cv2.circle(background, shapes['Circle'][0], shapes['Circle'][1], (0,0,0), 2)
        cv2.circle(mask, shapes['Circle'][0], shapes['Circle'][1], 255, -1)

    # Create an exit button.
    cv2.rectangle(background, (1080, 620), (1230, 670), (0, 0, 255), -1)  # Moved to bottom right and made larger
    cv2.putText(background, 'EXIT', (1105, 655), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

    # Start capturing video from the webcam.
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

    exit_time = None

    # Create a window in OpenCV and make it stay on top.
    cv2.namedWindow('Interactive Coloring Book', cv2.WINDOW_NORMAL)
    cv2.setWindowProperty('Interactive Coloring Book', cv2.WND_PROP_TOPMOST, 1)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Flip the image horizontally for a selfie-view display.
        frame = cv2.flip(frame, 1)

        # Convert the BGR image to RGB.
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process the frame and get hand landmarks.
        results = hands.process(rgb_frame)

        # Create a temporary copy of the background.
        temp_background = background.copy()

        # Add instruction to the frame.
        cv2.putText(temp_background, f'Color the {shape}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2, cv2.LINE_AA)

        # Draw the hand landmarks on the frame.
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                # Get the coordinates of the wrist.
                x = int(hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x * frame.shape[1])
                y = int(hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].y * frame.shape[0])

                # Draw a circle at the wrist on the temporary background.
                cv2.circle(temp_background, (x, y), 10, colors[color], -1)

                # If the wrist is inside the shape, draw on the mask.
                if 0 <= x < mask.shape[1] and 0 <= y < mask.shape[0]:  # Check if (x, y) is within the dimensions of the mask
                    if mask[y, x] == 255:
                        cv2.circle(background, (x, y), 20, colors[color], -1)  # Increased radius to 20

                # If the wrist is inside the exit button, start the timer.
                if 1080 < x < 1230 and 620 < y < 670:  # Updated coordinates for the larger exit button
                    if exit_time is None:
                        exit_time = time.time()
                    elif time.time() - exit_time > 2:
                        cap.release()
                        cv2.destroyAllWindows()
                        break
                else:
                    exit_time = None

        # Display the temporary background.
        cv2.imshow('Interactive Coloring Book', temp_background)

        # Break the loop if 'q' is pressed.
        if cv2.waitKey(5) & 0xFF == ord('q'):
            break

        return None

    # Release the webcam and close the windows.
    cap.release()
    cv2.destroyAllWindows()




if __name__ == '__main__':
    app.run(debug=True)
