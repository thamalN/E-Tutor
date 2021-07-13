import { useState } from "react";
const CreateAnnouncement = () => {
    const [id, setId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    const [data, setData] = useState({
        topic: "",
        description: "",
        user_id: user.user_id
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const url = "http://localhost:3001/createAnnouncement"
        console.log(data)


        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setId(data);
        })
    }
    return (<div className="authForm">
        <div><h1> Add New Announcement</h1></div>
    <form onSubmit = { handleSubmit }>
            <div>
                <label>Topic</label>
                <input 
                    type="text" 
                    value={ data.topic } 
                    onChange = { (e) => setData({ ...data, topic: e.target.value })}
                    required
                />
            </div>

            <div>
                <label>Description</label>
                <input type="text" 
                    value={ data.description } 
                    onChange = { (e) => setData({ ...data, description: e.target.value })}
                    required
                />
            </div>

        <input type="submit" value="Add Announcement"/>
    </form>
</div>  );
}
 
export default CreateAnnouncement;