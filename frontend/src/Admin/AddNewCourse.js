import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import '../Resources/signUp.css'

const AddNewCourse = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory()

    const [id, setId] = useState(null);
    const [teacherdata, setTeacherData] = useState([])
    const [data, setData] = useState(
        {
            course_name: "",
            year: "",
            description: "",
            teacher: "",
            price: "",
            image: "",
            user_id: user.user_id
        }
    );

    const url = "http://localhost:3001/getAllTeachers"
    useEffect(() => {

        fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setTeacherData(data)
            })

    }, [url])


    const handleSubmit = (e) => {
        e.preventDefault();


        const url = "http://localhost:3001/addNewCourse"

        const formData = new FormData(document.getElementById("course-form"))
        formData.append("user_id", data.user_id)

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setId(data);
                alert("Course Added Successfully!")
                history.replace("/adminHome/courses")
            })
    }

    return (

        <main className="form-signup">

            {/* <img className="mb-4" src="logo_icon.png" alt="" width="72" height="72" /> */}
            <h1 className="h3 mb-3 fw-normal">Add new Course</h1>
            <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data" id="course-form">


                <div className="col-md-6">
                    <label htmlFor="courseName" className="mt-2">Course Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="courseName"
                        name="course_name"
                        value={data.course_name}
                        onChange={(e) => setData({ ...data, course_name: e.target.value })}
                        required
                    />
                </div>


                <div className="col-md-4">
                    <label className="mt-2" htmlFor="year">Course Year</label>
                    <select
                        className="form-control"
                        id="year"
                        name="course_year"
                        placeholder="Choose..."
                        value={data.year}
                        onChange={(e) => setData({ ...data, year: e.target.value })}
                        required
                    >
                        <option value="">Choose...</option>
                        <option>2021 O/Level</option>
                        <option>2022 O/Level</option>
                        <option>2021 A/Level</option>
                        <option>2022 A/Level</option>
                        <option>2023 A/Level</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="mt-2" htmlFor="teacher">Taught by</label>
                    <select
                        className="form-control"
                        id="teacher"
                        name="teacher_id"
                        placeholder="Choose..."
                        value={data.teacher}
                        onChange={(e) => setData({ ...data, teacher: e.target.value })}
                        required
                    >
                        <option value="">Choose...</option>
                        {teacherdata.map((teacherdt, i) => (
                                            <option value={teacherdt.teacher_id}>{teacherdt.teacher_id} {teacherdt.fname} {teacherdt.lname}</option>
                                        ))}
                    </select>
                </div>


                <div className="col-12">
                    <label className="mt-2" htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-5">
                    <label className="mt-2" htmlFor="price">Course Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={data.price}
                        onChange={(e) => setData({ ...data, price: e.target.value })}
                        required
                    />
                </div>

                <div className="col-12">
                            <label htmlFor="image" className="mt-2">Add course Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                id="image"
                                value={data.image}
                                onChange={(e) => setData({ ...data, image: e.target.value })}
                                name="file"
                                required

                            />
                        </div>

                <div className="col-12 mt-4">
                    <input type="submit" className="btn btn-lg btn-dark add-btn" value="Add Course" />
                </div>

            </form>


        </main>

    );
}

export default AddNewCourse;