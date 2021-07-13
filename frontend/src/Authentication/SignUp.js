import { useState } from "react";

import '../Resources/signUp.css'

const SignUp = () => {

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
            gender: ""
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "/"

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
            })
    }

    console.log(id);

    return (

        <div className="form-signup">

            {/* <img className="mb-4" src="logo_icon.png" alt="" width="72" height="72" /> */}
            <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
            <form onSubmit={handleSubmit} className="row g-3">


                <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
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
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={data.lastname}
                        onChange={(e) => setData({ ...data, lastname: e.target.value })}
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
                        <option selected>Choose...</option>
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
                        <option selected>Choose...</option>
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
                    <input type="submit" class="btn btn-dark" value="Sign Up" />
                </div>
            </form>


        </div>

    );
}

export default SignUp;