import { useState, useEffect } from "react";
import { useHistory } from "react-router";
const CreateStuFeekback = () => {
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'));

    const [data, setData] = useState({
        topic: "",
        description: "",
        file_name: "",
        attachment: "",
        ann_type: "",
        user_id: user.user_id
        }
    );

   

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:3001/CreateStuFeedback"

        const formData = new FormData(document.getElementById("content-form"))
        formData.append("user_id", data.user_id)

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((res) => {
                return res.json()
            })
            .then((data => {
                alert("New Feedback added Successfully!")
                history.push("/studentHome/StuFeedback")
            }))
    }

    return (
    <div className="form-signup">
        <h1 className="h3 mb-3 fw-normal">Add New Feedback</h1>
    <form onSubmit = { handleSubmit } className="row g-3"  encType="multipart/form-data" id="content-form">
            
            <div className="col-12">
                    <label htmlFor="topic" className="mt-2">Topic</label>
                    <input
                        type="text"
                        className="form-control"
                        id="topic"
                        name="topic"
                        value={data.topic}
                        onChange={(e) => setData({ ...data, topic: e.target.value })}
                        required
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="description" className="mt-2">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                        required
                    />
                </div>

                {/* <div className="col-md-4">
                    <label className="mt-2" htmlFor="ann_type">Announcement For</label>
                    <select
                        className="form-control"
                        id="ann_type"
                        name="ann_type"
                        placeholder="Choose..."
                        value={data.ann_type}
                        // {...register("province")}
                        onChange={(e) => setData({ ...data, ann_type: e.target.value })}
                        required
                    >
                        <option value="">Choose...</option>
                        <option>All</option>
                        <option>All Students</option>
                        <option>All Teachers</option>
                        <option>All Supporting Staff</option>
                        <option>All staff</option>
                        <option>All students and Teachers</option>
                    </select>
                </div> */}


               

            <div className="col-12 mt-4">
        <input type="submit" className="btn btn-dark" value="Add Feedback"/>
        </div>
    </form>
</div>  );
}
 
export default CreateStuFeekback;