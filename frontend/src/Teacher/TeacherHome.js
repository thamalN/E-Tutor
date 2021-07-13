import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import Card from "../Card";


const TeacherHome = (props) => {

    const history = useHistory()

    //const user = JSON.parse(localStorage.getItem('user'))

    const logOut = () => {
        props.setLoggedIn(false)
        localStorage.clear();
        history.replace("/")
    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="homeContent">
                <button className="course-btn" onClick={logOut} style={{ float: "right" }}>Log Out</button>
                <div  id="adminCard">
                    <Card title="My Courses" description="5" button="View"></Card>
                    <Card title="Total Students" description="634" button="View"></Card>
                    <Card title="Upcoming Quizzes" description="10" button="View"></Card>
                    <Card title="Pending Payments" description="2" button="View"></Card>
                </div>
            </div>

        </div>

    );
}

export default TeacherHome;