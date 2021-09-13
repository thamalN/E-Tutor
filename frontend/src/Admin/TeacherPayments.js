import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PrintIcon from '@material-ui/icons/Print';
import GetAppIcon from '@material-ui/icons/GetApp';

const TeacherPayments = () => {
    
    const [allPayments, setAllPayments] = useState([])
    const [totalPayments, setTotalPayments] = useState([])
    const history = useHistory()

    const url = "http://localhost:3001/getTeacherPayments"
    useEffect(() => {

        fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setAllPayments(data)
                // localStorage.setItem('teacherPayDetails', JSON.stringify(data))
                const payments = data.map(pay => {
                    let amount = pay.details.reduce(function(acc, obj){
                        return acc + obj.amount_payable
                    }, 0)
                    console.log(amount)
                    let payments = {teacher_id: pay.property, total_amount: amount, fname:pay.details[0].fname, lname:pay.details[0].lname, email:pay.details[0].email, contact:pay.details[0].contact}
                    
                return payments
                
                })
  
                setTotalPayments(payments)
                
            })

    }, [url])

    const handleView = (pay) =>{
        
        localStorage.setItem('teacherPay', JSON.stringify(pay))
        let detailedPayment = allPayments.filter(item=>item.property ===pay.teacher_id)
        localStorage.setItem('detailedTeacherPay', JSON.stringify(detailedPayment))
        history.push("/adminHome/payments/teacherPayments/detailedTeacherPayments")

}
    

    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <div className="b2">

                        <ul>
                            <li className="reg_title">
                                <h3>Teacher Payments</h3>
                            </li>
                            <div  className="download_icons">
                            <button className="btnnew"> Print<PrintIcon/></button>
                            <button className="btnnew"> Download <GetAppIcon/></button>
                           
                            </div>
                            <li>
                                <table className="table table2">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Teacher ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Amount Payable(LKR)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                        {totalPayments.map((pay, i) => (  
                                            <tr>
                                                
                                            <td onClick={() => handleView(pay)}>{pay.teacher_id}</td>
                                            <td>{pay.fname} {pay.lname}</td>
                                            <td>{pay.email}</td>
                                            <td>{pay.contact}</td>
                                            <td>{pay.total_amount}</td>
                                            
                                            </tr>
                                            
                                        ))}
                                     
                                    </tbody>
                                </table>
                            </li>
                        </ul>



                    </div>
                    
        </div>
        </div>
        
      );
}
 
export default TeacherPayments;