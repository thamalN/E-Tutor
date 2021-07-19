import { useHistory} from "react-router-dom";
import Sidebar from "../Sidebar";
// import Calendar from "../Calendar";

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
                <div className="course-card-container">
                    
                            <div className="course-card">
                                
                                    <h1>Chemistry 2023</h1>
                                    <p>A level Chemistry studies  the material world, and through chemistry we can describe and explain questions such as: "what happens when sugar dissolves in tea?"; "why is mercury a liquid at room temperature?"; "how do we make plastics?"; "what can we do about global warming?"; "how and why will I be affected if oil runs out?".</p>
                                

                            </div>
                    
                </div>
            
            {/* <div ><Calendar /></div> */}

            </div>

        </div>

    );
}

export default StudentHome;