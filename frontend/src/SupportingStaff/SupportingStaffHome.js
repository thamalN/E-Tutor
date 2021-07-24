import { useHistory, Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Card2 from "../Card2.js";
import './staffhome.css';
// import Calendar from "../Calendar";
import Calendar from 'react-calendar'
import background1 from "../Resources/background1.jpg";
import 'react-calendar/dist/Calendar.css';
// 
import { Icon, InlineIcon } from '@iconify/react';
import clearAll from '@iconify-icons/cil/clear-all';


const SupportingStaffHome = (props) => {

    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const logOut = () => {
        props.setLoggedIn(false)
        localStorage.clear();
        history.replace("/")
    };

    return (
        <main>
            <div className="dashboard">
                {/* <div className="b1">
                    <div className="c1">Welcome back, Hayley!</div>
                </div> */}
                <Sidebar />
                <div className="staffContent">
                    {/* <div className="staffWrapper">
                        <Card2 title="Users Online" description="456" button="View"></Card2>
                        <Card2 title="Unenrolled Courses" description="12" button="View"></Card2>
                        <Card2 title="Incomplete Courses" description="10" button="View"></Card2>
                        <Card2 title="Pending Payments" description="13" button="View"></Card2>
                    </div> */}
                    <div className="title">
                        <h2>Welcome back, {user.fname}  {user.lname} !</h2>

                    </div>

                    <div className="calendarsection">

                        <ul>
                            <li>
                                <h3>Calendar</h3>
                                <ul>
                                    <li><Link className="linkbutton" to="/contact">Upcoming Events</Link></li>
                                    <li><Link className="linkbutton" to="/contact">Ongoing Events</Link></li>
                                    <li><Link className="linkbutton" to="/contact">Completed Events</Link></li>
                                </ul>
                            </li>
                            <li className="calendar"><Calendar /></li>
                        </ul>

                    </div>

                    <div className="b2">

                        <ul>
                            <li className="reg_title">
                                <h3>Recent Registrations</h3>
                                <Link className="viewAll" to="/registrations"><h6>View All <Icon icon={clearAll} /></h6></Link>
                            </li>
                            <li>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">2501</th>
                                            <td>14/07/2021</td>
                                            <td>8:21AM</td>
                                            <td>Nuvinda Chandrakumara</td>
                                            <td>0727787778</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2500</th>
                                            <td>13/07/2021</td>
                                            <td>9:11PM</td>
                                            <td>Thamal Nanayakkara</td>
                                            <td>0123212234</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2499</th>
                                            <td>13/07/2021</td>
                                            <td>7:47PM</td>
                                            <td>Mary Watson</td>
                                            <td>0123212234</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2498</th>
                                            <td>13/07/2021</td>
                                            <td>1:32PM</td>
                                            <td>Niklaus Mikaelson</td>
                                            <td>0123212234</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2497</th>
                                            <td>12/07/2021</td>
                                            <td>11:51AM</td>
                                            <td>Malinda Malith</td>
                                            <td>0123212234</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2496</th>
                                            <td>12/07/2021</td>
                                            <td>9:27AM</td>
                                            <td>Pavan Ransara</td>
                                            <td>0123212234</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2495</th>
                                            <td>12/07/2021</td>
                                            <td>8:58AM</td>
                                            <td>Mega Mann</td>
                                            <td>0123212234</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2494</th>
                                            <td>11/07/2021</td>
                                            <td>8:21AM</td>
                                            <td>Yashith Dilhara</td>
                                            <td>0123212234</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2493</th>
                                            <td>11/07/2021</td>
                                            <td>8:21AM</td>
                                            <td>Ravindu Rajapaksa</td>
                                            <td>0123212234</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2492</th>
                                            <td>11/07/2021</td>
                                            <td>8:21AM</td>
                                            <td>John Doe</td>
                                            <td>0123212234</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>



                    </div>

                </div>
            </div>
        </main>
    );
}

export default SupportingStaffHome;