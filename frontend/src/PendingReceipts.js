import Sidebar from "./Sidebar";
import { Link, Route, useHistory } from 'react-router-dom';
import './SupportingStaff/staffhome.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useEffect, useState } from "react";

const PendingReceipts = () => {

    const [data, setData] = useState([])
    const [paymentdata, setPaymentdata] = useState({
        payment_id: "",
        verifyflag: "",
        student_id: "",
        course_id: "",
        month: "",
        email: ""
        
    });
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const url = "http://localhost:3001/pendingReceipts"

    useEffect(() => {
        fetch(url)
            .then((res => {
                return res.json()
            }))
            .then((data => {
                setData(data)
                
                
            }))
    }, [paymentdata])
    
    
    const handleVerify = (e) => {
        if(e.target.id === "verify"){
            var variable = {...paymentdata}
            variable.verifyflag = 1
            setPaymentdata(variable)
            
        }
        else{
            var variable = {...paymentdata}
            variable.verifyflag = 2
            setPaymentdata(variable)
        }
        console.log(variable)
        
        
        
        const url2 = "http://localhost:3001/verifyPayment"

        fetch(url2, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(variable)
        })
            .then((res) => {
                return res.json()
            })
            .then((data => {

                if (data.status === "verified") {
                    alert("Payment Verified Successfully!");
                    history.push("/pendingReceipts");
                  } 
                  else if (data.status === "rejected") {
                    alert("Payment rejected!");
                    history.push("/pendingReceipts");
                  }
                  else if (data.status === "fail") {
                    alert("Payment rejected successfully but unexpected error occurred in mailing the student!");
                    history.push("/pendingReceipts");
                  }
            }))
    }
    

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="b2">

                    <ul>
                        <li className="reg_title">
                            <h1 className="stuRegHeader">Pending Receipts</h1>
                        </li>
                        <li className="reg_table">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Payment Date&Time</th>
                                        <th scope="col">Student Name</th>
                                        <th scope="col">Course</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Month</th>
                                        <th scope="col">Receipt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.map((payment, i) => (
                                    <div>
                                            <tr>
                                            <td scope="row">{payment.date_time}</td>
                                            <td align="left">{payment.fname} {payment.lname}</td>
                                            <td>{payment.course_id}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.month}</td>
                                            <td><button className="btn btn-dark" onClick={(e) => setPaymentdata({ ...paymentdata, payment_id: payment.payment_id, student_id: payment.student_id, course_id: payment.course_id, month: payment.month, email: payment.email}) } data-bs-toggle="modal" data-bs-target="#exampleModal1">View</button></td>
                                            </tr>
                                            <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Receipt</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body text-start m-1">
                                                    {payment.fname} {payment.lname}<br />
                                                    {payment.course_id} - {payment.month} <br />
                                                    {payment.date_time}
                                                        <Zoom>
                                                            <img src={payment.payment_slip} alt="slip" width="100%" />
                                                        </Zoom>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                        <button type="button" id="verify" onClick={(e) =>handleVerify(e)} className="btn btn-primary" data-bs-dismiss="modal">Verify</button>
                                                        <button type="button" id="reject" onClick={(e) =>handleVerify(e)} className="btn btn-danger" data-bs-dismiss="modal">Reject</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        ))}
                                    
                                </tbody>
                            </table>
                        </li>
                    </ul>
                </div>

                <div className="reg_buttons">
                    <Link className="linkbutton" to="/managePayments"><button>Back</button></Link>
                </div>
            </div>
        </div>
    );
}

export default PendingReceipts;


