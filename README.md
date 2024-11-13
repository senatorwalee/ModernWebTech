Student Course Management App

This application is a full-stack project for managing student course data. It includes an Express backend API and a React frontend interface. The purpose is to demonstrate CRUD operations with student and course data using a modern web application stack.

Table of Contents

Project Structure

Features

Installation

Usage

API Endpoints

Frontend Components

Technologies Used

Screenshots

student-course-app/

├── backend/ # Express backend

│ ├── app.js # Main Express application setup

│ ├── routes/ # Routes for handling requests

│ │ ├── students.js # Routes for student operations

│ │ └── courses.js # Routes for course operations

│ ├── controllers/ # Controllers for request handling logic

│ │ ├── studentController.js # Logic for handling student requests

│ │ └── courseController.js # Logic for handling course requests

│ ├── models/ # Models representing data entities

│ │ ├── Student.js # Student model (class)

│ │ └── Course.js # Course model (class)

│ └── data/ # In-memory data storage (for testing)

│ ├── studentData.js # In-memory data storage for students

│ └── courseData.js # In-memory data storage for courses

├── client/ # React frontend (created with Create React App)

│ ├── public/

│ │ └── index.html # Main HTML file

│ ├── src/

│ │ ├── components/ # React components

│ │ │ ├── StudentList.js # Component to display list of students

│ │ │ ├── CourseList.js # Component to display list of courses

│ │ │ ├── AddStudent.js # Component for adding new students

│ │ │ └── AddCourse.js # Component for adding new courses

│ │ ├── App.js # Main React app component

│ │ ├── index.js # Entry point for React application

│ │ └── api.js # Axios setup to call Express backend

└── package.json # Root-level package.json for managing dependencies

Installation

Clone the Repository:

git clone https://github.com/yourusername/student-course-app.git

cd student-course-app

Install Backend Dependencies:

cd server

npm install

npm i express

Install Frontend Dependencies:

cd ../client

npm install

npm install react-bootstrap bootstrap

npm i axios

Usage

Start the Backend Server:

cd server

nodemon/node app.js

Start the Frontend Server:

cd ../client

npm start

Access the Application: Open your browser and go to http://localhost:3000 to view the frontend interface.

API Endpoints

Student Routes

GET /students: Retrieve all students.

POST /students: Add a new student.

PUT /students/: Update student data by ID.

DELETE /students/: Delete student by ID.

Course Routes

GET /courses: Retrieve all courses.

POST /courses: Add a new course.

PUT /courses/: Update course data by ID.

DELETE /courses/: Delete course by ID.

Frontend Components

StudentList: Displays the list of students.

CourseList: Displays the list of courses.

AddStudent: Form to add a new student.

AddCourse: Form to add a new course.

api: contains all the logic for the endpoints

App: Main app component that links all other components.

Technologies Used

Backend: Node.js, Express

Frontend: React, Axios, Bootstrap

Data Storage: In-memory data for testing (could be swapped for a database in production)
