import Sidebar from "../Sidebar"
import payslip from '../Resources/paySlip.jpg';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router";

const StudentPayslip = () => {

const history = useHistory()

const { id } = useParams();

const Id = { id: id }

const [myData, setmyData] = useState([]);

const url = "http://localhost:3001/courseDetails";

useEffect(() => {fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(Id)
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setmyData(data[0])
            // console.log(myData.price);
        })

}, [url])

const user = JSON.parse(localStorage.getItem('user'))
const StudentId =  user.user_id;

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:3001/uploadPayslip"

        const formData = new FormData(document.getElementById("content-form"))
        formData.append("student_id", StudentId)
        formData.append("course_id", Id.id)
        // formData.append("payment_method", "Bank Slip")
        formData.append("amount",  myData.price)
        // formData.append("verified",  0)

        fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
            .then((res) => {
                return res.json()
            })
            .then((data => {
                console.log(data)
                history.push("/studentHome/payments/newPayment")
            }))
    }

    return ( 
        <div>
        <Sidebar></Sidebar>
            <div className="PaymentContent">
            <div className="payform">
            <h2>Upload your payslip here</h2>
            <img src={payslip} alt="image" className ="image" width = "50%"/>
            <form onSubmit={handleSubmit} action="#" className="form1" id="content-form" >

                <input type="file" name="file" className="form-control " accept="image/*" />
                {/* button1 */}
                <input type="submit" className="btn btn-dark add-btn"/>
                {/* button */}
            </form>
            </div>  
           

            </div>
        </div>

     );
}
 
export default StudentPayslip;