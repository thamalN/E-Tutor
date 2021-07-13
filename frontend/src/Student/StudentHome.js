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
            <Calendar />

            </div>

        </div>

    );
}

export default StudentHome;