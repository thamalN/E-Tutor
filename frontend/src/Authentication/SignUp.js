import { Hidden } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import '../Resources/signUp.css'

const SignUp = () => {

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



    useEffect(() => {
        if (data.password.length !== 0) {
            if (data.password === data.confirmPassword) {
                document.getElementById('pass').innerHTML = '(Passwords match!)';
                document.getElementById('pass').style.color = "green";
            } else {
                document.getElementById('pass').innerHTML = '(Passwords do not match!)';
                document.getElementById('pass').style.color = "red";

            }
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();


        const url = "http://localhost:3001/signUp"

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setId(data);
                alert("Registration Successful!")
                history.push("/signIn")
            })
    }

    return (

        <main className="form-signup">

            {/* <img className="mb-4" src="logo_icon.png" alt="" width="72" height="72" /> */}
            <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
            <form onSubmit={handleSubmit} className="row g-3 authForm">


                <div className="col-md-6">
                    <label htmlFor="firstName" className="mt-2">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={data.firstname}
                        onChange={(e) => setData({ ...data, firstname: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="lastName" className="mt-2">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={data.lastname}
                        onChange={(e) => setData({ ...data, lastname: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="userName" className="mt-2">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="password" className="mt-2">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={data.passowrd}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="confirmPassword" className="mt-2">Confirm Password</label>
                    <span id="pass" style={{ "margin-left": 50, fontSize:12 }}></span>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmpassword"
                        value={data.confirmPassword}
                        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                        required
                    />

                </div>

                <div className="col-md-8">
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

                <div className="col-md-4">
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

                <div className="col-12">
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

                <div className="col-md-2">
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

                <div className="col-md-3">
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

                <div className="col-md-3">
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

                <div className="col-md-4">
                    <label className="mt-2" htmlFor="province">Province</label>
                    <select
                        className="form-control"
                        id="province"
                        placeholder="Choose..."
                        value={data.province}
                        onChange={(e) => setData({ ...data, province: e.target.value })}
                        required
                    >
                        <option>Choose...</option>
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


                <div className="col-12">
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

                <div className="col-md-5">
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


                <div className="col-md-4">
                    <label className="mt-2" htmlFor="birthday">Birthday</label>
                    <input type="date"
                        value={data.birthday}
                        className="form-control"
                        id="birthday"
                        onChange={(e) => setData({ ...data, birthday: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-3">
                    <label className="mt-2" htmlFor="gender">Gender</label>
                    <select
                        className="form-control"
                        id="gender"
                        placeholder="Choose..."
                        required
                        value={data.gender}
                        onChange={(e) => setData({ ...data, gender: e.target.value })}
                    >
                        <option>Choose...</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>



                <div className="col-12">
                    <div className="form-check mt-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="gridCheck"
                            required
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                            I agree to the Terms and Conditions
                        </label>
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <input type="submit" className="btn btn-dark" value="Create Account" />
                </div>
            </form>


        </main>

    );
}

export default SignUp;