import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"

const ViewStuCourses = () => {
    const [data, setData] = useState([])
    const url = "https://etutor-backend.herokuapp.com/unenrolledCourses"
    const user = JSON.parse(localStorage.getItem('user'))
    const id = { id: user.user_id }
    
    useEffect(() => {
        fetch(url, {
            credentials: 'include',
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(id),
            headers: { "Content-Type": "application/json" }

        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data)
            })

    }, [])


    return (
        <div>

            <Sidebar />
            <div className="homeContent">
                <div className="courses">

                    {data.map(course => (
                        <div className="course-card-container">
                            <div className="course-card-container">
                                <div key={course.course_id} className="course-card" >

                                    <div className="card-container">
                                        <div className="card-info">
                                            <h1>{course.course_name} {course.year}</h1>
                                            <p>{course.description}</p>
                                            <h2><small>by </small>{course.fname} {course.lname}</h2>
                                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                                                <h3 style={{ flex: "0 0 90%" }}>RS. {course.price}</h3>
                                                {/* <Link to={`/studentHome/payments`}><button className="btn btn-dark add-btn" style={{margin:"0"}}>Enroll</button></Link> */}
                                                <Link to={`/studentHome/payments/newPayment/newEnrollment/${course.course_id}`}><button className="btn btn-dark add-btn" style={{ margin: "0" }}>Enroll</button></Link>
                                            </div>
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

export default ViewStuCourses;