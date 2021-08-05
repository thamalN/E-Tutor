import { useState } from "react";
import { useHistory } from "react-router";
const FeedbackReply = () => {
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'));

    const [data, setData] = useState({
        name: "",
        subject: "",
        email: "",
        message: "",
        user_id: user.user_id
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:3001/feedbackReply"

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json()
            })
            .then((data => {
                if (data.status === "success") {
                    alert("Message Sent");
                    history.push("/adminHome");
                  } else if (data.status === "fail") {
                    alert("Message failed to send");
                    history.push("/adminHome");
                  }
                
            }))
    }

    return (
    <div className="form-signup">
        <h1 className="h3 mb-3 fw-normal">Reply to feedback</h1>
    <form onSubmit = { handleSubmit } className="row g-3"  encType="multipart/form-data" id="content-form">
            
            <div className="col-12">
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

                <div className="col-12">
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
                    />
                </div>

            <div className="col-12 mt-4">
        <input type="submit" className="btn btn-dark" value="Send Email"/>
        </div>
    </form>
</div>  );
}
 
export default FeedbackReply;