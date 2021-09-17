import Sidebar from "../Sidebar"
import payslip from '../Resources/paySlip.jpg';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';


const StudentPayslip = () => {

// const courseData = JSON.parse(localStorage.getItem('courseData'));
// console.log(courseData.amount);
/////////////////////////////////////
const { id } = useParams();
// const id = { id: user.user_id }
const Id = { id: id }

const [data, setData] = useState([]);

const url = "http://localhost:3001/courseDetails";

useEffect(() => {fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Id)
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setData(data[0])
            console.log(data);
        })

}, [url])

// console.log(data.price)

const user = JSON.parse(localStorage.getItem('user'))
const StudentId =  user.user_id;
const [newData, setnewData] = useState(
    {
        student_id: StudentId,
        course_id: Id.id,
        payment_method: "Bank Slip",
        date_time: "",
        amount: data.price,
        month: "",
        verified: 0,
        payment_slip: "Link"
    })
    console.log(newData.price)
/////////////////////////////////////




    const handleSubmit = (e) => {
        // e.preventDefault();

        // const url = "http://localhost:3001/teacherCourses/addContent"

        // const formData = new FormData(document.getElementById("content-form"))
        // formData.append("lesson_id", data.lesson_id)
        // formData.append("course_id", data.course_id)

        // fetch(url, {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then((res) => {
        //         return res.json()
        //     })
        //     .then((data => {
        //         console.log(data)
        //         history.push("/teacher/courses/" + courses[0].course_id)
        //     }))
    }











    
    return ( 
        <div>
        <Sidebar></Sidebar>
            <div className="PaymentContent">
            <div className="payform">
            <h2>Upload your payslip here</h2>
            <img src={payslip} alt="image" className ="image" width = "50%"/>
            <form onSubmit={handleSubmit} action="#" className="form1">

                <input type="file" name="filename" className="button1"/>

                <input type="submit" className="button"/>
            </form>
            </div>  
           

            </div>
        </div>

     );
}
 
export default StudentPayslip;