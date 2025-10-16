import './CardDetails.css'

const CardDetails = ( { id, name, exterior_color, exterior_image, exterior_cost, roof_name, roof_image, roof_cost, wheel_name, wheel_image, wheel_cost, interior_name, interior_image, interior_cost, cost } ) => {
    const total = cost + exterior_cost + roof_cost + wheel_cost + interior_cost
    return (
        <article>
            <header>
                <h3 className="car-title">
                    <img src="https://boltbucket-exemplar.onrender.com/assets/coupe-6d0eccac.png" alt="car-image"></img>
                    {name}
                </h3>
            </header>
                <div className='details-content'>
                    <div className='car-details-price'>
                        <h2>💰 ${total}</h2>
                    </div>
                    <div className='car-selection' style={{backgroundImage: `url(${exterior_image})`}}>
                        <div className='car-selection-overlay'>
                            <div className='car-selection-details'>
                                <p>
                                    <strong>🖌️ Exterior: </strong>
                                    {exterior_color}
                                </p>
                                <div className='option-price'>
                                    <p>
                                        💵 $ {exterior_cost}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='car-selection' style={{backgroundImage: `url(${roof_image})`}}>
                        <div className='car-selection-overlay'>
                            <div className='car-selection-details'>
                                <p>
                                    <strong>😎 Roof: </strong>
                                    {roof_name}
                                </p>
                                <div className='option-price'>
                                    <p>
                                        💵 $ {roof_cost}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='car-modify'>
                        <a href= {`/edit/2`} role="button">Edit</a>
                        <button>Delete</button>
                    </div>
                    <div className='car-selection' style={{backgroundImage: `url(${wheel_image})`}}>
                        <div className='car-selection-overlay'>
                            <div className='car-selection-details'>
                                <p>
                                    <strong>🛴 Wheels: </strong>
                                    {wheel_name}
                                </p>
                                <div className='option-price'>
                                    <p>
                                        💵 $ {wheel_cost}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='car-selection' style={{backgroundImage: `url(${interior_image})`}}>
                        <div className='car-selection-overlay'>
                            <div className='car-selection-details'>
                                <p>
                                    <strong>💺 Interior: </strong>
                                    {interior_name}
                                </p>
                                <div className='option-price'>
                                    <p>
                                        💵 $ {interior_cost}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </article>
    )
};


export default CardDetails;
