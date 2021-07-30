import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import '../SupportingStaff/staffhome.css';

const RecentRegistrations = () => {

    const [data, setData] = useState([])

    const url = "http://localhost:3001/recentRegistrations"
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
                                <h3>Recent Registrations</h3>
                            </li>
                            <li>
                                <table className="table">
                                    <thead>
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



                    </div>
                    
        </div>
        </div>
        
      );
}
 
export default RecentRegistrations;