import { useHistory, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Card from "../Card";
        
const AdminHome = (props) => {

    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const [unenrolledCourses, setUnenrolledCourses] = useState()
    const [receipts, setReceipts] = useState()
    const [studentCount, setStudentCount] = useState()
    const [unassignedTeachers, setUnassignedTeachers] = useState()

    const logOut = () => {
        props.setLoggedIn(false)
        localStorage.clear();
        history.replace("/")
    };

    const url1 = "http://localhost:3001/adminHome/pendingReceipts"

    useEffect(() => {

        fetch(url1)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setReceipts(data)
            })

    }, [url1])

    const url2 = "http://localhost:3001/adminHome/unenrolledCourses"

    useEffect(() => {

        fetch(url2)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setUnenrolledCourses(data)
            })

    }, [url2])

    const url3 = "http://localhost:3001/adminHome/totalStudents"

    useEffect(() => {

        fetch(url3)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setStudentCount(data)
            })

    }, [url3])

    const url4 = "http://localhost:3001/adminHome/unassignedTeachers"

    useEffect(() => {

        fetch(url4)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setUnassignedTeachers(data)
            })

    }, [url4])

    return ( 
        

<div>

<Sidebar />

<div className="homeContent">



        <div className="wrapper">
            <Link to="/adminHome/reports/allStudents" ><Card title="Registered Students" description={studentCount}></Card></Link>
            <Link to="/adminHome/reports/unenrolledCourses" ><Card title="Unenrolled Courses" description={unenrolledCourses}></Card></Link>
            <Link to="/adminHome/reports/unassignedTeachers" ><Card title="Unassigned Teachers" description={unassignedTeachers}></Card></Link>
            <Link to="/payments/pendingReceipts" ><Card title="Pending Receipts" description={receipts}></Card></Link>
            </div>
            </div>
            </div>
        );
}
 
export default AdminHome;