import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';
import './staffhome.css';

const SearchToUpdate = () => {
    const history = useHistory()

    const [id, setId] = useState(null);

    const [data, setData] = useState(
        {
            firstname: "",
            lastname: "",
            street_no: "",
            street: "",
            city: "",
            province: "",
            email: "",
            contact: "",
            birthday: "",
            gender: "",
            username: "",
            password: "",
            confirmPassword: "",
            school: "",
            grade: "",
            guardian_contact: ""
        }
    );
    return (
        <div>
            <Sidebar />
            <div className="homeContent">

            <h1 className="stuRegHeader">Search To Update</h1>
            <form className="searchForm">
                <div className="col-md-6">
                    <label htmlFor="firstName" className="mt-2">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="lastName" className="mt-2">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="userName" className="mt-2">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="mt-2">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="mt-2" htmlFor="school" >School</label>
                    <input
                        type="text"
                        className="form-control"
                        id="school"
                        value={data.school}
                        onChange={(e) => setData({ ...data, school: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="mt-2" htmlFor="grade" >Grade</label>
                    <input
                        type="text"
                        className="form-control"
                        id="grade"
                        value={data.grade}
                        onChange={(e) => setData({ ...data, grade: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="guardianContact" className="mt-2">Guardian's Contact</label>
                    <input
                        type="text"
                        className="form-control"
                        id="guardianContact"
                        value={data.guardian_contact}
                        onChange={(e) => setData({ ...data, guardian_contact: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="mt-2" htmlFor="streetNo">Street No</label>
                    <input
                        type="text"
                        className="form-control"
                        id="streetNo"
                        value={data.street_no}
                        onChange={(e) => setData({ ...data, street_no: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="mt-2" htmlFor="streetName">Street</label>
                    <input
                        type="text"
                        className="form-control"
                        id="streetName"
                        value={data.street}
                        onChange={(e) => setData({ ...data, street: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="mt-2" htmlFor="city">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={data.city}
                        onChange={(e) => setData({ ...data, city: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="mt-2" htmlFor="province">Province</label>
                    <select
                        className="form-select"
                        id="province"
                        value={data.province}
                        onChange={(e) => setData({ ...data, province: e.target.value })}
                        required
                    >
                        <option value="" disabled defaultValue hidden>Choose...</option>
                        <option>Western</option>
                        <option>Central</option>
                        <option>Southern</option>
                        <option>Uva</option>
                        <option>Sabaragamuwa</option>
                        <option>North Western</option>
                        <option>North Central</option>
                        <option>Nothern</option>
                        <option>Eastern</option>
                    </select>
                </div>


                <div className="col-md-6">
                    <label className="mt-2" htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="mt-2" htmlFor="contact">Contact</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contact"
                        value={data.contact}
                        onChange={(e) => setData({ ...data, contact: e.target.value })}
                        required
                    />
                </div>


                <div className="col-md-6">
                    <label className="mt-2" htmlFor="birthday">Birthday</label>
                    <input type="date"
                        value={data.birthday}
                        className="form-control"
                        id="birthday"
                        onChange={(e) => setData({ ...data, birthday: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="mt-2" htmlFor="gender">Gender</label>
                    <select
                        className="form-select"
                        id="gender"

                        required
                        value={data.gender}
                        onChange={(e) => setData({ ...data, gender: e.target.value })}
                    >
                        <option value="" disabled defaultValue hidden>Choose...</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
            </form>
            <div className="searchbuttonsection">
                <input type="submit" className="btn btn-dark" value="Search" />
            </div>
        </div>
        </div>
    );
}

export default SearchToUpdate;