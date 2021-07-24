import Sidebar from "../Sidebar";


const Notification = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const dueDate = true ; 
    let monthNumber = new Date();
    console.log(monthNumber.getMonth());

    return (
        
        <div>
            <Sidebar></Sidebar>
            <div className="homeContent">
                <div className="course-card">
                    <p>Notification</p>
                {dueDate&&<h2>Hellow {user.fname} , I am the notification</h2>}
                </div>
            </div>
        </div>


    );
}

export default Notification;