import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import '../SupportingStaff/staffhome.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const UnenrolledCourses = () => {

    const [data, setData] = useState([])

    const url = "http://localhost:3001/viewUnenrolledCourses"
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
        doc.text('Unenrolled Courses', 14, 10);

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
                            <h3>Unenrolled Courses</h3>
                        </li>
                        <li>
                            <table className="table" id="reg_table">
                                <thead>
                                    <tr>
                                        <th scope="col">Course ID</th>
                                        <th scope="col">Course Name</th>
                                        <th scope="col">Course Year</th>
                                        <th scope="col">Conducted By</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((course, i) => (
                                        <tr>
                                            <td>{course.teacher_id}</td>
                                            <td>{course.course_name}</td>
                                            <td>{course.year}</td>
                                            <td>{course.fname} {course.lname}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </li>
                        <div>
                            <Link to="/adminHome/reports"><button >Back</button></Link>
                            <button onClick={(e) => { handleClick(e); doc.save('Unenrolled Courses.pdf') }}>Download pdf</button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UnenrolledCourses;