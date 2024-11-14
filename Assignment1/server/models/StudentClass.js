//creating a student class with necessary attribute according to requirement
class Student {
    constructor(id, name, department, semester, coursesEnrolled = [], completedCourses = []) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.semester = semester;
        this.coursesEnrolled = coursesEnrolled;
        this.completedCourses = completedCourses;
    }
    //function to calculate average scores
    averageScore(){
        if(!this.completedCourses || this.completedCourses.length===0){
            return 0;
        }
        const total = this.completedCourses.reduce((sum,courses)=>sum+courses.grade,0)
        return total/this.completedCourses.length

    }
        
}
export default Student
    


