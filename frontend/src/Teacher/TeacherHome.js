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
            <h1> User Id = {user.user_id } </h1>
            <button onClick={logOut}>Log Out</button>

            <Sidebar/>
        </div>

     );
}
 
export default TeacherHome;