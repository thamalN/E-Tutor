import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const StudentPayment = () => {


    return (
        <div>
        <Sidebar/>
        <div className="homeContent">
        <h1>My Payments</h1>
        <div className="reg_buttons">
        <Link to="/studentHome/payments/allPayments">View All My Payments</Link>
        <Link to="/studentHome/payments/newPayment">Make A New Payment</Link>
        {/* <Link to="/adminHome/createSupStaffAcc"><button >Back To Dashboard</button></Link> */}
        <Link to="/studentHome">Back to Dashboard</Link>
    </div>
    </div>
    </div>
    );
}

export default StudentPayment;


  // <div>
        //     <Sidebar />
        //     <div className="PaymentContent">
        //     <h2>Select Your payment Method</h2>
        //         <div className="payment">
        //             <div className="payment-card-content">
        //                 <p>payment1</p>
        //                 <div>
        //                <Link to = "/studentHome/payments/payslip" >
        //                <div className="payment-card">
        //                         Opload your payslip
        //                 </div>
        //                </Link>
                            
        //                 <Link to = "/studentHome/payments/PayOnline">
        //                 <div className="payment-card">
        //                         Pay Online
        //                     </div>
        //                 </Link>
                            

        //                 </div>
                        
        //             </div>
                
        //         </div>

        //     </div>
        // </div>