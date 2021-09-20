import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import '../SupportingStaff/staffhome.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllStaff = () => {

    const [data, setData] = useState([])

    const url = "http://localhost:3001/allStaff"
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
        doc.text('All Staff', 14, 10);

        doc.autoTable({ html: '#reg-table' });
    };

    useEffect(() => {
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
                            <h3>All Supporting Staff</h3>
                        </li>
                        <li>
                            <table className="table table2" id="reg_table">
                            <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Registered Date</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((regData, i) => (
                                        <tr>
                                            <td>{regData.user_id}</td>
                                            <td>{regData.regDate}</td>
                                            <td>{regData.fname} {regData.lname}</td>
                                            <td>{regData.email}</td>
                                            <td>{regData.contact}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </li>
                        <div>
                            
                            <button className="btn btn-dark add-btn" onClick={(e) => { handleClick(e); doc.save('All Staff.pdf') }}>Download pdf</button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AllStaff;