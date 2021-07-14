import { useHistory} from "react-router-dom";
import Sidebar from "../Sidebar";
import Calendar from "../Calendar";

const StudentHome = (props) => {

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
                <h1>Recently Accessed Courses</h1>
                <div className="courses">
                    
                            <div className="course-card-container">
                                <div className="card-container">
                                    <h1>Combined Mathematics 2023 A/L</h1>
                                    <p>Pure Mathematics, Applied Mathematics</p>
                                </div>

                            </div>
                    
                </div>
            
            <Calendar />

            </div>

        </div>

    );
}

export default StudentHome;