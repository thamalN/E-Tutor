import { useState } from "react";
import { useHistory } from "react-router";
import Sidebar from "../Sidebar";
const FeedbackReply = () => {
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'));
    const feed = JSON.parse(localStorage.getItem('feedback'));

    const [data, setData] = useState({
        name: "",
        subject: "",
        remarks:"",
        email: feed.email,
        message: "",
        handled_by: user.user_id,
        feedback_id: feed.feedback_id
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "https://etutor-backend.herokuapp.com/feedbackReply"
        console.log(data)

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json()
            })
            .then((data => {
                if (data.status === "success") {
                    alert("Successfully sent the reply to the user and marked the feedback as handled!");
                    history.replace("/adminHome/feedback");
                  } else if (data.status === "fail") {
                    alert("Sorry the task couldn't be completed");
                    history.replace("/adminHome/feedback");
                  }
                
            }))
    }

    return (
        <div>
            <Sidebar />
        <div className="homeContent">
            <div className="form-signup">
                <h1 className="h3 mb-3 fw-normal">Reply to feedback</h1>
            <form onSubmit = { handleSubmit } className="row g-3"  encType="multipart/form-data" id="content-form">
            
            <div className="col-md-6">
                    <label htmlFor="name" className="mt-2">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="subject" className="mt-2">Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={data.subject}
                        onChange={(e) => setData({ ...data, subject: e.target.value })}
                        required
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="remarks" className="mt-2">Remarks(for admin use)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="remarks"
                        name="remarks"
                        value={data.remarks}
                        onChange={(e) => setData({ ...data, remarks: e.target.value })}
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="email" className="mt-2">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="message" className="mt-2">Message</label>
                    <input
                        type="text"
                        className="form-control"
                        id="message"
                        name="message"
                        value={data.message}
                        onChange={(e) => setData({ ...data, message: e.target.value })}
                        required
                    />
                </div>

            <div className="col-12 mt-4">
        <input type="submit" className="btn btn-dark add-btn" value="Send Email"/>
        </div>
    </form>
</div>
</div>
    </div>  );
}
 
export default FeedbackReply;