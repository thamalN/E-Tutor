import { useHistory, Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Card2 from "../Card2.js";
import './staffhome.css';
// import Calendar from "../Calendar";
import Calendar from 'react-calendar'
import background1 from "../Resources/background1.jpg";
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import { Icon, InlineIcon } from '@iconify/react';
import clearAll from '@iconify-icons/cil/clear-all';



const SupportingStaffHome = (props) => {

    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const logOut = () => {
        props.setLoggedIn(false)
        localStorage.clear();
        history.replace("/")
    };

    const [data, setData] = useState([])
    const url = "http://localhost:3001/mostRecentStaffRegistrations"
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

    const [pendingReceipts, setPendingReceipts] = useState()
    const url1 = "http://localhost:3001/adminHome/pendingReceipts"

    useEffect(() => {

        fetch(url1)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setPendingReceipts(data)
            })

    }, [url1])

    const [verifiedReceipts, setVerifiedReceipts] = useState()
    const url2 = "http://localhost:3001/adminHome/verifiedReceipts"

    useEffect(() => {

        fetch(url2)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setVerifiedReceipts(data)
            })

    }, [url2])

    const [rejectedReceipts, setRejectedReceipts] = useState()
    const url3 = "http://localhost:3001/adminHome/rejectedReceipts"

    useEffect(() => {

        fetch(url3)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setRejectedReceipts(data)
            })

    }, [url3])

    const [registeredStudents, setRegisteredStudents] = useState()
    const url4 = "http://localhost:3001/adminHome/totalStudents"

    useEffect(() => {

        fetch(url4)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setRegisteredStudents(data)
            })

    }, [url4])

    return (
        <main>
            <Sidebar />
            <div className="homeContent">
                <div className="dashboard">
                    {/* <div className="b1">
                    <div className="c1">Welcome back, Hayley!</div>
                </div> */}

                    <div className="staffContent">
                        {/* <div className="staffWrapper">
                        <Card2 title="Users Online" description="456" button="View"></Card2>
                        <Card2 title="Unenrolled Courses" description="12" button="View"></Card2>
                        <Card2 title="Incomplete Courses" description="10" button="View"></Card2>
                        <Card2 title="Pending Payments" description="13" button="View"></Card2>
                    </div> */}
                        <div className="title">
                            <h2>Welcome back, {user.fname}  {user.lname} !</h2>
                        </div>

                        <div className="calendarsection">
                            <ul>
                                <li>

                                    <ul>
                                        <li><Link className="btn btn-outline-dark mt-4" to="/signUp">Register a Student</Link></li>
                                        <li><Link className="btn btn-outline-dark" to="/supportingStaffHome/registrations/recentStaffRegistrations">Recent Registrations</Link></li>
                                        <li><Link className="btn btn-outline-dark" to="/pendingReceipts">Pending Receipts</Link></li>
                                        <li><Link className="btn btn-outline-dark" to="/supportingStaffHome/studentAccounts">Search Students</Link></li>
                                        {/* <li><Link className="btn btn-outline-dark" to="/supportingStaffHome/reports">Create Reports</Link></li> */}
                                    </ul>
                                </li>
                                <li className="calendar"><Calendar /></li>
                            </ul>
                        </div>

                        <div className="wrapper">
                            <Card2 title="Registered Students" description={registeredStudents} button="View"></Card2>
                            <Card2 title="Pending Receipts" description={pendingReceipts} button="View"></Card2>
                            <Card2 title="Verified Receipts" description={verifiedReceipts} button="View"></Card2>
                            <Card2 title="Rejected Receipts" description={rejectedReceipts} button="View"></Card2>
                            
                        </div>

                        <div className="b2">
                            <ul>
                                <li className="reg_title">
                                    <h3>Registrations In Last 7 Days</h3>
                                    <Link className="viewAll" to="/supportingStaffHome/registrations/recentStaffRegistrations"><h6>View All <Icon icon={clearAll} /></h6></Link>
                                </li>
                                <li className="reg_table">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Name</th>
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
            </div>

        </main>
    );
}

export default SupportingStaffHome;