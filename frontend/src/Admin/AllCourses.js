import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"
import { useHistory } from "react-router";
import DeleteIcon from '@material-ui/icons/Delete';

const AllCourses = () => {
    const [data, setData] = useState([])
    const history = useHistory()
    const url = "http://localhost:3001/AllCourses"
    const [course, setCourse] = useState({})



    useEffect(() => {
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data)
                console.log(data)
            })

        }, [])


        const getCourse = (id) => {
            fetch("http://localhost:3001/teacherCourses/" + id, {
                credentials: 'include'
            })
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
                    {data.map(course => (
                        <div key={course.course_id} className="course-card" onClick={() => getCourse(course.course_id)}>
                            
                            {/* <Link to={`/teacher/courses/${course.course_id}`} className="course-card-container"> */}
                                <div className="card-container">
                                <div className="card-info">
                                <h1>{course.course_name} {course.year}</h1>
                                <h3>By {course.fname} {course.lname}</h3>
                                    <p>{course.description}</p>
                                    <h3>RS. {course.price}</h3>
                                    
                                </div>
                                <img className="course_icon" src={course.image} alt="physics_icon"/>
                                </div>
                            {/* </Link> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>);

}

export default AllCourses;