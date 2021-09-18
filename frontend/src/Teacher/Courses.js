import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"
import PhysicsIcon from '../Resources/physics_icon.jpg'
import { useHistory } from "react-router"

const Courses = () => {
    const history = useHistory()

    const [data, setData] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    const id = { id: user.user_id }

    const [course, setCourse] = useState({})

    const url = "http://localhost:3001/teacherCourses"

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
            })

    }, [url])

    const getCourse = (id) => {
        fetch("http://localhost:3001/teacherCourses/" + id)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCourse(data)
                localStorage.setItem('courseInfo', JSON.stringify(data[0]))
                history.push("/teacher/courses/" + id)
            })
    }


    return (
        <div>

            <Sidebar />
            <div className="homeContent">
                <div className="courses">
                    {data.map((course,i) => (
                        //<Link to={`/teacher/courses/${course.course_id}`} className="course-card-container" key={i}>
                            <div key={course.course_id} className="course-card" onClick={() => getCourse(course.course_id)}>

                                <div className="card-container">
                                    <div className="card-info">
                                        <h1>{course.course_name} {course.year}</h1>
                                        <p>{course.description}</p>
                                        <h3>RS. {course.price}</h3>
                                    </div>

                                    {/* <img className="course_icon" src={PhysicsIcon} alt="physics_icon" /> */}
                                </div>

                            </div>
                        //</Link>

                    ))}
                </div>
            </div>
        </div>);

}

export default Courses;