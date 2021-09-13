// import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Sidebar from "../Sidebar";

const StuFeedback = () => {
    const history = useHistory();

    const [id, setId] = useState(null);

    const [data, setData] = useState({
        username: "",
        coursename: "",
        topic: "",
        description: "",
    });

    // useEffect(() => {
    //     if (data.password.length !== 0) {
    //         if (data.password === data.confirmPassword) {
    //             document.getElementById('pass').innerHTML = '(Passwords match!)';
    //             document.getElementById('pass').style.color = "green";
    //         } else {
    //             document.getElementById('pass').innerHTML = '(Passwords do not match!)';
    //             document.getElementById('pass').style.color = "red";

    //         }
    //     }
    // })

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:3001/stuFeedback";

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setId(data);
                alert("Registration Successful!");
                history.push("/studentHome/myCourses");
            });
    };

    return (
        <div>
            <Sidebar />
            <div className="homeContent">

                <div className="form-signup">

                    {/* <img className="mb-4" src="logo_icon.png" alt="" width="72" height="72" /> */}
                    <h1 className="h3 mb-3 fw-normal">Feedback</h1>
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="username" className="mt-2">
                                User Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={data.username}
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="coursename" className="mt-2">
                                Course name(If feedback related with course)
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="coursename"
                                value={data.coursename}
                                onChange={(e) => setData({ ...data, coursename: e.target.value })}
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="topic" className="mt-2">
                                Topic
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="topic"
                                value={data.topic}
                                onChange={(e) => setData({ ...data, topic: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label className="mt-2" htmlFor=" description">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id=" description"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                required
                                style={{width: "100%", height: "200px" }}
                            >
                            </textarea>
                        </div>

                        <input type="submit" className="w-50 btn btn-dark add-btn" value="Send Feedback" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StuFeedback;
