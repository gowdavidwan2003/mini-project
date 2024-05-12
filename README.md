# Technologies Used

## Backend
- **Python**: Used for backend development.
- **PostgreSQL (pgsql)**: Utilized as the relational database management system.

## Frontend
- **JavaScript**: Utilized for frontend development.
- **npm**: Used for managing project dependencies.
- **Tailwind CSS**: Utilized for styling and design of the frontend.

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
