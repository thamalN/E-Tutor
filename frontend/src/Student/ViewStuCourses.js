import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"

const ViewStuCourses = () => {
    const [data, setData] = useState([])
    const url = "http://localhost:3001/AllCourses"


    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data)
            })

        }, [url])


    return (
        <div>

            <Sidebar />
            <div className="homeContent">
                <div className="courses">
                    {data.map(course => (
                        <Link to={`/studentHome/payments`} className="course-card-container">
                        <div className="course-card-container">
                        <div key={course.course_id} className="course-card" >
                            
                                <div className="card-container">
                                    <h1>{course.course_name} {course.year}</h1>
                                    <p>{course.description}</p>
                                </div>

                        </div>
                        </div>
                        </Link>

                    ))}
                </div>
            </div>
        </div>);

}

export default ViewStuCourses;