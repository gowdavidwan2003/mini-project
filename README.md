# Quiz Wizards

## Introduction

Welcome to Quiz Wizards, an interactive learning platform designed to engage children in a fun and innovative way. Unlike conventional quiz platforms, Quiz Wizards leverages the power of computer vision technology to provide an immersive learning experience.

## Project Overview

Quiz Wizards aims to revolutionize the way children learn by incorporating real-time interaction using a camera-based system. Instead of traditional multiple-choice options, Quiz Wizards utilizes hand gestures captured by the camera to select answers dynamically.

For example, if your hand is positioned in the first quadrant, the corresponding option assigned to that quadrant will be selected. This unique approach not only makes learning more engaging but also encourages physical activity and cognitive development.

## Key Features

- **Interactive Learning**: Engage with quizzes using hand gestures captured by the camera.
- **Real-time Feedback**: Receive instant feedback based on gesture recognition.
- **Gamified Experience**: Turn learning into an enjoyable game-like experience.
- **Customizable Content**: Create and customize quizzes to suit individual learning needs.
- **Accessible**: Easily accessible from any device with a camera and internet connection.

## How It Works

1. **Set Up Your Camera**: Ensure your device has a camera and is properly positioned.
2. **Select a Quiz**: Choose from a variety of quizzes available on Quiz Wizards.
3. **Start Gesturing**: Use your hand gestures to select answers as prompted by the quiz interface.
4. **Receive Feedback**: Get immediate feedback on your selections and track your progress.

## Get Started

Ready to embark on an exciting learning adventure? Visit Quiz Wizards and start exploring the world of interactive learning today!

---

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

---

# Troubleshooting & FAQ

## Common Issues and Solutions
### 1. Camera Not Detected:

If your camera is not detected, make sure it is properly connected and recognized by your device. You may need to check your device settings or try using a different camera.

### 2. Gesture Recognition Errors: 

If the system is not recognizing your hand gestures accurately, ensure that you are positioned properly in front of the camera and that there is adequate lighting in the room.

## Frequently Asked Questions (FAQ)

### Q: Are the quizzes customizable?

A: Yes, Quiz Wizards allows for the creation and customization of quizzes to suit individual learning needs.

### Q: How accurate is the gesture recognition system?

A: The accuracy of the gesture recognition system may vary depending on factors such as lighting conditions and hand positioning, but efforts have been made to ensure reliable performance.

---

# Maintainers

- Vidwan Gowda H M - [@gowdavidwan2003](https://github.com/gowdavidwan2003)
- Suhas R - [@suhas-0812](https://github.com/suhas-0812)
- Varshith R - [@Varshithckm](https://github.com/Varshithckm)
- Rakesh P - [@Rakesh9742](https://github.com/Rakesh9742)
  
---

# Contributing Guidelines

Thank you for considering contributing to Quiz Wizards! Please review the contributing guidelines before making any contributions.

To contribute, please follow these steps:

1. Review the project's goals and guidelines.
2. Fork the repository to your GitHub account.
3. Make your desired changes or additions in your forked repository.
4. Create a pull request to the main repository, detailing the changes you've made and why they are beneficial.
5. Email gowdavidwan2003@gmail.com regarding collaboration. Contributions without prior permission may not be merged into the main branch.

Thank you for your interest in improving Quiz Wizards!

--- 

# License Information

Quiz Wizards is proprietary software.

This software is not open-source and cannot be freely distributed or modified by others. Usage, copying, modification, distribution, sublicensing, or selling of this software by any entity other than the licence holders is strictly prohibited.

For licensing inquiries or further information, please contact gowdavidwan2003@gmail.com.

--- 
