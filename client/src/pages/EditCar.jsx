import React, { useEffect, useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import EditCard from '../components/EditCard'
import CarsAPI from '../services/CarsAPI'

const EditCar = () => {
    const { id } = useParams();
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        const fetchCarData = async () => {
            try {
                const data = await CarsAPI.getCarById(id)
                setCarData(data)
                setLoading(false)
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchCarData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="car">
            <main>
                {carData && <EditCard {...carData} />}
            </main>
        </div>
    )
}

export default EditCar