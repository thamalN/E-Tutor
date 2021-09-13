import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import '../SupportingStaff/staffhome.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CoursePayments = () => {

    const [data, setData] = useState([])

    const url = "http://localhost:3001/totalPayments"
    useEffect(() => {

        fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data)
            })

    }, [url])

    const doc = new jsPDF()

    const handleClick = (e) => {
        

        // doc.autoTable({ html: '#reg-table' });
    };

    useEffect(() => {
        doc.text('Total Payments Of The Month'+data.map((regData, i) => (regData.month)) , 14, 10);
        doc.autoTable({ html: document.getElementById('reg_table') });
        // if (data.password.length !== 0) {
        //     if (data.password === data.confirmPassword) {
        //         document.getElementById('pass').innerHTML = '(Passwords match!)';
        //         document.getElementById('pass').style.color = "green";
        //     } else {
        //         document.getElementById('pass').innerHTML = '(Passwords do not match!)';
        //         document.getElementById('pass').style.color = "red";

        //     }
        // }
    })

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="b2">
                    <ul>
                        <li className="reg_title">
                            <h3>Total Payments Of The Month {data.map((regData, i) => (regData.month))}</h3>
                        </li>
                        <li>
                            <table className="table" id="reg_table">
                                <thead>
                                    <tr>
                                        <th scope="col">Course ID</th>
                                        <th scope="col">Course Name</th>
                                        <th scope="col">Course Year</th>
                                        <th scope="col">Conducted By</th>
                                        <th scope="col">Total Payments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((regData, i) => (
                                        <tr>
                                            <td>{regData.course_id}</td>
                                            <td>{regData.course_name}</td>
                                            <td>{regData.year}</td>
                                            <td>{regData.fname} {regData.lname}</td>
                                            <td>{regData.sum}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </li>
                        <div>
                            <Link to="/adminHome/reports"><button >Back</button></Link>
                            <button onClick={(e) => { handleClick(e); doc.save('All Teachers.pdf') }}>Download pdf</button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CoursePayments;