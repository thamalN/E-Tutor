import { useHistory } from "react-router";

const NotFound = () => {

    const history = useHistory()
    return ( 
        <div className="homeContent">
            <h1>404 Page Not Found</h1>
            <h4>This page does not exist on the server</h4>

            <button onClick={() => history.goBack()}>Go Back</button>
        </div>
     );
}
 
export default NotFound;