import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../App.css'
import CardDetails from '../components/CardDetails.jsx'
import CarsAPI from '../services/CarsAPI'

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null)
    const [error, setError] = useState(null)

    const handleDelete = async(id) => {
        await CarsAPI.deleteCar(id)
    };

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                setError(null)
                const carData = await CarsAPI.getCarById(id);
                setCar(carData);
            } catch (error) {
                setError("Failed to fetch car details");
                console.error("Error fetching car details:", error);
            }
        };
        if (id) {
            fetchCarData();
        } else {
            setError("Invalid car ID")
        }
    }, [id]);

    if (error) {
        return <div>{error}</div>
    }
    if (!car) {
            return <div>Loading car details...</div>
        }

    return (
        <div className="Car">
            <main>
                <CardDetails
                    key={car.id}                            
                    id={car.id}
                    name={car.name}
                    convertible={car.convertible}
                    exterior_id={car.exterior_id}
                    exterior_color={car.exterior_color}
                    exterior_image={car.exterior_image}
                    exterior_cost={car.exterior_cost}
                    roof_id={car.roof_id}
                    roof_name={car.roof_name}
                    roof_image={car.roof_image}
                    roof_cost={car.roof_cost}
                    wheel_id={car.wheel_id}
                    wheel_name={car.wheel_name}
                    wheel_image={car.wheel_image}
                    wheel_cost={car.wheel_cost}
                    interior_id={car.interior_id}
                    interior_name={car.interior_name}
                    interior_image={car.interior_image}
                    interior_cost={car.interior_cost}
                    cost={car.cost}
                    onDelete={handleDelete}
                    />
            </main>
        </div>
    )
}

export default CarDetails;