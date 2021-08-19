import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import '../SupportingStaff/staffhome.css';
import PrintIcon from '@material-ui/icons/Print';
import GetAppIcon from '@material-ui/icons/GetApp';

const TeacherPayments = () => {

    const [data, setData] = useState([])

    const url = "http://localhost:3001/getTeacherPayments"
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

    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <div className="b2">

                        <ul>
                            <li className="reg_title">
                                <h3>Teacher Payments</h3>
                            </li>
                            <div  className="download_icons">
                            <button className="btnnew"> Print<PrintIcon/></button>
                            <button className="btnnew"> Download <GetAppIcon/></button>
                           
                            </div>
                            <li>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Teacher ID</th>
                                            <th scope="col">Amount Payable</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {data.map((pay, i) => (
                                            <tr>
                                            <td>{pay.teacher_id}</td>
                                            <td>{pay.amount_payable}</td>
                                            <td>{pay.fname} {pay.lname}</td>
                                            <td>{pay.email}</td>
                                            <td>{pay.contact}</td>
                                            </tr>
                                        ))}
                                     
                                    </tbody>
                                </table>
                            </li>
                        </ul>



                    </div>
                    
        </div>
        </div>
        
      );
}
 
export default TeacherPayments;