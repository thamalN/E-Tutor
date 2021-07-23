import { useState } from "react";
import { useHistory } from "react-router-dom";
import '../Resources/signIn.css'

const SignIn = (props) => {

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
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                console.log(res)
                return res.json();
            })
            .then(data => {
                let flag = data.user_flag

                localStorage.setItem('user', JSON.stringify(data))
                props.setLoggedIn(true)
                if (flag === 1)
                    history.push("/adminHome")
                else if (flag === 2) 
                    history.push("/SupportingStaffHome")
                else if (flag === 3) 
                    history.push("/Teacher/teacherHome")
                else if (flag === 4) 
                    history.push("/studentHome")     
                else 
                    alert("wrong username or password")
                    
            })

    }

    return (
            <main className="form-signin text-center">
                <form onSubmit={handleSubmit} className="authForm">
                    <img className="mb-4" src="logo_icon.png" alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

                    <input
                        type="text"
                        className="form-control "
                        id="userName"
                        placeholder="Username"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        className="form-control "
                        id="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required
                    />

                    <label className="mt-2">
                        <input type="checkbox" value="remember-me" className="checkbox mb-3" /> Remember me
                    </label>

                    <button className="w-100 btn btn-lg btn-dark" type="submit">Sign In</button>
                </form>

            </main>

   



    );
}

export default SignIn;