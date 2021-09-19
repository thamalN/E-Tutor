import { Hidden } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import{ yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

import '../Resources/signUp.css'



const SignUp = () => {

    const history = useHistory()

    const [id, setId] = useState(null);
    const [userData, setUserData] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    let flag;
    let heading;
    if (user === null) {
        flag = 0
        heading = "Sign Up"
    }
    else {
        flag = 1
        heading = "Create Student Account"
    }

    const [data, setData] = useState(
        {
            user_type: flag,
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
    // console.log(data.user_type)



    const url = "http://localhost:3001/getAllUsernames"
    useEffect(() => {

        fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data)
                setUserData(data)
            })

    }, [url])

    const [submitState, setsubmitState] = useState(true);

    var contact = new RegExp(/^[a-z\d]{5,12}$/i);
    var mail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    useEffect(() => {
        if (data.username.length !== 0) {
            if (userData.some(i => i.username === data.username)) {
                document.getElementById('usern').innerHTML = '(Username is already taken!)';
                document.getElementById('usern').style.color = "red";
            }
            else if (!RegExp(contact).test(data.username)) {
                document.getElementById('usern').innerHTML = '(Username can only contain letters & digits and must contain 5 - 12 characters)';
                document.getElementById('usern').style.color = "red";
            } else {
                document.getElementById('usern').innerHTML = '(Username is available!)';
                document.getElementById('usern').style.color = "green";
            }
        }
    })

    useEffect(() => {
        if (data.email.length !== 0) {
            if (userData.some(i => i.email === data.email)) {
                document.getElementById('email').innerHTML = '(Email is already in use!)';
                document.getElementById('email').style.color = "red";
            }
            else if (!RegExp(mail).test(data.email)) {
                document.getElementById('usern').innerHTML = '(Email is not valid!)';
                document.getElementById('usern').style.color = "red";
            } else {
                document.getElementById('email').innerHTML = '(Email is available!)';
                document.getElementById('email').style.color = "green";
            }
        }
    })


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

    useEffect(() => {
        if (RegExp(/^[a-z ,.'-]+$/i).test(data.firstname) &&
            RegExp(/^[a-z ,.'-]+$/i).test(data.lastname) &&
            RegExp(/^[a-z 0-9,.'-\/]+$/i).test(data.street_no) &&
            RegExp(/^[a-z 0-9,.'-\/]+$/i).test(data.street) &&
            RegExp(/^[a-z 0-9,.'-\/]+$/i).test(data.city) &&
            RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(data.email) &&
            RegExp(/^\d{10}$/).test(data.contact) &&
            RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).test(data.password) &&
            RegExp(/^[a-z 0-9,.'-]+$/i).test(data.school) &&
            RegExp(/^\d{10}$/).test(data.guardian_contact)) {
            document.getElementById('button').disabled = false;
        } else {
            document.getElementById('button').disabled = true;
        }
    })

    const patterns = {
        firstName: /^[a-z ,.'-]+$/i,
        lastName: /^[a-z ,.'-]+$/i,
        streetNo: /^[a-z 0-9,.'-\/]+$/i,
        streetName: /^[a-z 0-9,.'-\/]+$/i,
        city: /^[a-z 0-9,.'-\/]+$/i,
        // province: ,
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        contact: /^\d{10}$/,
        // birthday: ,
        // gender: ,
        // username: /^[a-z\d]{5,12}$/i,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        // confirmPassword: ,
        school: /^[a-z 0-9,.'-]+$/i,
        // grade: ,
        guardianContact: /^\d{10}$/,
    };




    function validate(field, regex) {
        if (RegExp(regex).test(field.value)) {
            document.getElementById(field.name).innerHTML = 'Valid';
            document.getElementById(field.name).style.color = "green";
        } else if (RegExp(/^$/).test(field.value)) {
            document.getElementById(field.name).innerHTML = 'Required';
            document.getElementById(field.name).style.color = "red";
        } else if (field.name == "firstName") {
            document.getElementById(field.name).innerHTML = 'First Name is not valid!';
            document.getElementById(field.name).style.color = "red";
        } else if (field.name == "lastName") {
            document.getElementById(field.name).innerHTML = 'Last Name is not valid!';
            document.getElementById(field.name).style.color = "red";
        } else if (field.name == "streetNo") {
            document.getElementById(field.name).innerHTML = 'Street No. is not valid!';
            document.getElementById(field.name).style.color = "red";
        } else if (field.name == "streetName") {
            document.getElementById(field.name).innerHTML = 'Street Name is not valid!';
            document.getElementById(field.name).style.color = "red";
        } else if (field.name == "city") {
            document.getElementById(field.name).innerHTML = 'City is not valid!';
            document.getElementById(field.name).style.color = "red";
        } else if (field.name == "email") {
            document.getElementById(field.name).innerHTML = 'Email is not valid!';
            document.getElementById(field.name).style.color = "red";
        } else if (field.name == "contact") {
            document.getElementById(field.name).innerHTML = 'Contact should be 10 numbers (eg:0123456789)';
            document.getElementById(field.name).style.color = "red";
        } else if (field.name == "password") {
            document.getElementById(field.name).innerHTML = 'Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!';
            document.getElementById(field.name).style.color = "red";
        } else if (field.name == "school") {
            document.getElementById(field.name).innerHTML = 'School is not valid!';
            document.getElementById(field.name).style.color = "red";
        } else if (field.name == "guardianContact") {
            document.getElementById(field.name).innerHTML = 'Guardian Contact should be 10 numbers (eg:0123456789)';
            document.getElementById(field.name).style.color = "red";
        } else {
            document.getElementById(field.name).innerHTML = 'invalid';
            document.getElementById(field.name).style.color = "red";
        }
    }


    const handleChange = (e) => {
        validate(e.target, patterns[e.target.attributes.name.value]);
    };

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
                if (flag === 0) {
                    alert("Registration Successful!")
                    history.push("/signIn")
                }
                else {
                    alert("Successfully created the Student Account and emailed the user credentials!")
                    history.push("/adminHome/registrations")
                }
            })
    }

    // const { register , formState: { errors } } = useForm({
    //     resolver:yupResolver(schema),
    // });

    return (

        <main className="form-signup">

            {/* <img className="mb-4" src="logo_icon.png" alt="" width="72" height="72" /> */}
            <h1 className="h3 mb-3 fw-normal">{heading}</h1>
            <form onSubmit={handleSubmit} className="row g-3 ">


                <div className="col-md-6">
                    <label htmlFor="firstName" className="mt-2">First Name</label>
                    <span id="firstName" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={data.firstname}
                        // {...register("firstName")}
                        onChange={(e) => { setData({ ...data, firstname: e.target.value }); handleChange(e) }}
                    // required
                    />
                    {/* <p>{ errors.firstName?.message }</p> */}
                </div>

                <div className="col-md-6">
                    <label htmlFor="lastName" className="mt-2">Last Name</label>
                    <span id="lastName" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={data.lastname}
                        // {...register("lastName")}
                        onChange={(e) => { setData({ ...data, lastname: e.target.value }); handleChange(e) }}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="userName" className="mt-2">Username</label>
                    <span id="usern" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <span id="userName" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        value={data.username}
                        // {...register("userName")}
                        onChange={(e) => { setData({ ...data, username: e.target.value }) }}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="password" className="mt-2">Password</label>
                    <span id="password" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={data.passowrd}
                        // {...register("password")}
                        onChange={(e) => { setData({ ...data, password: e.target.value }); handleChange(e) }}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="confirmPassword" className="mt-2">Confirm Password</label>
                    <span id="pass" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        // {...register("confirmPassword")}
                        onChange={(e) => { setData({ ...data, confirmPassword: e.target.value }) }}
                        required
                    />

                </div>

                <div className="col-md-8">
                    <label className="mt-2" htmlFor="school" >School</label>
                    <span id="school" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="school"
                        name="school"
                        value={data.school}
                        // {...register("school")}
                        onChange={(e) => { setData({ ...data, school: e.target.value }); handleChange(e) }}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label className="mt-2" htmlFor="grade" >Grade</label>
                    <input
                        type="text"
                        className="form-control"
                        id="grade"
                        name="grade"
                        value={data.grade}
                        // {...register("grade")}
                        onChange={(e) => setData({ ...data, grade: e.target.value })}
                        required
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="guardianContact" className="mt-2">Guardian's Contact</label>
                    <span id="guardianContact" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="guardianContact"
                        name="guardianContact"
                        value={data.guardian_contact}
                        // {...register("guardianContact")}
                        onChange={(e) => { setData({ ...data, guardian_contact: e.target.value }); handleChange(e) }}
                        required
                    />
                </div>

                <div className="col-md-2">
                    <label className="mt-2" htmlFor="streetNo">Street No</label>
                    <span id="streetNo" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="streetNo"
                        name="streetNo"
                        value={data.street_no}
                        // {...register("streetNo")}
                        onChange={(e) => { setData({ ...data, street_no: e.target.value }); handleChange(e) }}
                        required
                    />
                </div>

                <div className="col-md-3">
                    <label className="mt-2" htmlFor="streetName">Street</label>
                    <span id="streetName" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="streetName"
                        name="streetName"
                        value={data.street}
                        // {...register("streetName")}
                        onChange={(e) => { setData({ ...data, street: e.target.value }); handleChange(e) }}
                        required
                    />
                </div>

                <div className="col-md-3">
                    <label className="mt-2" htmlFor="city">City</label>
                    <span id="city" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={data.city}
                        // {...register("city")}
                        onChange={(e) => { setData({ ...data, city: e.target.value }); handleChange(e) }}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label className="mt-2" htmlFor="province">Province</label>
                    <select
                        className="form-control"
                        id="province"
                        name="province"
                        placeholder="Choose..."
                        value={data.province}
                        // {...register("province")}
                        onChange={(e) => setData({ ...data, province: e.target.value })}
                        required
                    >
                        <option value="">Choose...</option>
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
                    <span id="email" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={data.email}
                        // {...register("email")}
                        onChange={(e) => { setData({ ...data, email: e.target.value }); handleChange(e) }}
                        required
                    />
                </div>

                <div className="col-md-5">
                    <label className="mt-2" htmlFor="contact">Contact</label>
                    <span id="contact" style={{ "marginLeft": 50, fontSize: 12 }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="contact"
                        name="contact"
                        value={data.contact}
                        // {...register("contact")}
                        onChange={(e) => { setData({ ...data, contact: e.target.value }); handleChange(e) }}
                        required
                    />
                </div>


                <div className="col-md-4">
                    <label className="mt-2" htmlFor="birthday">Birthday</label>
                    <input type="date"
                        value={data.birthday}
                        className="form-control"
                        id="birthday"
                        name="birthday"
                        // {...register("birthday")}
                        onChange={(e) => setData({ ...data, birthday: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-3">
                    <label className="mt-2" htmlFor="gender">Gender</label>
                    <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        placeholder="Choose..."
                        required
                        value={data.gender}
                        // {...register("gender")}
                        onChange={(e) => setData({ ...data, gender: e.target.value })}
                    >
                        <option value="">Choose...</option>
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
                            name="gridcheck"
                            required
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                            I agree to the <Link to="/termsAndConditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</Link>
                        </label>
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <button id="button" type="submit" className="btn btn-lg btn-dark add-btn">
                        Create Account
                    </button>
                </div>
            </form>


        </main>

    );
}

export default SignUp;