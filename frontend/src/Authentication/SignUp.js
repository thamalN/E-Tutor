import { useState } from "react";

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

            <div className="authForm">
                <form onSubmit={handleSubmit}>
                    <div className="nameRow">
                        <div>
                            <label>First Name</label>
                            <input
                                type="text"
                                value={data.firstname}
                                onChange={(e) => setData({ ...data, firstname: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label>Last Name</label>
                            <input type="text"
                                value={data.lastname}
                                onChange={(e) => setData({ ...data, lastname: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="addressRow">
                        <div>
                            <label>Street No</label>
                            <input type="text"
                                value={data.street_no}
                                onChange={(e) => setData({ ...data, street_no: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label>Street</label>
                            <input type="text"
                                value={data.street}
                                onChange={(e) => setData({ ...data, street: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label>City</label>
                            <input type="text"
                                value={data.city}
                                onChange={(e) => setData({ ...data, city: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label>Province</label>
                            <input type="text"
                                value={data.province}
                                onChange={(e) => setData({ ...data, province: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="nameRow">
                        <div>
                            <label>Email</label>
                            <input type="text"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label>Contact</label>
                            <input type="text"
                                value={data.contact}
                                onChange={(e) => setData({ ...data, contact: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="selectors">
                        <div>
                            <label>Birthday</label>
                            <input type="date"
                                value={data.birthday}
                                onChange={(e) => setData({ ...data, birthday: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label>Gender</label>
                            <select
                                value={data.gender}
                                onChange={(e) => setData({ ...data, gender: e.target.value })}
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>

                    <input type="submit" value="SIGN UP" />
                </form>
            </div>

    );
}

export default SignUp;