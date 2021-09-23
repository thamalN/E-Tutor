import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import '../SupportingStaff/staffhome.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RecentStaffRegistrations = () => {

    const [data, setData] = useState([])

    const url = "https://etutor-backend.herokuapp.com/recentStaffRegistrations"
    useEffect(() => {

        fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
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
        doc.text('Recent Registrations', 14, 10);
    };

    useEffect(() => {
        doc.autoTable({ html: document.getElementById('reg_table') });
    })

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="b2">

                    <ul>
                        <li className="reg_title">
                            <h3>Recent Registrations</h3>
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

                    </ul>
                    <div>
                        <Link to="/supportingStaffHome/dashboard"><button className="btn btn-outline-dark">Back to Dashboard</button></Link>
                        <button className="btn btn-outline-dark ms-1" onClick={(e) => { handleClick(e); doc.save('Recent Registrations.pdf') }}>Download pdf</button>
                    </div>





                </div>

            </div>
        </div>

    );
}

export default RecentStaffRegistrations;