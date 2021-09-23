import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"
import { useHistory } from "react-router"

const MyCourses = () => {

    const history = useHistory()

    const [data, setData] = useState([])
    const [del, setDel] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    const id = { id: user.user_id }

    const url = "https://etutor-backend.herokuapp.com/studentAllCourses"

    useEffect(() => {

        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(id)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data)
                // console.log(data)
                // localStorage.setItem('courseData', JSON.stringify(data))
            })

    }, [url])
    const getCourse = (id) => {
        fetch("https://etutor-backend.herokuapp.com/studentCourseDetails/" + id, {
            credentials: 'include',
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                localStorage.setItem('courseInfo', JSON.stringify(data[0]))
                history.push("/studentHome/myCourses/" + id)
            })
    }

    const handleDelete = (cid, uid, cname) => {
        if (window.confirm("Are you sure you want to unroll this " + cname + " course!\n If you confirmed all meterials will be deleted ")) {
            const id = { unenrolledcid: cid, id: uid }
            const url1 = "https://etutor-backend.herokuapp.com/deleteenrolledcourse";

            fetch(url1, {
                method: 'POST',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(id)
            })
                .then((res => {
                    return res.json()
                }))
                .then((data => {

                    if (data.status === "ok") {
                        setDel(data)
                        alert("Course deleted Successfully!")
                        history.push("/studentHome/viewStuCourses")

                    }
                    else {
                        alert("Sorry the task couldn't be completed");
                        history.push("/studentHome/myCourses")

                    }

                }))

        }

    }

    const noAccess = () => {
        if (window.confirm("Your access to this course has been revoked as you have overdue payments")) {
            console.log("redirect")
        }
    }


    return (
        <div>

            <Sidebar />
            <div className="homeContent">
                <div className="courses">



                    {data.map(course => (
                        <div className="course-card-container" >
                            <div className="course-card-container">
                                <div key={course.course_id} className="course-card" >

                                    <div className="card-container" onClick={(course.access === 0) ? noAccess : () => getCourse(course.course_id)}>
                                        <div className="card-info" >

                                            <h1>{course.course_name} {course.year}</h1>
                                            <h2>Conducted by: {course.fname} {course.lname}</h2>
                                            <p>{course.description}</p>

                                        </div>

                                        <img className="course_icon" src={course.image} alt="physics_icon" />
                                    </div>

                                    <div>
                                        <button className="btn btn-danger add-btn" style={{ margin: "0" }} onClick={() => handleDelete(course.course_id, user.user_id, course.course_name)}>Unenroll</button>
                                    </div>

                                </div>

                            </div>
                        </div>

                    ))}

                    {data.length === 0 && <h1>You have not enrolled to any course...</h1>}
                </div>
            </div>
        </div>);

}

export default MyCourses;