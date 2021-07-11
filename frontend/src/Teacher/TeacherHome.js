import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";

const TeacherHome = (props) => {

    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const logOut = () => {
        props.setLoggedIn(false)
        localStorage.clear();
        history.replace("/")
    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="homeContent">
            <button className = "course-btn" onClick={logOut} style={{float: "right"}}>Log Out</button>
            </div>

        </div>

    );
}

export default TeacherHome;