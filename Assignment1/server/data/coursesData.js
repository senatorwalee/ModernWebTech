//importing the courses class for objects creation
import Course from "../models/CourseClass.js";

//creating an array of Course class objects

export const courses = [
    new Course(1, "Data Structures", "Computer Programming", true),
    new Course(2, "Modern Web Technologies", "Computer Programming", true),
    new Course(3, "Database Management", "Computer Programming", false),
    new Course(4, "React Native", "Computer Programming", false),
    new Course(5, "Web Design", "Computer Programming", false),
    new Course(6, "Python", "Computer Programming", false),
];

