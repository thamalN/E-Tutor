import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"

import React from "react";
import ReactDOM from "react-dom";

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
// import Course from "../../../backend/APIs/Course";



const PayCourses = () => {
    // 
    const user = JSON.parse(localStorage.getItem('user'))

    async function handleToken(token, addresses) {
        const response = await axios.post(
            "http://localhost:3001/paymentStudent",
            { token, product }
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
            //   toast("Success! Check email for details", { type: "success" });
            const url = "http://localhost:3001/paymentUpdate"

            // useEffect(() => {

            fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            })
                .then(res => {
                    return res.json();
                })
                .then(data => {

                })

            // }, [url])
            console.log('success');
        } else {
            //   toast("Something went wrong", { type: "error" });
        }

        fetch("http://localhost:3001/paymentStudent", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(token)
        }).then((res => {
            console.log(res)
        }))
    }


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
                                        {/* <Link to={`/studentHome/myCourses/${course.course_id}`} className="course-card-container"> */}
                                        <h1>{course.course_name} {course.year}</h1>
                                        {/* </Link> */}
                                        <p>{course.description}</p>
                                    </div>
                                    {/* <StripeCheckout
                                    stripeKey="pk_test_51JLxqKI3zG84BVe3rKggoFC6pHAF8RyEU6qv54suSBnG7utaxiiJKDZVDo1OIaL46Kg7D37G8DRowLH0Qo2wxSWR00gJRHx9a0"
                                    token={handleToken}
                                    amount={course.price * 100}
                                    name={course.course_name}
                                    billingAddress
                                    shippingAddress

                                /> */}
                                </div>

                            </div>
                        </Link>

                    ))}
                </div>
            </div>
        </div>);

}
// 
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
// 
export default PayCourses;
// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import Sidebar from "../Sidebar"

// import React from "react";
// import ReactDOM from "react-dom";
// import StripeCheckout from "react-stripe-checkout";
// import axios from "axios";
// // import Course from "../../../backend/APIs/Course";
// // import { toast } from "react-toastify";

// // import "react-toastify/dist/ReactToastify.css";
// // import "./styles.css";

// // toast.configure();

// // function App() {
// //   const [product] = React.useState({
// //     name: "Tesla Roadster",
// //     price: 64998.67,
// //     description: "Cool car"
// //   });

// //   async function handleToken(token, addresses) {
// //     const response = await axios.post(
// //       "https://ry7v05l6on.sse.codesandbox.io/checkout",
// //       { token, product }
// //     );
// //     const { status } = response.data;
// //     console.log("Response:", response.data);
// //     if (status === "success") {
// //       toast("Success! Check email for details", { type: "success" });
// //     } else {
// //       toast("Something went wrong", { type: "error" });
// //     }
// //   }

// //   return (
// //     <div className="container">
// //       <div className="product">
// //         <h1>{product.name}</h1>
// //         <h3>On Sale · ${product.price}</h3>
// //       </div>
// //       <StripeCheckout
// //         stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
// //         token={handleToken}
// //         amount={product.price * 100}
// //         name="Tesla Roadster"
// //         billingAddress
// //         shippingAddress
// //       />
// //     </div>
// //   );
// // }



// // here



// const PayCourses = () => {
//     // 
//     const user = JSON.parse(localStorage.getItem('user'))

//     async function handleToken(token, addresses) {
//         const response = await axios.post(
//             "http://localhost:3001/paymentStudent",
//             { token, product }
//         );
//         const { status } = response.data;
//         console.log("Response:", response.data);
//         if (status === "success") {
//             //   toast("Success! Check email for details", { type: "success" });
//             const url = "http://localhost:3001/paymentUpdate"

//             // useEffect(() => {

//             fetch(url, {
//                 method: 'POST',
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(product)
//             })
//                 .then(res => {
//                     return res.json();
//                 })
//                 .then(data => {

//                 })

//             // }, [url])
//             console.log('success');
//         } else {
//             //   toast("Something went wrong", { type: "error" });
//         }

//         fetch("http://localhost:3001/paymentStudent", {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(token)
//         }).then((res => {
//             console.log(res)
//         }))
//     }


//     const [data, setData] = useState([])
//     const [product, setProduct] = useState([])
//     const [payData, setPayData] = useState({
//         student_id: user.user_id,
//         course_id: "",
//         payment_method: "",
//         amount: "",
//         month: ""
//     });

//     const id = { id: user.user_id }

//     const url = "http://localhost:3001/studentCourses"

//     useEffect(() => {

//         fetch(url, {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(id)
//         })
//             .then(res => {
//                 return res.json();
//             })
//             .then(data => {
//                 setData(data)
//                 setProduct(data)
//                 console.log()
//             })

//     }, [url])


//     return (
//         <div>

//             <Sidebar />
//             <div className="homeContent">
//                 <div className="courses">
//                     {data.map(course => (
//                         <div className="course-card-container">
//                             <div key={course.course_id} className="course-card" >

//                                 <div className="card-container">
//                                     <Link to={`/studentHome/myCourses/${course.course_id}`} className="course-card-container">
//                                         <h1>{course.course_name} {course.year}</h1>
//                                     </Link>
//                                     <p>{course.description}</p>
//                                 </div>
//                                 <StripeCheckout
//                                     stripeKey="pk_test_51JLxqKI3zG84BVe3rKggoFC6pHAF8RyEU6qv54suSBnG7utaxiiJKDZVDo1OIaL46Kg7D37G8DRowLH0Qo2wxSWR00gJRHx9a0"
//                                     token={handleToken}
//                                     amount={course.price * 100}
//                                     name={course.course_name}
//                                     billingAddress
//                                     shippingAddress

//                                 />
//                             </div>

//                         </div>

//                     ))}
//                 </div>
//             </div>
//         </div>);

// }
// // 
// // const rootElement = document.getElementById("root");
// // ReactDOM.render(<App />, rootElement);
// // 
// export default PayCourses;
