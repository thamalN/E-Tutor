import { useHistory, useParams } from "react-router-dom";
import Sidebar from "../Sidebar"
import EditIcon from '@material-ui/icons/Edit';

const Discussion = () => {

    const { id } = useParams()
    const history = useHistory()

    const discussion = JSON.parse(localStorage.getItem('discussion')).filter((item) => item.discussion_id === parseInt(id))

    const disc = {
        discussion_id: discussion[0].discussion_id,
        topic: discussion[0].topic,
        post: discussion[0].post,
        post_user_id: discussion[0].post_user_id,
        fname: discussion[0].post_fname,
        lname: discussion[0].post_lname,
        date_time: discussion[0].post_datetime,
        replies: []
    }

    //console.log(discussion)

    discussion.map((item) => {
        if (item.reply_id !== null)
            disc.replies.push({ reply_id: item.reply_id, reply: item.reply, reply_user_id: item.reply_user_id, replied_by: item.reply_fname + " " + item.reply_lname, reply_datetime: item.reply_date_time, parent_reply: item.parent_reply, replies: [] })
    })

    var tmp

    disc.replies.map((i) => {
        tmp = disc.replies.find((j) => j.reply_id === i.parent_reply)

        if (tmp !== undefined) {
            tmp.replies.push(i)
        }
    })

    disc.replies = (disc.replies.filter((item) =>
        item.parent_reply === null
    ))

    //console.log(disc)

    const sendReply = (e) => {
        if (e.target.parentNode.childNodes[0].checkValidity()) {
            const nextNode = e.target.parentNode.parentNode.id
            var currentReply = iterate(disc.replies, parseInt(nextNode))

            var reply = {
                discussion_id: disc.discussion_id,
                reply: e.target.parentNode.childNodes[0].value,
                replied_by: JSON.parse(localStorage.getItem('user')).user_id,
                reply_datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
                parent_reply: nextNode ? parseInt(nextNode) : null
            }

            //console.log(reply)

            fetch("http://localhost:3001/teacherCourses/addReply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reply)
            }).then(
                history.goBack()
                //history.go(0)
            )

        } else
            alert("Reply cannot be empty")
    }

    function iterate(arr = [], id) {
        var reply = arr.find((i) => id === i.reply_id)
        if (reply) {
            return reply
        }
        arr.some((j) => reply = iterate(j.replies, id))
        return reply
    }

    const addReply = (e) => {
        var currentReply = document.getElementsByClassName('reply-parent')
        if (currentReply.length === 0) {
            e.target.innerHTML = "Close"

            const replyParent = document.createElement("div")
            replyParent.setAttribute("class", "reply-parent")

            const replyText = document.createElement("textarea")
            replyText.placeholder = "Add a reply..."
            replyText.setAttribute("class", "replyBox")
            replyText.required = true

            const submitReply = document.createElement("button")
            submitReply.innerHTML = "Reply"
            submitReply.setAttribute("class", "comment-btn")
            submitReply.onclick = (e) => sendReply(e)

            e.target.parentNode.insertAdjacentElement('afterend', replyParent)
            replyParent.insertAdjacentElement('afterbegin', replyText)
            replyText.insertAdjacentElement('afterend', submitReply)

        } else {
            var currentBtn = currentReply[0].previousSibling.querySelector('.reply-btn')
            currentBtn.innerHTML = "Reply"
            currentReply[0].remove()
            // addReply(e)
        }

    }

    const editDetails = () => {

        const details = document.querySelector(".discussion-details")
        const editBtn = details.childNodes[1]
        editBtn.style.display = "none"

        const topic = details.childNodes[0]

        const topicInput = document.createElement("input");
        topicInput.setAttribute("value", topic.textContent);
        topicInput.style.marginBottom = "5px"
        topicInput.style.padding = "5px"
        topicInput.style.width = "100%"
        topicInput.style.fontWeight = "bold"
        topicInput.style.fontSize = "25px"
        topic.replaceWith(topicInput);

        const post = details.childNodes[5]

        const postInput = document.createElement("textarea");
        postInput.innerHTML = post.textContent;
        post.replaceWith(postInput);
        postInput.style.width = "100%"
        postInput.rows = 5

        const saveBtn = document.createElement("button");
        saveBtn.setAttribute("class", "course-edit-btn")
        saveBtn.innerHTML = "Save Changes"

        postInput.insertAdjacentElement('afterend', saveBtn)


        const save = function () {
            const edited = { discussion_id: discussion[0].discussion_id, course_id: discussion[0].course_id, topic: topicInput.value.toString(), post: postInput.value.toString() }

            const url = "http://localhost:3001/teacherCourses/editDiscussion"
            fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(edited)
            }).then(data => {
                history.goBack()
            })
        };

        saveBtn.onclick = save

    }

    const editReply = (e) => {
            const reply = e.target.parentNode.parentNode.childNodes[0]

            const replyInput = document.createElement("input")
            replyInput.value = reply.innerHTML

            reply.replaceWith(replyInput)

            const sumbitBtn = document.createElement("button")
            sumbitBtn.innerHTML = "Submit"
            sumbitBtn.setAttribute("class", "edit-reply-btn")

            e.target.replaceWith(sumbitBtn)

            const submitEdited = () => {
                var reply = {
                    discussion_id: disc.discussion_id,
                    reply_id: parseInt(sumbitBtn.parentNode.parentNode.parentNode.id),
                    reply: replyInput.value.toString()
                }

                fetch("http://localhost:3001/teacherCourses/editReply", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reply)
                }).then(data => {
                    //history.goBack()
                    //history.go(0)
                    history.push("/teacher/courses/" + discussion[0].course_id)

                }
                )
            }

            sumbitBtn.onclick = submitEdited

    }

    const nestedReplies = (arr = [], x, parent) => {
        if (arr.length !== 0) {
            return (
                <div>
                    {parent &&
                        (arr.map((item) => (
                            <div className="reply" id={item.reply_id} key={item.reply_id}>
                                <div className="sub-reply">
                                    <p>{item.reply}</p>
                                    <small style={{ float: "right" }}> by <b>{item.replied_by}</b> on <i>{item.reply_datetime.slice(0, 16).replace(' ', ', ')}</i></small>
                                    {disc.post_user_id === item.reply_user_id && ( <div> <button onClick={editReply} className="edit-reply-btn">Edit</button>| </div> )}
                                    <button onClick={addReply} className="reply-btn">Reply</button>
                                </div>
                                {item.replies.length !== 0 && (<details>
                                    <summary><small><i>Load replies</i></small></summary>
                                    {nestedReplies(item.replies, x + 20, false)}
                                </details>)}
                            </div>
                        )))
                    }
                    {!parent &&
                        (arr.map((item) => (
                            <div style={{ marginLeft: x }} id={item.reply_id} key={item.reply_id}>
                                <hr />
                                <div className="sub-reply">
                                    <p>{item.reply}</p>
                                    <small style={{ float: "right" }}> by <b>{item.replied_by}</b> on <i>{item.reply_datetime.slice(0, 16).replace(' ', ', ')}</i></small>
                                    {disc.post_user_id === item.reply_user_id &&( <div> <button onClick={editReply} className="edit-reply-btn">Edit</button>| </div> )}
                                    <button onClick={addReply} className="reply-btn">Reply</button>
                                </div>
                                {item.replies.length !== 0 && (<details>
                                    <summary><small><i>Load replies</i></small></summary>
                                    {nestedReplies(item.replies, x + 20, false)}
                                </details>)}
                            </div>
                        )))
                    }
                </div>
            )
        }
    }

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="discussion">

                    <div className="discussion-details">
                        <h1 style={{ display: "inline" }}>{disc.topic}</h1>
                        <button className="edit-btn" style={{ float: "right" }} >
                            <EditIcon style={{ color: "#3ca730" }} fontSize="large" onClick={editDetails}/>
                        </button>
                        <h5>{disc.fname} {disc.lname}</h5>
                        <h6><i>{disc.date_time.slice(0, 16).replace(' ', ', ')}</i></h6>

                        <hr />
                        <p>{disc.post}</p>
                    </div>

                    <hr />

                    <div className="replies" id="replies">
                        {nestedReplies(disc.replies, 10, true, 0)}
                    </div>

                    <div className="comment-box" id="comment-box">
                        <textarea name="" id="" placeholder="Add a comment..." required></textarea>

                        <button onClick={sendReply} className="comment-btn">Comment</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Discussion;