import { useEffect, useState } from 'react';
import io from 'socket.io-client'

const connentionPort = 'http://localhost:3001/'
let socket = io(connentionPort)

const Chatroom = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const course = JSON.parse(localStorage.getItem('course'))

    let userName = user.fname + " " + user.lname

    const [joined, setJoined] = useState(false)

    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    // useEffect(() => {
    //     socket = io(connentionPort)
    // }, [connentionPort])

    // useEffect(() => {
    //     //setMessageList(JSON.parse(localStorage.getItem('messages')) || [])
    //     console.log("save msgs")
    //     localStorage.setItem('messages', JSON.stringify(messageList))
    //     let sentMessage = document.getElementById("message-list")
    //     if (sentMessage) {
    //         sentMessage.scrollTop = sentMessage.scrollHeight
    //     }
    // }, [messageList])

    useEffect(() => {

        socket.on("receive_message", (data) => {
            console.log("received")
            setMessageList([...messageList, data])
        })

        let sentMessage = document.getElementById("message-list")
        if (sentMessage) {
            sentMessage.scrollTop = sentMessage.scrollHeight
        }

    })

    const joinChat = () => {
        setJoined(true)
        localStorage.setItem('joined', true)
        //localStorage.setItem('messages', JSON.stringify([]))
        socket.emit('join_chat', { room: course[0].course_id, user: userName })
    }

    const exitChat = () => {
        setJoined(false)
        setMessageList([])
        localStorage.removeItem('joined')
        socket.emit('leave_chat', { room: course[0].course_id, user: userName })
        //localStorage.removeItem('messages')
    }

    const sendMessage = () => {
        if (message) {
            let messageContent = {
                room: course[0].course_id,
                content: {
                    sender: userName,
                    message: message,
                    time: new Date().toLocaleTimeString('en-US', {
                        hour12: false,
                        hour: "numeric",
                        minute: "numeric"
                    })
                }
            }

            console.log("sent")
            socket.emit('send_message', messageContent)
            //setMessageList(JSON.parse(localStorage.getItem('messages')))

            setMessageList([...messageList, messageContent.content])
            setMessage("")

        }
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('joined'))) {
            setJoined(true)
        } else
            setJoined(false)
    }, [joined])

    return (
        <div className="chat">
            <h4>Chat Room</h4>

            {joined ? (
                <div className="chat-room">
                    <div className="message-list" id="message-list" >
                        {messageList.map((message, index) => (
                            <div id={message.sender === userName ? "sent-msg" : "received-msg"} className="message-box" key={index} >
                                <span className="sender">{message.sender}</span>
                                <div className="message-content">{message.message}</div>
                                <span className="time sender">{message.time}</span>
                            </div>

                        ))}
                    </div>
                    <div className="message-input">
                        <input
                            placeholder="Type your message..."
                            type="text"
                            className="input-message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e.target.value) : null)}
                            autoFocus />
                        <button onClick={sendMessage} className="message-send" >Send</button>
                    </div>

                    <button onClick={exitChat} className="join-chat">Exit Chat Room</button>
                </div>
            ) : (<button onClick={joinChat} className="join-chat">Join Chat Room</button>)}

        </div>
    );
}

export default Chatroom;