import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import '../SupportingStaff/staffhome.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const UnassignedTeachers = () => {

    const [data, setData] = useState([])

    const url = "http://localhost:3001/viewUnassignedTeachers"
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
        doc.text('Unassigned Teachers', 14, 10);

        doc.autoTable({ html: '#reg-table' });
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
                            <h3>Unassigned Teachers</h3>
                        </li>
                        <li>
                            <table className="table table2" id="reg_table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Teacher ID</th>
                                        <th scope="col">Joined Date</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((teacher, i) => (
                                        <tr>
                                            <td>{teacher.teacher_id}</td>
                                            <td>{teacher.joined_date}</td>
                                            <td>{teacher.fname} {teacher.lname}</td>
                                            <td>{teacher.email}</td>
                                            <td>{teacher.contact}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </li>
                        <div>
                            
                            <button className="btn btn-dark add-btn" onClick={(e) => { handleClick(e); doc.save('Unassigned Teachers.pdf') }}>Download pdf</button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UnassignedTeachers;