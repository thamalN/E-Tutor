import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Sidebar from "./Sidebar";
import bcrypt from "bcryptjs"
import Valid from '@material-ui/icons/CheckCircle';
import Invalid from '@material-ui/icons/Cancel';
import PassOn from '@material-ui/icons/Visibility';
import PassOff from '@material-ui/icons/VisibilityOff';

const EditProfile = () => {
    const history = useHistory()

    const [data, setData] = useState(JSON.parse(localStorage.getItem("userInfo")))
    const [usernames, setUsernames] = useState([]);

    const [valids, setValids] = useState({
        FirstName: true,
        LastName: true,
        StreetNo: true,
        StreetName: true,
        City: true,
        Email: true,
        Contact: true,
        Password: true,
        School: true,
        GuardianContact: true,
        NIC: true,
    })

    const usersUrl = "http://localhost:3001/getOtherUsernames/" + data.user_id

    useEffect(() => {

        fetch(usersUrl)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setUsernames(data)
            })
    }, [])

    var username = new RegExp(/^[a-z\d]{5,12}$/i);
    var pass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

    var usernameValid, newpassValid = true

    useEffect(() => {
        if (data.username && data.username.length !== 0) {
            if (usernames.some(i => i.username === data.username)) {
                document.getElementById('usern').innerHTML = '(Username is already taken!)';
                document.getElementById('usern').style.color = "red";
                usernameValid = false
            } else if (!RegExp(username).test(data.username)) {
                document.getElementById('usern').innerHTML = '(Username can only contain letters & digits and must contain 5 - 12 characters)';
                document.getElementById('usern').style.color = "red";
                usernameValid = false
            } else {
                document.getElementById('usern').innerHTML = '(Username is available!)';
                document.getElementById('usern').style.color = "green";
                usernameValid = true
            }
        }
    })

    useEffect(() => {
        if (data.newPassword && data.newPassword.length !== 0) {
            if (data.newPassword === data.confirmPassword) {
                document.getElementById('new_password').innerHTML = '(Passwords match!)';
                document.getElementById('new_password').style.color = "green";

                if(!RegExp(pass).test(data.newPassword)) {
                    document.getElementById("new_password").innerHTML = 'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!';
                    document.getElementById("new_password").style.color = "red";
                } else {
                    newpassValid = true
                }

            } else {
                document.getElementById('new_password').innerHTML = '(Passwords do not match!)';
                document.getElementById('new_password').style.color = "red";
                newpassValid = false
            }
        }
    })

    useEffect(() => {
        if (data.oldPassword && data.oldPassword.length !== 0) {

            bcrypt.compare(data.oldPassword, data.password, (error, response) => {
                if (response) {
                    document.getElementById('old_password').innerHTML = '(Correct Password!)';
                    document.getElementById('old_password').style.color = "green";

                } else {
                    document.getElementById('old_password').innerHTML = '(Incorrect Password!)';
                    document.getElementById('old_password').style.color = "red";
                }
            })
        }
    })

    useEffect(() => {
        const passwords = document.getElementById("change-password")
        const changePass = passwords.classList.contains("show-change-password")
        
        const allValid = Object.values(valids).every(i => i)

        if (allValid && usernameValid && newpassValid)
            document.getElementById('button').disabled = false;
        else
            document.getElementById('button').disabled = true;
    })

    // useEffect(() => {

    //     if (RegExp(/^[a-z ,.'-]+$/i).test(data.fname) && RegExp(/^[a-z ,.'-]+$/i).test(data.lname) &&
    //         RegExp(/^[a-z 0-9,.'-\/]+$/i).test(data.street_no) && RegExp(/^[a-z 0-9,.'-\/]+$/i).test(data.street) &&
    //         RegExp(/^[a-z 0-9,.'-\/]+$/i).test(data.city) && RegExp(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/).test(data.email) &&
    //         RegExp(/^\d{10}$/).test(data.contact) && usernameValid) {

    //         if ((data.user_flag === 1 && RegExp(/^\d{10}$/).test(data.nic)) ||
    //             (data.user_flag === 2 && RegExp(/^\d{10}$/).test(data.nic)) ||
    //             (data.user_flag === 3 && RegExp(/^\d{10}[V]$/).test(data.nic) && RegExp(/^[a-z 0-9,.'-]+$/i).test(data.school)) ||
    //             (data.user_flag === 4 && RegExp(/^\d{10}$/).test(data.guardian_contact) && RegExp(/^[a-z 0-9,.'-]+$/i).test(data.school))) {
    //             document.getElementById('button').disabled = false;
    //         } else {
    //             document.getElementById('button').disabled = true;
    //         }
    //     } else {
    //         document.getElementById('button').disabled = true;
    //     }
    // })

    const patterns = {
        FirstName: /^[a-z ,.'-]+$/i,
        LastName: /^[a-z ,.'-]+$/i,
        StreetNo: /^[a-z 0-9,.'-\/]+$/i,
        StreetName: /^[a-z 0-9,.'-\/]+$/i,
        City: /^[a-z 0-9,.'-\/]+$/i,
        Email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        Contact: /^\d{10}$/,
        Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        School: /^[a-z 0-9,.'-]+$/i,
        GuardianContact: /^\d{10}$/,
        NIC: /^\d{10}[V]$/,
    };

    function validate(field, regex) {
        const valid = document.getElementById(field.id + "-valid")
        const invalid = document.getElementById(field.id + "-invalid")

        const fieldName = Object.keys(valids).find(i => i === field.name)

        if (RegExp(regex).test(field.value)) {
            valid.style.display = "inline"
            invalid.style.display = "none"

            setValids({ ...valids, [fieldName]: true })

        } else {
            valid.style.display = "none"
            invalid.style.display = "inline"

            setValids({ ...valids, [fieldName]: false })
        }
    }

    const handleChange = (e) => {
        validate(e.target, patterns[e.target.attributes.name.value]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data)

        const url = "http://localhost:3001/editProfile/"

        const values = {
            user_id: data.user_id,
            user_flag: data.user_flag,
            fname: data.fname,
            lname: data.lname,
            street_no: data.street_no,
            street: data.street,
            city: data.city,
            province: data.province,
            email: data.email,
            contact: data.contact,
            birthday: data.birthday,
            gender: data.gender,
            username: data.username,
            password: data.newPassword,

            nic: data.nic,
            school: data.school,
            qualifications: data.qualifications,
        }

       // console.log(values)

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }).then(
            history.goBack()
        )
    }

    const togglePassword = () => {
        const passwords = document.getElementById("change-password")
        passwords.classList.toggle("show-change-password")
        passwords.classList.toggle("hide-change-password")

        const inputs = passwords.querySelectorAll("input")

        if (passwords.classList.contains("hide-change-password")) {
            inputs.forEach(input => {
                input.required = false
            })
        } else {
            inputs.forEach(input => {
                input.required = true
            })
        }

    }

    const togglePass = (e) => {
        console.log(e.target)
    }


    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="form-signup">
                    <h1 className="h3 mb-3 fw-normal">Edit Details</h1>
                    <form className="row g-3 " onSubmit={handleSubmit}>


                        <div className="col-md-6">
                            <label htmlFor="firstName" className="mt-2">First Name</label>
                            <Valid fontSize="small" className="valid" id="firstName-valid" style={{ display: "none" }} />
                            <Invalid fontSize="small" className="invalid" id="firstName-invalid" style={{ display: "none" }} />
                            {/* <span id="firstName" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                            <input
                                type="text"
                                className="form-control"
                                name="FirstName"
                                id="firstName"
                                value={data.fname}
                                onChange={(e) => { setData({ ...data, fname: e.target.value }); handleChange(e); }}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="lastName" className="mt-2">Last Name</label>
                            <Valid fontSize="small" className="valid" id="lastName-valid" style={{ display: "none" }} />
                            <Invalid fontSize="small" className="invalid" id="lastName-invalid" style={{ display: "none" }} />
                            {/* <span id="lastName" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                            <input
                                type="text"
                                className="form-control"
                                name="LastName"
                                id="lastName"
                                value={data.lname}
                                onChange={(e) => { setData({ ...data, lname: e.target.value }); handleChange(e) }}
                                required
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="mt-2" htmlFor="streetNo">Street No</label>
                            <Valid fontSize="small" className="valid" id="streetNo-valid" style={{ display: "none" }} />
                            <Invalid fontSize="small" className="invalid" id="streetNo-invalid" style={{ display: "none" }} />
                            {/* <span id="streetNo" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                            <input
                                type="text"
                                className="form-control"
                                name="StreetNo"
                                id="streetNo"
                                value={data.street_no}
                                onChange={(e) => { setData({ ...data, street_no: e.target.value }); handleChange(e) }}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="mt-2" htmlFor="streetName">Street</label>
                            <Valid fontSize="small" className="valid" id="streetName-valid" style={{ display: "none" }} />
                            <Invalid fontSize="small" className="invalid" id="streetName-invalid" style={{ display: "none" }} />
                            {/* <span id="streetName" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                            <input
                                type="text"
                                className="form-control"
                                name="StreetName"
                                id="streetName"
                                value={data.street}
                                onChange={(e) => { setData({ ...data, street: e.target.value }); handleChange(e) }}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="mt-2" htmlFor="city">City</label>
                            <Valid fontSize="small" className="valid" id="city-valid" style={{ display: "none" }} />
                            <Invalid fontSize="small" className="invalid" id="city-invalid" style={{ display: "none" }} />
                            {/* <span id="city" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                            <input
                                type="text"
                                className="form-control"
                                name="City"
                                id="city"
                                value={data.city}
                                onChange={(e) => { setData({ ...data, city: e.target.value }); handleChange(e) }}
                                required
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="mt-2" htmlFor="province">Province</label>
                            <select
                                className="form-control"
                                name="Province"
                                id="province"
                                placeholder="Choose..."
                                value={data.province}
                                onChange={(e) => setData({ ...data, province: e.target.value })}
                                required
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
                            <Valid fontSize="small" className="valid" id="email-valid" style={{ display: "none" }} />
                            <Invalid fontSize="small" className="invalid" id="email-invalid" style={{ display: "none" }} />
                            {/* <span id="email" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                            <input
                                type="text"
                                className="form-control"
                                name="Email"
                                id="email"
                                value={data.email}
                                onChange={(e) => { setData({ ...data, email: e.target.value }); handleChange(e) }}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="mt-2" htmlFor="contact">Contact</label>
                            <Valid fontSize="small" className="valid" id="contact-valid" style={{ display: "none" }} />
                            <Invalid fontSize="small" className="invalid" id="contact-invalid" style={{ display: "none" }} />
                            {/* <span id="contact" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                            <input
                                type="text"
                                className="form-control"
                                name="Contact"
                                id="contact"
                                value={data.contact}
                                onChange={(e) => { setData({ ...data, contact: e.target.value }); handleChange(e) }}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="mt-2" htmlFor="birthday">Birthday</label>
                            <input type="date"
                                value={data.birthday}
                                className="form-control"
                                name="Birthday"
                                id="birthday"
                                onChange={(e) => setData({ ...data, birthday: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="mt-2" htmlFor="gender">Gender</label>
                            <select
                                className="form-control"
                                name="Gender"
                                id="gender"
                                required
                                value={data.gender}
                                onChange={(e) => setData({ ...data, gender: e.target.value })}
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
                                name="RegDate"
                                id="regDate"
                                onChange={(e) => setData({ ...data, regDate: e.target.value })}
                                disabled
                            />
                        </div>

                        {data.user_flag === 1 && (
                            <div>
                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="nic" >NIC</label>
                                    <Valid fontSize="small" className="valid" id="nic-valid" style={{ display: "none" }} />
                                    <Invalid fontSize="small" className="invalid" id="nic-invalid" style={{ display: "none" }} />
                                    {/* <span id="firstName" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="NIC"
                                        id="nic"
                                        value={data.nic}
                                        onChange={(e) => { setData({ ...data, nic: e.target.value }); handleChange(e) }}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="joined_date" >Joined Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="joined_date"
                                        id="joined_date"
                                        value={data.joined_date}
                                        onChange={(e) => setData({ ...data, joined_date: e.target.value })}
                                        disabled
                                    />
                                </div>
                            </div>
                        )}

                        {data.user_flag === 2 && (
                            <div>
                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="nic" >NIC</label>
                                    <Valid fontSize="small" className="valid" id="nic-valid" style={{ display: "none" }} />
                                    <Invalid fontSize="small" className="invalid" id="nic-invalid" style={{ display: "none" }} />
                                    {/* <span id="nic" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="NIC"
                                        id="nic"
                                        value={data.nic}
                                        onChange={(e) => { setData({ ...data, nic: e.target.value }); handleChange(e) }}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="joined_date" >Joined Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="joined_date"
                                        id="joined_date"
                                        value={data.joined_date}
                                        onChange={(e) => setData({ ...data, joined_date: e.target.value })}
                                        disabled
                                    />
                                </div>
                            </div>
                        )}

                        {data.user_flag == 3 && (
                            <>
                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="nic" >NIC</label>
                                    <Valid fontSize="small" className="valid" id="nic-valid" style={{ display: "none" }} />
                                    <Invalid fontSize="small" className="invalid" id="nic-invalid" style={{ display: "none" }} />
                                    {/* <span id="nic" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="NIC"
                                        id="nic"
                                        value={data.nic}
                                        onChange={(e) => { setData({ ...data, nic: e.target.value }); handleChange(e) }}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="joined_date" >Joined Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="joined_date"
                                        id="joined_date"
                                        value={data.joined_date}
                                        onChange={(e) => setData({ ...data, joined_date: e.target.value })}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="school" >School</label>
                                    <Valid fontSize="small" className="valid" id="school-valid" style={{ display: "none" }} />
                                    <Invalid fontSize="small" className="invalid" id="school-invalid" style={{ display: "none" }} />
                                    {/* <span id="school" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="School"
                                        id="school"
                                        value={data.school}
                                        onChange={(e) => { setData({ ...data, school: e.target.value }); handleChange(e) }}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="mt-2" htmlFor="qualifications" >Qualifications</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="qualifications"
                                        id="qualifications"
                                        value={data.qualifications}
                                        onChange={(e) => setData({ ...data, qualifications: e.target.value })}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {data.user_flag === 4 && (
                            <div>
                                <div className="col-md-8">
                                    <label className="mt-2" htmlFor="school" >School</label>
                                    <Valid fontSize="small" className="valid" id="school-valid" style={{ display: "none" }} />
                                    <Invalid fontSize="small" className="invalid" id="school-invalid" style={{ display: "none" }} />
                                    {/* <span id="school" style={{ "marginLeft": 50, fontSize: 12 }}></span> */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="School"
                                        id="school"
                                        value={data.school}
                                        onChange={(e) => { setData({ ...data, school: e.target.value }); handleChange(e) }}
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="mt-2" htmlFor="grade" >Grade</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="grade"
                                        id="grade"
                                        value={data.grade}
                                        onChange={(e) => setData({ ...data, grade: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="guardianContact" className="mt-2">Guardian's Contact</label>
                                    <Valid fontSize="small" className="valid" id="guardianContact-valid" style={{ display: "none" }} />
                                    <Invalid fontSize="small" className="invalid" id="guardianContact-invalid" style={{ display: "none" }} />
                                    <span id="guardianContact" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="guardianContact"
                                        id="guardianContact"
                                        value={data.guardian_contact}
                                        onChange={(e) => { setData({ ...data, guardian_contact: e.target.value }); handleChange(e) }}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="col-md-12">
                            <label htmlFor="userName" className="mt-2">Username</label>
                            <span id="usern" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                            <input
                                type="text"
                                className="form-control"
                                name="userName"
                                id="userName"
                                value={data.username}
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-12">

                            <input type="button" className="btn btn-dark add-btn" value="Change Password" onClick={togglePassword} />

                        </div>

                        <div id="change-password" className="hide-change-password">
                            <div style={{ flex: "0 0 30%" }}>
                                <label htmlFor="oldPassword" className="mt-2">Old Password</label>
                                <span id="old_password" style={{ "marginLeft": 50, fontSize: 12 }}></span>

                                <div className="passToggle">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="oldPassword"
                                        id="old_password"
                                        value={data.oldPassowrd}
                                        onChange={(e) => setData({ ...data, oldPassword: e.target.value })}
                                        
                                    />
                                    {/* <PassOn />
                                    <PassOff /> */}
                                </div>
                            </div>

                            <div style={{ flex: "0 0 30%" }}>
                                <label htmlFor="newPassword" className="mt-2">New Password</label>
                                <Valid fontSize="small" className="valid" id="new_password-valid" style={{ display: "none" }} />
                                <Invalid fontSize="small" className="invalid" id="new_password-invalid" style={{ display: "none" }} />
                                <span id="new_password" style={{ "marginLeft": 50, fontSize: 12 }}></span>

                                <div className="passToggle">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="Password"
                                        id="new_password"
                                        value={data.newPassword}
                                        onChange={(e) => { setData({ ...data, newPassword: e.target.value }); handleChange(e) }}
                                        
                                    />
                                    {/* <PassOn />
                                    <PassOff /> */}
                                </div>
                            </div>

                            <div style={{ flex: "0 0 30%" }}>
                                <label htmlFor="confirmPassword" className="mt-2">Confirm Password</label>
                                <Valid fontSize="small" className="valid" id="confirm_password-valid" style={{ display: "none" }} />
                                <Invalid fontSize="small" className="invalid" id="confirm_password-invalid" style={{ display: "none" }} />
                                <span id="confirm_password" style={{ "marginLeft": 50, fontSize: 12 }}></span>

                                <div className="passToggle">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="Password"
                                        id="confirm_password"
                                        value={data.confirmPassword}
                                        onChange={(e) => { setData({ ...data, confirmPassword: e.target.value }); handleChange(e) }}
                                        
                                    />
                                    {/* <PassOn />
                                    <PassOff /> */}
                                </div>
                            </div>
                        </div>

                        <input id="button" type="submit" className="btn btn-dark add-btn col-12" value="Save" />

                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;