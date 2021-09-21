import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import Card from "../Card";


const TeacherHome = () => {
    const history = useHistory()

    const [courses, setCourses] = useState()
    const [students, setStudents] = useState()
    const [quizzes, setQuizzes] = useState()

    const user = JSON.parse(localStorage.getItem('user'))
    const id = { id: user.user_id }

    const courseUrl = "http://localhost:3001/teacherHome/courses"

    useEffect(() => {

        fetch(courseUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
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
            credentials: 'include',
            body: JSON.stringify(id)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setStudents(data)
            })

    }, [studentUrl])

    const quizUrl = "http://localhost:3001/teacherHome/quizzes"

    useEffect(() => {

        fetch(quizUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(id)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setQuizzes(data)
                console.log(data)
            })

    }, [quizUrl])

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="homeContent">

                <div id="adminCard">
                    <Card title="My Courses" description={courses} button="View" onclick={() => history.push("/teacher/courses")}></Card>
                    <Card title="Total Students" description={students && students.length} button="View" onclick={() => history.push("/teacher/myStudents", {state: students})}></Card>
                    <Card title="Upcoming Quizzes" description={quizzes && quizzes.length} button="View" onclick={() => history.push("/teacher/upcomingQuizzes", {state: quizzes})}></Card>
                    {/* <Card title="Pending Payments" description="2" button="View"></Card> */}
                </div>
            </div>

        </div>

    );
}

export default TeacherHome;