import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"

const AllPayments = () => {

    const [data, setData] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    const id = { id: user.user_id }
     
    const url = "http://localhost:3001/allPayments" 

    useEffect(() => {

        fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data)
                console.log(data)
            })

    }, [url])


    return (
        <div>

            <Sidebar />
            <div className="homeContent">
            <div className="b2">

<ul>
    <li className="reg_title">
        <h3>My Payments</h3>
    </li>
    <li>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Payment ID</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Paid For</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Purchase Date</th>
                </tr>
            </thead>
            <tbody>

                {data.map((searchData, i) => (
                    <tr>
                        <td>{searchData.payment_id}</td>
                        <td>{searchData.course_name}</td>
                        <td>{searchData.month}</td>
                        <td>{searchData.amount}</td>
                        <td>{searchData.payment_method}</td>
                        <td>{searchData.date_time}</td>
                    </tr>
                ))}

            </tbody>
        </table>
    </li>
</ul>



</div>
            </div>
        </div>);

}

export default AllPayments;

