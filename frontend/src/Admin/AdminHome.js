import { useHistory, Link } from "react-router-dom";
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

        fetch(url1, {
            method: 'GET',
            credentials: 'include',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setReceipts(data)
            })

    }, [url1])

    const url2 = "http://localhost:3001/adminHome/unenrolledCourses"

    useEffect(() => {

        fetch(url2, {
            method: 'GET',
            credentials: 'include',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setUnenrolledCourses(data)
            })

    }, [url2])

    const url3 = "http://localhost:3001/adminHome/totalStudents"

    useEffect(() => {

        fetch(url3, {
            method: 'GET',
            credentials: 'include',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setStudentCount(data)
            })

    }, [url3])

    const url4 = "http://localhost:3001/adminHome/unassignedTeachers"

    useEffect(() => {

        fetch(url4, {
            method: 'GET',
            credentials: 'include',
            headers: { "Content-Type": "application/json" }
        })
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
                    <Card title="Registered Students" description={studentCount} button="View" onclick={() => history.push("/adminHome/reports/allStudents")}></Card>
                    <Card title="Unenrolled Courses" description={unenrolledCourses} button="View" onclick={() => history.push("/adminHome/reports/unenrolledCourses")}></Card>
                    <Card title="Unassigned Teachers" description={unassignedTeachers} button="View" onclick={() => history.push("/adminHome/reports/unassignedTeachers")}></Card>
                    <Card title="Pending Receipts" description={receipts} button="View" onclick={() => history.push("/payments/pendingReceipts")}></Card>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;