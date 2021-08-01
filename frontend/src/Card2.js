
import './Resources/card2.css';

function Card2({ title, description, button }) {
    return (
        <div className="card2">
                <h2 className="card2-title">{title}</h2>
                <p className="card2_description">{description}</p>
                <button className="btn btn-dark">{button}</button>
        </div>);
}

export default Card2;

{/* <div className="card bg-dark text-white a1">
    <img src={background1} className="card-img" alt="background" />
    <div className="card-img-overlay">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text">Last updated 3 mins ago</p>
    </div>
</div> */}