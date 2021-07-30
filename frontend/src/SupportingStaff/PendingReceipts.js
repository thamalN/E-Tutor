import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';
import slide3 from '../Resources/slide3.jpg';
import './staffhome.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const PendingReceipts = () => {
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="b2">

                    <ul>
                        <li className="reg_title">
                            <h1 className="stuRegHeader">Pending Receipts</h1>
                        </li>
                        <li className="reg_table">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Pay Date</th>
                                        <th scope="col">Pay Time</th>
                                        <th scope="col">Student Name</th>
                                        <th scope="col">Course</th>
                                        <th scope="col">Month</th>
                                        <th scope="col">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">14/07/2021</th>
                                        <td>9:27AM</td>
                                        <td align="left">Nuvinda Chandrakumara</td>
                                        <td>Chemistry</td>
                                        <td>July</td>
                                        <td>
                                            <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1">View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">13/07/2021</th>
                                        <td>9:27AM</td>
                                        <td align="left">Thamal Nanayakkara</td>
                                        <td>Chemistry</td>
                                        <td>July</td>
                                        <td><button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1">View</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">13/07/2021</th>
                                        <td>9:27AM</td>
                                        <td align="left">Mary Watson</td>
                                        <td>Chemistry</td>
                                        <td>July</td>
                                        <td><button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1">View</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">12/07/2021</th>
                                        <td>9:27AM</td>
                                        <td align="left">Niklaus Mikaelson</td>
                                        <td>Chemistry</td>
                                        <td>July</td>
                                        <td><button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1">View</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">11/07/2021</th>
                                        <td>9:27AM</td>
                                        <td align="left">Malinda Malith</td>
                                        <td>Chemistry</td>
                                        <td>July</td>
                                        <td><button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1">View</button></td>
                                    </tr>
                                    <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Receipt</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body text-start m-1">
                                                    Nuvinda Chandrakumara <br />
                                                    Chemistry - July <br />
                                                    14/07/2021 9:27AM
                                                    <Zoom>
                                                        <img src={slide3} alt="slide3" width="100%" />
                                                    </Zoom>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Verify</button>
                                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Reject</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </tbody>
                            </table>
                        </li>
                    </ul>
                </div>

                <div className="reg_buttons">
                    <Link className="linkbutton" to="/verifiedReceipts"><button>View Verified List</button></Link>
                    <Link className="linkbutton" to="/rejectedReceipts"><button>View Rejected List</button></Link>
                    <Link className="linkbutton" to="/supportingStaffHome"><button>Back to Dashboard</button></Link>
                </div>
            </div>
        </div>
    );
}

export default PendingReceipts;


