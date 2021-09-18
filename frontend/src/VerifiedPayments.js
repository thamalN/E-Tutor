import Sidebar from "./Sidebar";
import { Link, Route, useHistory } from 'react-router-dom';
import './SupportingStaff/staffhome.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useEffect, useState } from "react";

const PendingReceipts = () => {

    const [data, setData] = useState([])
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const url = "http://localhost:3001/verifiedPayments"

    useEffect(() => {
        fetch(url)
            .then((res => {
                return res.json()
            }))
            .then((data => {
                setData(data)
            }))
    }, [url])

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="b2">

                    <ul>
                        <li className="reg_title">
                            <h1 className="stuRegHeader">Verified Payments</h1>
                        </li>
                        <li>
                            <table className="table table2">
                            <thead className="thead-dark">
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
                                    <>
                                            <tr>
                                            <td scope="row">{payment.date_time}</td>
                                            <td align="left">{payment.fname} {payment.lname}</td>
                                            <td>{payment.course_id}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.month}</td>
                                            <td><button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1">View</button></td>
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
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Back</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                        ))}
                                    
                                </tbody>
                            </table>
                        </li>
                    </ul>
                </div>

                <div className="reg_buttons">
                    <Link className="linkbutton" to="/payments/studentPayments">Back to Student Payments</Link>
                </div>
            </div>
        </div>
    );
}

export default PendingReceipts;


