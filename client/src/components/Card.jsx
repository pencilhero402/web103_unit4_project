import './Card.css'

const Card = ( { id, name, convertible, exterior_color, exterior_cost, roof_name, roof_cost, wheel_name, wheel_cost, interior_name, interior_cost, cost } ) => {
    const total = cost + exterior_cost + roof_cost + wheel_cost + interior_cost
    return (
        <article id="article">
            <header>
                <h3 className="car-title">
                    <img src="https://boltbucket-exemplar.onrender.com/assets/coupe-6d0eccac.png" alt="car-image"></img>
                    {name}
                </h3>
            </header>
            <div className='car-card'>
                <div className='car-summary'>
                    <p>
                        <strong>🖌️ Exterior: </strong>
                        {exterior_color}
                    </p>
                    <p>
                        <strong>😎 Roof: </strong>
                        {roof_name}
                    </p>
                </div>
                <div className='car-summary'>
                    <p>
                        <strong>🛴 Wheels: </strong>
                        {wheel_name}
                    </p>
                    <p>
                        <strong>💺 Interior: </strong>
                        {interior_name}
                    </p>
                </div>
                <div className='car-price'>
                    <h3>💰 ${total}</h3>
                    <a href= {`/customcars/${id}`} role="button">Details</a>
                </div>
            </div>
        </article>
    )
};


export default Card;