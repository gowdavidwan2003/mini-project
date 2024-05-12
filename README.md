# Technologies Used

## Backend
- <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" height="30px"> **Python**: Used for backend development.
- <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="PostgreSQL" height="30px"> **PostgreSQL (pgsql)**: Utilized as the relational database management system.

## Frontend
- <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" height="30px"> **React**: Utilized for frontend development.
- <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="npm" height="30px"> **npm**: Used for managing project dependencies.
- <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Tailwind_CSS_logo.svg" alt="Tailwind CSS" height="30px"> **Tailwind CSS**: Utilized for styling and design of the frontend.

---

# Project Setup Guide

This guide outlines the steps required to set up and run the project locally. Please follow the instructions carefully to ensure smooth installation.

## Prerequisites

Before proceeding with the setup, ensure that you have the following prerequisites installed on your system:

- Node.js and npm (for frontend)
- Python (for backend)
- PostgreSQL (for database)

## Setup Instructions

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/gowdavidwan2003/mini-project.git
    ```

2. **Navigate to the Directory:**
    ```bash
    cd mini-project
    ```

3. **Install npm Dependencies:**
    ```bash
    npm install react-scripts
    ```

4. **Setup Backend Database:**
    - Create a database in your pgsql:
        ```bash
        createdb -U postgres dbname
        ```
    - Navigate to the backend directory:
        ```bash
        cd backend
        ```
    - Navigate to the database directory:
        ```bash
        cd database
        ```
    - Setup the database using the provided SQL file:
        ```bash
        psql -U username -d dbname -h hostname -p port -f database.sql
        ```
5. **Configure Database**
    - Move to backend directory:
        ```bash
        cd ..
        ```
    - "Navigate to your app.py file using your preferred code editor. Once you've located lines 19 to 24, you'll find the database configuration section. Replace the placeholder values with your own database credentials to establish a connection.

6. **Install Backend Dependencies:**
    - Install the required Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```

7. **Run the Backend:**
    ```bash
    python app.py
    ```
    The backend will be running on port 5000.

8. **Run the Frontend:**
    - Open a new terminal window.
    - Navigate to the project directory.
        ```bash
        cd mini-project
        ```
    - Start the frontend:
        ```bash
        npm start
        ```
    The frontend will be running on port 3000.

## Accessing the Application

Once the backend and frontend are running, you can access the application by opening a web browser and navigating to `http://localhost:3000`.

## Troubleshooting

- If you encounter any issues during the setup process, please refer to the project documentation or seek assistance from the project maintainers.
