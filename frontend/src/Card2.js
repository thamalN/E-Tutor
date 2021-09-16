
import './Resources/card2.css';

function Card2({ title, description, button }) {
    return (
        <div className="card">
            <div className="card_body">
                <h2 className="card_title">{title}</h2>
                <p className="card_description">{description}</p>
                {button && <button className="card_btn">{button}</button>}
            </div>
        </div>
    );
}

export default Card2;
