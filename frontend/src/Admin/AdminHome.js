import { useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Card from "../Card";
        
const AdminHome = (props) => {

    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const [unenrolledCourses, setUenrolledCourses] = useState()
    const [receipts, setReceipts] = useState()
    const [studentCount, setStudentCount] = useState()

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
                setUenrolledCourses(data)
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

    return ( 
        

<div>

<Sidebar />

<div className="homeContent">



        <div className="wrapper">
            <Card title="Registered Students" description={studentCount} button="View"></Card>
            <Card title="Unenrolled Courses" description={unenrolledCourses} button="View"></Card>
            <Card title="Incomplete Courses" description="10" button="View"></Card>
            <Card title="Pending Receipts" description={receipts} button="View"></Card>
            </div>
            </div>
            </div>
        );
}
 
export default AdminHome;