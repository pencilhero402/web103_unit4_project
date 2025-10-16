import React, { useState, useEffect } from 'react'
import '../App.css'
import Card from '../components/Card.jsx'
import CarsAPI from '../services/CarsAPI'

const ViewCars = () => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const carsData = await CarsAPI.getAllCars()
                setCars(carsData)

                console.log(carsData)
            } catch (error) {
                throw error
            }
        }) ()
    }, [])

    return (
        <div className="Cars">
            <main>
                {
                    cars && cars.length > 0 ?
                    cars.map((car) =>
                        <Card
                            key={car.id}                            
                            id={car.id}
                            name={car.name}
                            convertible={car.convertible}
                            exterior_id={car.exterior_id}
                            exterior_color={car.exterior_color}
                            exterior_cost={car.exterior_cost}
                            roof_id={car.roof_id}
                            roof_name={car.roof_name}
                            roof_cost={car.roof_cost}
                            wheel_id={car.wheel_id}
                            wheel_name={car.wheel_name}
                            wheel_cost={car.wheel_cost}
                            interior_id={car.interior_id}
                            interior_name={car.interior_name}
                            interior_cost={car.interior_cost}
                            cost={car.cost}
                            />
                    ) : (
                    <h3 className="noResults">{'😢 No Cars Available'}</h3>
                    )
                }
            </main>
        </div>
    )
}

export default ViewCars