import { useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";

const AddDiscussion = () => {

    const history = useHistory()

    const [data, setData] = useState({
        topic: "",
        post: "",
        course_id: JSON.parse(localStorage.getItem('course'))[0].course_id,
        user_id: JSON.parse(localStorage.getItem('user')).user_id,
        date_time: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)

        fetch("http://localhost:3001/teacherCourses/addDiscussion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(
            history.goBack()
        )
    }

    const changeText = () => {
        var text = window.getSelection().toString()
        console.log(text)
        var range
        if (text.rangeCount) {
            range = text.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode("aaa"));
        }
    }

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="addContent">
                    <form onSubmit={handleSubmit} id="discussion-form">
                        <div className="nameRow">

                            <div id="newTopic" className="Row">
                                <label>Discussion Topic</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={data.topic}
                                    onChange={(e) => setData({ ...data, topic: e.target.value })}
                                    required
                                />
                            </div>

                            <div id="newTopic" className="Row">
                                <label>Discussion Body</label>
                                
                                <textarea
                                    name="body"
                                    required
                                    value={data.post}
                                    onChange={(e) => setData({ ...data, post: e.target.value })}
                                >

                                </textarea>
                            </div>

                        </div>

                        <input type="submit" value="Add Discussion" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddDiscussion;