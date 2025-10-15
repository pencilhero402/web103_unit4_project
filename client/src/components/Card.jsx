import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = ( { id, name, convertible, exterior_color, roof_name, wheel_name, interior_name, cost } ) => {
    
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
                    💰 $
                    <p>{cost}</p>
                    <a href= {`/customcars/${id}`} role="button">Details</a>
                </div>
            </div>
        </article>
    )
};


export default Card;