import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";

const StudentPayment = () => {


    return (
        <div>
            <Sidebar />
            <div className="PaymentContent">
            <h2>Select Your payment Method</h2>
                <div className="payment">
                    <div className="payment-card-content">
                        <p>payment1</p>
                        <div>
                       <Link to = "/studentHome/payments/payslip" >
                       <div className="payment-card">
                                CARD ONE
                        </div>
                       </Link>
                            
                        <Link to = "/">
                        <div className="payment-card">
                                CARD TWO
                            </div>
                        </Link>
                            

                        </div>
                        
                    </div>
                
                </div>

            </div>
        </div>
    );
}

export default StudentPayment;