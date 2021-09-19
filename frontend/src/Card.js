function Card({title,description,button, onclick}) {
    return (
    <div className="card">
    <div className="card_body">
        <h2 className="card_title">{title}</h2>
        <p className="card_description">{description}</p>
        <button className="card_btn" onClick={onclick}>{button}</button>
    </div>
    </div>);
}
 
export default Card;