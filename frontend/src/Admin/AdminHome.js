import { useHistory, Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Card from "../Card";
        
const AdminHome = (props) => {

    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const logOut = () => {
        props.setLoggedIn(false)
        localStorage.clear();
        history.replace("/")
    };

    return ( 
        <div>

            <Sidebar/>
        <div className="wrapper">
            <Card title="Users Online" description="456" button="View Users"></Card>
            <Card title="Users Online" description="456" button="View Users"></Card>
            <Card title="Users Online" description="456" button="View Users"></Card>
            <Card title="Users Online" description="456" button="View Users"></Card>
            </div>

            <h1> User Id = {user.user_id } </h1>
            <button onClick={logOut}>Log Out</button>
        
        </div>);
}
 
export default AdminHome;