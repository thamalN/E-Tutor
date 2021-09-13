import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const ViewProfile = () => {

    const [data, setData] = useState({})
    const location = useLocation()

    const url = "http://localhost:3001/viewProfile/"

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: location.state.userId, user_flag: location.state.userFlag })
        })

            .then((res) => {
                return res.json()
            })
            .then(data => {
                setData(data)
                localStorage.setItem("userInfo", JSON.stringify(data))
            })
    }, [url])

    console.log(data)

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="form-signup">
                    <h1 className="h3 mb-3 fw-normal">My Details</h1>
                    <form className="row g-3 ">


                        <div className="col-md-6">
                            <label htmlFor="firstName" className="mt-2">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                value={data.fname}
                                disabled
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="lastName" className="mt-2">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                value={data.lname}
                                disabled
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="mt-2" htmlFor="streetNo">Street No</label>
                            <input
                                type="text"
                                className="form-control"
                                id="streetNo"
                                value={data.street_no}
                                disabled
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="mt-2" htmlFor="streetName">Street</label>
                            <input
                                type="text"
                                className="form-control"
                                id="streetName"
                                value={data.street}
                                disabled
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="mt-2" htmlFor="city">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                value={data.city}
                                disabled
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="mt-2" htmlFor="province">Province</label>
                            <select
                                className="form-control"
                                id="province"
                                placeholder="Choose..."
                                value={data.province}
                                disabled
                            >
                                <option value="Western">Western</option>
                                <option value="Central">Central</option>
                                <option value="Southern">Southern</option>
                                <option value="Uva">Uva</option>
                                <option value="Sabaragamuwa">Sabaragamuwa</option>
                                <option value="North Western">North Western</option>
                                <option value="North Central">North Central</option>
                                <option value="Northern">Northern</option>
                                <option value="Eastern">Eastern</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="mt-2" htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={data.email}
                                disabled
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="mt-2" htmlFor="contact">Contact</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contact"
                                value={data.contact}
                                disabled
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="mt-2" htmlFor="birthday">Birthday</label>
                            <input type="date"
                                value={data.birthday}
                                className="form-control"
                                id="birthday"
                                disabled
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="mt-2" htmlFor="gender">Gender</label>
                            <select
                                className="form-control"
                                id="gender"
                                placeholder="Choose..."
                                disabled
                                value={data.gender}
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="mt-2" htmlFor="regDate">Registered Date</label>
                            <input type="date"
                                value={data.regDate}
                                className="form-control"
                                id="regDate"
                                disabled
                            />
                        </div>

                        {data.user_flag === 1 && (
                            <div>
                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="nic" >NIC</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nic"
                                        value={data.nic}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="joined_date" >Joined Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="joined_date"
                                        value={data.joined_date}
                                        disabled
                                    />
                                </div>
                            </div>
                        )}

                        {data.user_flag === 2 && (
                            <div>
                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="nic" >NIC</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nic"
                                        value={data.nic}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="joined_date" >Joined Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="joined_date"
                                        value={data.joined_date}
                                        disabled
                                    />
                                </div>
                            </div>
                        )}

                        {data.user_flag == 3 && (
                            <>
                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="nic" >NIC</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nic"
                                        value={data.nic}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="joined_date" >Joined Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="joined_date"
                                        value={data.joined_date}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="school" >School</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="school"
                                        value={data.school}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="qualifications" >Qualifications</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="qualifications"
                                        value={data.qualifications}
                                        disabled
                                    />
                                </div>
                            </>
                        )}

                        {data.user_flag === 4 && (
                            <div>
                                <div className="col-md-8">
                                    <label className="mt-2" htmlFor="school" >School</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="school"
                                        value={data.school}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="mt-2" htmlFor="grade" >Grade</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="grade"
                                        value={data.grade}
                                        disabled
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="guardianContact" className="mt-2">Guardian's Contact</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="guardianContact"
                                        value={data.guardian_contact}
                                        disabled
                                    />
                                </div>
                            </div>
                        )}

                        <div className="col-md-6">
                            <label htmlFor="userName" className="mt-2">Username</label>
                            <span id="usern" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                value={data.username}
                                disabled
                            />
                        </div>

                        <div className="col-12">
                            <Link to="/editProfile">
                                <input type="button" className="btn btn-dark add-btn" value="Edit Details" />
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;