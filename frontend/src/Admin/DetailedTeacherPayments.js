import { Container } from '@material-ui/core';
import Sidebar from "../Sidebar";
import { useEffect, useState } from 'react';

const DetailedTeacherPayments = () => {
    
    
    const teacher_pay = JSON.parse(localStorage.getItem('teacherPay'))
    const detailed_pay = JSON.parse(localStorage.getItem('detailedTeacherPay'))
    const [payData, setPayData] = useState([])
    
    const [data, setData] = useState({
        teacher_id: teacher_pay.teacher_id,
        fname: teacher_pay.fname,
        lname: teacher_pay.lname,
        email: teacher_pay.email,
        contact: teacher_pay.contact,
        total_amount: teacher_pay.total_amount
        }
    );

    useEffect(() => {
        setPayData(detailed_pay[0].property)
        console.log(payData)
    }, [])
    console.log(payData)
    

    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
        <div className="b2">

                        <ul>
                            <li className="reg_title">
                                <h3>Payment Details - {data.fname}  {data.lname}</h3>
                            </li>
                            
                            <li>
                                <table className="table table2">
                                <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Course ID</th>
                                            <th scope="col">Course</th>
                                            <th scope="col">Payment Amount(LKR)</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {detailed_pay[0].details.map((pay, i) => (
                                            <tr>
                                            <td>{pay.course_id}</td>
                                            <td>{pay.course_name} {pay.year}</td>
                                            <td>{(pay.amount_payable ? pay.amount_payable : 0)}</td>
                                            
                                            </tr>
                                        ))}
                                     
                                    </tbody>
                                </table>
                            </li>
                            <li className="totalAmount">
                            <h5>Total Amount(LKR): {data.total_amount}</h5>
                            </li>
                        </ul>


                        </div>
                    </div>                            
                    </div>
    );
}

export default DetailedTeacherPayments;