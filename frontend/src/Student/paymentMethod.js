import Sidebar from "../Sidebar";
import { Link, Route, useParams } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useState, useEffect } from "react";
import data from "@iconify-icons/cil/clear-all";
import '../Resources/styles.css';


// const student_id = req.body.student_id;
// const course_id = req.body.course_id;
// const amount = req.body.amount;
// const payment_method = "Bank Slip";
// const verified = 0;
// const today = new Date();



const PaymentMethod = () => {

    const { id } = useParams();
    // const id = { id: user.user_id }
    const Id = { id: id }

    const [data, setData] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'))

    const url = "http://localhost:3001/courseDetails";

    useEffect(() => {
        fetch(url, {
            method: 'POST',
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
            token: token
        }

        console.log(passData)

        fetch("http://localhost:3001/paymentStudent", {
            method: 'POST',
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

                        {/* <p className="text-start ms-5 fs-5 fw-normal">Subject : <span className="text-start ms-4 fs-5 fw-bold fst-italic">{data.course_name}</span></p>
                        <p className="text-start ms-5 fs-5 fw-normal">Academic year : <span className="text-start ms-4 fs-5 fw-bold fst-italic">{data.year}</span> </p>
                        <p className="text-start ms-5 fs-5 fw-normal">Amount : <span className="text-start ms-4 fs-5 fw-bold fst-italic">{data.price}</span></p> */}
                    </div>
                    <div className="payment-card-content">
                        <h2 className="text-start ms-5 my-5">Select The Payment Method...</h2>
                        <div>
                            {/* <Link to="/studentHome/payments/payslip" > */}
                            {/* <Link to={`/studentHome/payments/payslip/${data.course_id}`} >   
                                <div className="payment-card">
                                  <h2>Upload your payslip</h2> 
                                </div>
                            </Link> */}
                            <Link className="btn payslip btn-outline-dark me-4 mb-5" to={`/studentHome/payments/payslip/${data.course_id}`} >
                                Upload Your Payslip
                            </Link>
                            {/* <div className="payment-card">
                                <h2>Pay Online</h2>
                                <StripeCheckout
                                    stripeKey="pk_test_51JLxqKI3zG84BVe3rKggoFC6pHAF8RyEU6qv54suSBnG7utaxiiJKDZVDo1OIaL46Kg7D37G8DRowLH0Qo2wxSWR00gJRHx9a0"
                                    token={handleToken}
                                    amount={data.price * 100}
                                    name={data.course_name}
                                    billingAddress
                                    shippingAddress

                                />
                            </div> */}
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

export default PaymentMethod;


