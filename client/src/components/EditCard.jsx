import React, { useState } from 'react';
import './CardDetails.css'

const CardDetails = ( { id, name, exteriors, roofs, wheels, interiors, exterior_color, exterior_image, exterior_cost, roof_name, roof_image, roof_cost, wheel_name, wheel_image, wheel_cost, interior_name, interior_image, interior_cost, cost } ) => {
    const total = cost + exterior_cost + roof_cost + wheel_cost + interior_cost

    // States to handle visibility of image grids
    const [activeGrid, setActiveGrid] = useState(null);

    const handleButtonClick = (gridType) => {
        setActiveGrid(gridType)
        console.log("Fetched: ", gridType)
    }
    
    return (
        <article>
            <header>
                <h3 className="car-title">
                    <img src="https://boltbucket-exemplar.onrender.com/assets/coupe-6d0eccac.png" alt="car-image"></img>
                    {name}
                </h3>
                <div className="header-buttons">
                    <button onClick={() => handleButtonClick(exteriors)}>Exterior</button>
                    <button onClick={() => handleButtonClick(roofs)}>Roof</button>
                    <button onClick={() => handleButtonClick(wheels)}>Wheels</button>
                    <button onClick={() => handleButtonClick(interiors)}>Interior</button>
                </div>
            </header>
            <main>

                {/*----- Display active grid ------*/}
                {activeGrid === exteriors && (
                    <div className="grid">
                        {exteriors.map((exterior, index) => (
                            <div key={index} className="grid-item">
                                <img src={exterior.image} alt={exterior.color} />
                                <p>{exterior.color}</p>
                                <p>💵 ${exterior.price}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeGrid === roofs && (
                    <div className="grid">
                        {roofs.map((roof, index) => (
                            <div key={index} className="grid-item">
                                <img src={roof.image} alt={roof.name} />
                                <p>{roof.name}</p>
                                <p>💵 ${roof.price}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeGrid === wheels && (
                    <div className="grid">
                        {wheels.map((wheel, index) => (
                            <div key={index} className="grid-item">
                                <img src={wheel.image} alt={wheel.name} />
                                <p>{wheel.name}</p>
                                <p>💵 ${wheel.price}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeGrid === interiors && (
                    <div className="grid">
                        {interiors.map((interior, index) => (
                            <div key={index} className="grid-item">
                                <img src={interior.image} alt={interior.name} />
                                <p>{interior.name}</p>
                                <p>💵 ${interior.price}</p>
                            </div>
                        ))}
                    </div>
                )}
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
                        <button>Update</button>
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
            </main>
        </article>
    )
};


export default CardDetails;
