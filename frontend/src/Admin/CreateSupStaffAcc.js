import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Valid from '@material-ui/icons/CheckCircle';
import Invalid from '@material-ui/icons/Cancel';
import Sidebar from "../Sidebar";
const CreateSupStaffAcc = () => {
    const history = useHistory()

    const [id, setId] = useState(null);
    const [userData, setUserData] = useState([]);

    const [data, setData] = useState({
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
        nic: "",
        joined_date: "",
        username: "",
        password: "",
        confirmPassword: ""
        }
    );

    const [valids, setValids] = useState({
        FirstName: false,
        LastName: false,
        StreetNo: false,
        StreetName: false,
        City: false,
        Contact: false,
        NIC: false,
    })

    const url = "http://localhost:3001/getAllUsernames"
    useEffect(() => {

        fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setUserData(data)
            })

    }, [url])

    var username = new RegExp(/^[a-z\d]{5,12}$/i);
    var mail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var pass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    var usernameValid, emailValid, passValid

    useEffect(() => {
        if (data.username.length !== 0) {
            const valid = document.getElementById("userName-valid")
            const invalid = document.getElementById("userName-invalid")

        if (userData.some(i =>i.username === data.username)) {
            document.getElementById('usern').innerHTML = '(Username is already taken!)';
            document.getElementById('usern').style.color = "red";

            valid.style.display = "none"
            invalid.style.display = "inline"
            usernameValid = false
                  
        }
        else if (!RegExp(username).test(data.username)) {
            document.getElementById('usern').innerHTML = '(Username can only contain letters & digits and must contain 5 - 12 characters)';
            document.getElementById('usern').style.color = "red";

            valid.style.display = "none"
            invalid.style.display = "inline"
            usernameValid = false
        } 
        else{
            document.getElementById('usern').innerHTML = '(Username is available!)';
            document.getElementById('usern').style.color = "green";
            valid.style.display = "inline"
            invalid.style.display = "none"
            usernameValid = true
        }
    }
    

    
        if (data.email.length !== 0) {
            const valid = document.getElementById("email-valid")
            const invalid = document.getElementById("email-invalid")

            if (userData.some(i => i.email === data.email)) {
                document.getElementById('email').innerHTML = '(Email is already in use!)';
                document.getElementById('email').style.color = "red";
                
                valid.style.display = "none"
                invalid.style.display = "inline"
                emailValid = false
            }
            else if (!RegExp(mail).test(data.email)) {
                document.getElementById('email').innerHTML = '(Email is not valid!)';
                document.getElementById('email').style.color = "red";
                valid.style.display = "none"
                invalid.style.display = "inline"
                emailValid = false
            } else {
                document.getElementById('email').innerHTML = '(Email is available!)';
                document.getElementById('email').style.color = "green";
                
                valid.style.display = "inline"
                invalid.style.display = "none"
                emailValid = true
            }
        }
    

    
        if (data.password.length !== 0) {

            if (!RegExp(pass).test(data.password)) {
                document.getElementById("pass").innerHTML = 'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!';
                document.getElementById("pass").style.color = "red";
                passValid = false

            }
            else{
            if (data.password === data.confirmPassword) {
                document.getElementById('pass').innerHTML = '(Passwords match!)';
                document.getElementById('pass').style.color = "green";
                passValid = true
            } else {
                document.getElementById('pass').innerHTML = '(Passwords do not match!)';
                document.getElementById('pass').style.color = "red";
                passValid = true
            }
            }
        }

        const allValid = Object.values(valids).every(i => i)

            if (allValid && usernameValid && passValid && emailValid)
                document.getElementById('button').disabled = false;
            else
                document.getElementById('button').disabled = true;

    }, [data])

    const patterns = {
        FirstName: /^[a-z ,.'-]+$/i,
        LastName: /^[a-z ,.'-]+$/i,
        StreetNo: /^[a-z 0-9,.'-\/]+$/i,
        StreetName: /^[a-z 0-9,.'-\/]+$/i,
        City: /^[a-z 0-9,.'-\/]+$/i,
        Contact: /^\d{10}$/,
        Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
        
        const url = "http://localhost:3001/createSupStaffAcc"

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setId(data);
            alert("Successfully created the Staff Account and emailed the user credentials!!")
            history.replace("/adminHome/registrations")
        })
    }

   

    return ( 
        <div>
            <Sidebar />
        <div className="homeContent">
        <div className="form-signup">

{/* <img className="mb-4" src="logo_icon.png" alt="" width="72" height="72" /> */}
<h1 className="h3 mb-3 fw-normal">Create new Supporting Staff Account</h1>
<form onSubmit={handleSubmit} className="row g-3">


    <div className="col-md-6">
        <label htmlFor="firstName" className="mt-2">First Name</label>
        <Valid fontSize="small" className="valid" id="firstName-valid" style={{ display: "none" }} />
        <Invalid fontSize="small" className="invalid" id="firstName-invalid" style={{ display: "none" }} />
        <input
            type="text"
            className="form-control"
            id="firstName"
            name="FirstName"
            value={data.firstname}
            onChange={(e) => {setData({ ...data, firstname: e.target.value }); handleChange(e);}}
            required
        />
    </div>

    <div className="col-md-6">
        <label htmlFor="lastName" className="mt-2">Last Name</label>
        <Valid fontSize="small" className="valid" id="lastName-valid" style={{ display: "none" }} />
        <Invalid fontSize="small" className="invalid" id="lastName-invalid" style={{ display: "none" }} />
        <input
            type="text"
            className="form-control"
            id="lastName"
            name="LastName"
            value={data.lastname}
            onChange={(e) => {setData({ ...data, lastname: e.target.value }); handleChange(e);}}
            required
        />
    </div>

    <div className="col-md-4">
        <label htmlFor="userName" className="mt-2">Username</label>
        <Valid fontSize="small" className="valid" id="userName-valid" style={{ display: "none" }} />
        <Invalid fontSize="small" className="invalid" id="userName-invalid" style={{ display: "none" }} />
        <span id="usern" style={{ "marginLeft": 50, fontSize: 12 }}></span>
        
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
        <span id="pass" style={{ "margin-left": 50, fontSize:12 }}></span>
        <input
            type="password"
            className="form-control"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
        />
    </div>

    <div className="col-md-4">
        <label htmlFor="confirmPassword" className="mt-2">Confirm Password</label>
        
        <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            required
        />
    </div>


    


    <div className="col-md-2">
        <label className="mt-2" htmlFor="streetNo">Street No</label>
        <Valid fontSize="small" className="valid" id="streetNo-valid" style={{ display: "none" }} />
        <Invalid fontSize="small" className="invalid" id="streetNo-invalid" style={{ display: "none" }} />
        <input
            type="text"
            className="form-control"
            id="streetNo"
            name="StreetNo"
            value={data.street_no}
            onChange={(e) => {setData({ ...data, street_no: e.target.value }); handleChange(e);}}
            required
        />
    </div>

    <div className="col-md-3">
        <label className="mt-2" htmlFor="streetName">Street</label>
        <Valid fontSize="small" className="valid" id="streetName-valid" style={{ display: "none" }} />
        <Invalid fontSize="small" className="invalid" id="streetName-invalid" style={{ display: "none" }} />
        <input
            type="text"
            className="form-control"
            id="streetName"
            name="StreetName"
            value={data.street}
            onChange={(e) => {setData({ ...data, street: e.target.value }); handleChange(e);}}
            required
        />
    </div>

    <div className="col-md-3">
        <label className="mt-2" htmlFor="city">City</label>
        <Valid fontSize="small" className="valid" id="city-valid" style={{ display: "none" }} />
        <Invalid fontSize="small" className="invalid" id="city-invalid" style={{ display: "none" }} />
        <input
            type="text"
            className="form-control"
            id="city"
            name="City"
            value={data.city}
            onChange={(e) => {setData({ ...data, city: e.target.value }); handleChange(e);}}
            required
        />
    </div>

    <div className="col-md-4">
        <label className="mt-2" htmlFor="province">Province</label>
        <select
            className="form-control"
            id="province"
            name="Province"
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

    <div className="col-md-6">
        <label className="mt-2" htmlFor="nic" >NIC</label>
        <Valid fontSize="small" className="valid" id="nic-valid" style={{ display: "none" }} />
        <Invalid fontSize="small" className="invalid" id="nic-invalid" style={{ display: "none" }} />
        <input
            type="text"
            className="form-control"
            name="NIC"
            id="nic"
            value={data.nic}
            onChange={(e) => {setData({ ...data, nic: e.target.value }); handleChange(e);}}
            required
        />
    </div>


    <div className="col-md-6">
        <label className="mt-2" htmlFor="email">Email</label>
        <Valid fontSize="small" className="valid" id="email-valid" style={{ display: "none" }} />
        <Invalid fontSize="small" className="invalid" id="email-invalid" style={{ display: "none" }} />
        <span id="email" style={{ "marginLeft": 50, fontSize: 12 }}></span>
        <input
            type="text"
            className="form-control"
            id="email"
            name="Email"
            value={data.email}
            onChange={(e) => {setData({ ...data, email: e.target.value }); handleChange(e);}}
            required
        />
    </div>

    <div className="col-md-4">
        <label className="mt-2" htmlFor="joined_date">Joined Date</label>
        <input
            type="date"
            className="form-control"
            id="joined_date"
            value={data.joined_date}
            onChange={(e) => setData({ ...data, joined_date: e.target.value })}
            required
        />
    </div>

    <div className="col-md-4">
        <label className="mt-2" htmlFor="birthday">Birthday</label>
        <input type="date"
            value={data.birthday}
            className="form-control"
            id="birthday"
            name="Birthday"
            onChange={(e) => setData({ ...data, birthday: e.target.value })}
            required
        />
    </div>

    <div className="col-md-4">
        <label className="mt-2" htmlFor="gender">Gender</label>
        <select
            className="form-control"
            id="gender"
            name="Gender"
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

    <div className="col-md-4">
        <label className="mt-2" htmlFor="contact">Contact</label>
        <Valid fontSize="small" className="valid" id="contact-valid" style={{ display: "none" }} />
        <Invalid fontSize="small" className="invalid" id="contact-invalid" style={{ display: "none" }} />
        <input
            type="text"
            className="form-control"
            id="contact"
            name="Contact"
            value={data.contact}
            onChange={(e) => {setData({ ...data, contact: e.target.value }); handleChange(e);}}
            required
        />
    </div>

    

    
    <div className="col-12 mt-4">
        <input id="button" type="submit" className="btn btn-dark" value="Create Account" />
    </div>
</form>
</div>
</div>
</div>
     );
}

export default CreateSupStaffAcc;