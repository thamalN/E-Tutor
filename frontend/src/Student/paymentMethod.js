import Sidebar from "../Sidebar";
import { Link, Route, useParams } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useState, useEffect } from "react";

async function handleToken(token, addresses) {
    fetch("http://localhost:3001/paymentStudent", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token)
    }).then((res => {
        console.log(res)
    }))
}


const PaymentMethod = () => {

    const { id } = useParams();
    // const id = { id: user.user_id }
    const Id = { id: id }

    const [data, setData] = useState([]);

    const url = "http://localhost:3001/courseDetails";

    useEffect(() => {fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
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


    return (
        <div>
            <Sidebar />
            <div className="PaymentContent">
                <h2>Payment For {data.course_name}</h2>
                <p>Academic year {data.year}</p>
                <p>Amount {data.price}</p>
                <div className="payment">
                    <div className="payment-card-content">
                        <h2>Select Your payment Method</h2>
                        <div>
                            <Link to="/studentHome/payments/payslip" >
                                <div className="payment-card">
                                   Opload your payslip
                                </div>
                            </Link>


                            <div className="payment-card">
                               Pay Online
                                <StripeCheckout
                                    stripeKey="pk_test_51JLxqKI3zG84BVe3rKggoFC6pHAF8RyEU6qv54suSBnG7utaxiiJKDZVDo1OIaL46Kg7D37G8DRowLH0Qo2wxSWR00gJRHx9a0"
                                    token={handleToken}
                                    amount={data.price * 100}
                                    name={data.course_name}
                                    billingAddress
                                    shippingAddress

                                />
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default PaymentMethod;


