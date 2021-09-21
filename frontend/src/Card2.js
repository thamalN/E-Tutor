import { useEffect, useState } from "react";
import './Resources/card2.css';
import chemistry from './Resources/Chemistry.jpg';

function Card2({ title, description, button, image }) {
    // console.log(image);
    // const [bg, setBg] = useState(image)

    return (
        <div className="card2" style={{backgroundImage: "url(" + image + ")"}}>
            <div className="card2_body">
                <h2 className="card2_title">{title}</h2>
                <p className="card2_description">{description}</p>
                {button && <button className="card2_btn">{button}</button>}
            </div>
        </div>
    );
}

export default Card2;
