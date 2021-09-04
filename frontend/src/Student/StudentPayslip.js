import Sidebar from "../Sidebar"
import payslip from '../Resources/paySlip.jpg';

const StudentPayslip = () => {













    
    return ( 
        <div>
        <Sidebar></Sidebar>
            <div className="PaymentContent">
                

            <div className="payform">
            <h2>Upload your payslip here</h2>
            <img src={payslip} alt="image" className ="image" width = "50%"/>
            <form action="#" className="form1">

                <input type="file" name="filename" className="button1"/>

                <input type="submit" className="button"/>
            </form>
            </div>  
           

            </div>
        </div>

     );
}
 
export default StudentPayslip;