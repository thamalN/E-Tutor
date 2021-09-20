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
                        <Link to={`/studentHome/payments/newPayment/paymentMethod/${course.course_id}`} >

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

export default PayCourses;