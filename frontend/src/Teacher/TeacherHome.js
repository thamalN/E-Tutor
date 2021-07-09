import { useHistory } from "react-router-dom";

const TeacherHome = () => {

    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const logOut = () => {
        localStorage.clear();
        history.push("/")
    };

    return ( 
        
        <div className="dashboard">
            <h1> {user.user_id } </h1>
            <button onClick={logOut}>Log Out</button>
        </div>

     );
}
 
export default TeacherHome;