import psycopg2
from psycopg2 import Error

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

connection = connect_to_db()
if connection:
        try:
            cursor = connection.cursor()
            query = """SELECT * from student where student_id = %s;"""
            cursor.execute(query, (1,))
            result = cursor.fetchall()
            print(result)
        except Error as e:
            print("Error executing SQL query:", e)
        finally:
            if connection:
                cursor.close()
                connection.close()
    