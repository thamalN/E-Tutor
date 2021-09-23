import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"
import React from "react";

const PayCourses = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const [data, setData] = useState([])
    const [product, setProduct] = useState([])
    const [payData, setPayData] = useState({
        student_id: user.user_id,
        course_id: "",
        payment_method: "",
        amount: "",
        month: ""
    });

    const id = { id: user.user_id }

    const url = "https://etutor-backend.herokuapp.com/studentCourses"

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
                setProduct(data)
                console.log()
            })

    }, [url])
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="courses">
                    {data.map(course => (
                        //  <div className="course-card-container">
                        <Link to={`/studentHome/payments/newPayment/paymentMethod/${course.course_id}`} >

                            <div className="course-card-container">
                                <div key={course.course_id} className="course-card" >
                                    <div className="card-container">
                                        <div className="card-nfo">
                                            <h1>{course.course_name} {course.year}</h1>
                                            <p>{course.description}</p>
                                            <h2><small>by </small>{course.fname} {course.lname}</h2>
                                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                                                <h3 style={{ flex: "0 0 90%" }}>RS. {course.price}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        // <div>
                    ))}

                    {data.length === 0 && <h1>No due payments...</h1>}
                </div>
            </div>
        </div>);

}

export default PayCourses;


