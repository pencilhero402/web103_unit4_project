import React, { useEffect, useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import EditCard from '../components/EditCard'
import CarsAPI from '../services/CarsAPI'
import ExteriorsAPI from '../services/ExteriorsAPI'
import RoofsAPI from '../services/RoofsAPI'
import WheelsAPI from '../services/WheelsAPI'
import InteriorsAPI from '../services/InteriorsAPI'

const EditCar = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch carData
    const [carData, setCarData] = useState(null);

    // Fetch exteriorsData
    const [exteriors, setExteriorsData] = useState([]);

    // Fetch roofsData
    const [roofs, setRoofsData] = useState([]);

    // Fetch wheelsData
    const [wheels, setWheelsData] = useState([]);

    // Fetch interiorsData
    const [interiors, setInteriorsData] = useState([]);

    // Update carData
    const handleUpdate = async(updatedCarData) => {
        CarsAPI.updateCar(id, updatedCarData)
    };

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [carData, exteriorsData, roofsData, wheelsData, interiorsData] = await Promise.all([
                    CarsAPI.getCarById(id),
                    ExteriorsAPI.getAllExteriors(),
                    RoofsAPI.getAllRoofs(),
                    WheelsAPI.getAllWheels(),
                    InteriorsAPI.getAllInteriors()
                ]);

                setCarData(carData);
                setExteriorsData(exteriorsData);
                setRoofsData(roofsData);
                setWheelsData(wheelsData);
                setInteriorsData(interiorsData);

                //console.log("Fetched car data: ", carData);
                //console.log("Fetched exteriors data: ", exteriorsData);
                //console.log("Fetched roofs data: ", roofsData);
                //console.log("Fetched wheels data: ", wheelsData);
                //console.log("Fetched interiors data: ", interiorsData);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
                //console.log("Finished")
            }
        };

        fetchAllData();
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
                {carData && (
                    <EditCard 
                        carData={carData} 
                        exteriors={exteriors}
                        roofs={roofs}
                        wheels={wheels}
                        interiors={interiors}
                        onUpdate={handleUpdate}
                    />)}
            </main>
        </div>
    )
}

export default EditCar