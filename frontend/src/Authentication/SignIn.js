import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignIn = () => {

    const history = useHistory()

    const [data, setData] = useState(
        {
            username: "",
            password: ""
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:3001/signIn";

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                let flag = data.user_flag
                
                localStorage.setItem('user', JSON.stringify(data))

                if (flag === 1)
                    history.push("/Admin/adminHome")
                else if (flag === 3) {
                    history.push("/Teacher/teacherHome")
                } else
                    alert("wrong username or password")
                })

    }

    return (

            <div className="authForm">
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required
                    />

                    <input type="submit" value="SIGN IN" />
                </form>
            </div>

    );
}

export default SignIn;