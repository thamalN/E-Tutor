import Sidebar from "../Sidebar";
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import '../Resources/styles.css';

const EnrollNewCourse = () => {

    const { id } = useParams();
    const Id = { id: id }

    const [data, setData] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'))

    const url = "https://etutor-backend.herokuapp.com/courseDetails";

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(Id)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data[0])
                console.log(data);
            })

    }, [url])

    async function handleToken(token, addresses) {
        console.log(token)
        const passData = {
            student_id: user.user_id,
            course_id: data.course_id,
            amount: data.price,
            enrol: 1,
            token: token
        }

        console.log(passData)

        fetch("https://etutor-backend.herokuapp.com/paymentStudent", {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(passData)

        }).then((res => {
            console.log(res)
        }))
    }
    return (
        <div>
            <Sidebar />
            <div className="homeContent PaymentContent">

                <div className="payment">
                    <div className="payment-card-content">
                        <h2 className="text-start ms-5 my-5">Complete The Payment Here...</h2>
                        <table align="left" className="tablepayment ms-5 mb-5 align-start">
                            <tbody>
                                <tr>
                                    <td>Subject</td>
                                    <td>:</td>
                                    <td><span className="text-start ms-4 fs-5 fw-bold fst-italic">{data.course_name}</span></td>
                                </tr>
                                <tr>
                                    <td>Academic year</td>
                                    <td>:</td>
                                    <td><span className="text-start ms-4 fs-5 fw-bold fst-italic">{data.year}</span></td>
                                </tr>
                                <tr>
                                    <td>Amount</td>
                                    <td>:</td>
                                    <td><span className="text-start ms-4 fs-5 fw-bold fst-italic">Rs.{data.price}</span></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="payment-card-content">
                        <h2 className="text-start ms-5 my-5">Select The Payment Method...</h2>
                        <div>
        
                            <Link className="btn payslip btn-outline-dark me-4 mb-5" to={`/studentHome/payments/payslip/${data.course_id}`} >
                                Upload Your Payslip
                            </Link>
                       
                            <StripeCheckout
                                stripeKey="pk_test_51JLxqKI3zG84BVe3rKggoFC6pHAF8RyEU6qv54suSBnG7utaxiiJKDZVDo1OIaL46Kg7D37G8DRowLH0Qo2wxSWR00gJRHx9a0"
                                token={handleToken}
                                amount={data.price * 100}
                                name={data.course_name}
                                billingAddress
                                shippingAddress
                            >
                                <button className="btn payslip btn-outline-dark ms-4 mb-5">
                                    Pay With Card
                                </button>
                            </StripeCheckout>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default EnrollNewCourse;


