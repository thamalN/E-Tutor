import { useEffect, useState } from 'react';
import io from 'socket.io-client'

const connentionPort = 'http://localhost:3001/'
let socket

const Chatroom = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const course = JSON.parse(localStorage.getItem('course'))

    const [joined, setJoined] = useState(false)

    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket = io(connentionPort)

    }, [connentionPort])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList([...messageList, data])
        })
    }, [messageList])

    const joinChat = () => {
        setJoined(true)
        socket.emit('join_chat', course[0].course_id)
    }

    const exitChat = () => {
        setJoined(false)
    }

    const sendMessage = () => {
        let messageContent = {
            room:  course[0].course_id,
            content: {
                sender: user.user_id,
                message: message
            }
        }

        socket.emit('send_message', messageContent)
        setMessageList([...messageList, messageContent.content])
        setMessage("")
    }


    return (
        <div className="chat">
            <h4>Chat Room</h4>

            {joined && (
                <div className="chat-room">
                    <div className="message-list">
                        {messageList.map((message, index) => (
                            <li key={index}>{ message.sender }:{ message.message }</li>
                        ))}

                    </div>
                    <div className="message-input">
                        <input
                            placeholder="type your message..."
                            type="text"
                            className="input-message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={sendMessage} className="message-send">Send</button>
                    </div>

                    {/* <button onClick={exitChat} className="join-chat">Exit Chat Room</button> */}
                </div>
            )}

            {!joined && <button onClick={joinChat} className="join-chat">Join Chat Room</button>}
        </div>
    );
}

export default Chatroom;