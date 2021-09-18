import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Card from "../Card";


const TeacherHome = () => {

    const [courses, setCourses] = useState()
    const [students, setStudents] = useState()

    const user = JSON.parse(localStorage.getItem('user'))
    const id = { id: user.user_id }

    const courseUrl = "http://localhost:3001/teacherHome/courses"

    useEffect(() => {

        fetch(courseUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCourses(data)
            })

    }, [courseUrl])

    const studentUrl = "http://localhost:3001/teacherHome/students"

    useEffect(() => {

        fetch(studentUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setStudents(data)
            })

    }, [studentUrl])

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="homeContent">
                
                <div  id="adminCard">
                    {/* <Link to="/teacher/courses"> */}
                        <Card title="My Courses" description={courses} button="View"></Card>
                        {/* </Link> */}
                    <Card title="Total Students" description={students} button="View"></Card>
                    <Card title="Upcoming Quizzes" description="10" button="View"></Card>
                    <Card title="Pending Payments" description="2" button="View"></Card>
                </div>
            </div>

        </div>

    );
}

export default TeacherHome;