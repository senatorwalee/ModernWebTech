//importing the Student class that will be used to create students objects 
import Student from "../models/StudentClass.js";
//importing courses to be used when creating the erroled and completed courses of a student object
import  {courses}  from "./coursesData.js";

//creating an array of student objects
export const studentData = [
    new Student(
        1, 
        "Alice Johnson", 
        "Computer Science", 
        "Semester 3", 
        ["Data Structures", "Modern Web Technologies"], // Enrolled/ongoing courses (no grades)
        [
            //completed courses here have grades which will be used to calculate the average scores
            { name: "Database Concepts", grade: 75 },
            { name: "Intro to Javascript", grade: 80 }
        ]
    ),
    new Student(
        2, 
        "Olawale Tijani", 
        "Computer Programming", 
        "Semester 3", 
        ["Modern Web Technologies", "React Native",], // Enrolled/ongoing courses (no grades)
        [
            //completed courses here have grades which will be used to calculate the average scores
            { name: "OOP", grade: 95 },
            { name: "Engineering Basics", grade: 78 }
        ]
    )
];

