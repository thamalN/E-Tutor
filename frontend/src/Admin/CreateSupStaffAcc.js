import { useState, useEffect } from "react";
import { useHistory } from "react-router";
const CreateSupStaffAcc = () => {
    const history = useHistory()

    const [id, setId] = useState(null);
    const [usernames, setUsernames] = useState([]);

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
                setUsernames(data)
            })

    }, [url])

    useEffect(() => {
        if (data.username.length !== 0) {
        if (usernames.some(i =>i.username === data.username)) {
            document.getElementById('usern').innerHTML = '(Username is already taken!)';
            document.getElementById('usern').style.color = "red";
                  
        }
        else{
            document.getElementById('usern').innerHTML = '(Username is available!)';
            document.getElementById('usern').style.color = "green";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const url = "http://localhost:3001/createSupStaffAcc"

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
            history.push("/adminHome/registrations")
        })
    }

   

    return ( 
        <div className="form-signup">

{/* <img className="mb-4" src="logo_icon.png" alt="" width="72" height="72" /> */}
<h1 className="h3 mb-3 fw-normal">Create new Supporting Staff Account</h1>
<form onSubmit={handleSubmit} className="row g-3">


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
        <span id="usern" style={{ "marginLeft": 50, fontSize:12 }}></span>
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
            value={data.password}
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
            id="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
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

    <div className="col-md-4">
        <label className="mt-2" htmlFor="nic" >NIC</label>
        <input
            type="text"
            className="form-control"
            id="nic"
            value={data.nic}
            onChange={(e) => setData({ ...data, nic: e.target.value })}
            required
        />
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

    <div className="col-12">
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

    

    
    <div className="col-12 mt-4">
        <input type="submit" className="btn btn-dark" value="Create Account" />
    </div>
</form>


</div>
     );
}

export default CreateSupStaffAcc;