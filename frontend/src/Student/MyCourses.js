import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"
import { useHistory } from "react-router"

const MyCourses = () => {

    const history = useHistory()

    const [data, setData] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    const id = { id: user.user_id }

    const url = "http://localhost:3001/studentCourses"

    useEffect(() => {

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
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
        fetch("http://localhost:3001/studentCourseDetails/" + id)
            .then(res => {
                return res.json();
            })
            .then(data => {
                localStorage.setItem('courseInfo', JSON.stringify(data[0]))
                history.push("/studentHome/myCourses/" + id)
            })
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
                        <div className="course-card-container" onClick={(course.access === 0) ? noAccess : () => getCourse(course.course_id)}>
                          <div className="course-card-container">
                            <div key={course.course_id} className="course-card" >

                                <div className="card-container">
                                <div className="card-info">

                                    <h1>{course.course_name} {course.year}</h1>
                                    <p>{course.description}</p>
                                    </div>
                                    <img className="course_icon" src={course.image} alt="physics_icon" />
                                </div>
                                

                            </div>
                            
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>);

}

export default MyCourses;