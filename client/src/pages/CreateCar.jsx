import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import '../App.css'
import './CreateCar.css'
import CarsAPI from '../services/CarsAPI'
import ExteriorsAPI from '../services/ExteriorsAPI'
import RoofsAPI from '../services/RoofsAPI'
import WheelsAPI from '../services/WheelsAPI'
import InteriorsAPI from '../services/InteriorsAPI'

Modal.setAppElement('#root');

const CreateCar = () => {
    const price = 65000;

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeGrid, setActiveGrid] = useState(null); // For active selection (exterior, roof, etc.)

    // Initialize API data
    const [carName, setCarName] = useState('');
    const [exteriors, setExteriors] = useState([]);
    const [roofs, setRoofs] = useState([]);
    const [wheels, setWheels] = useState([]);
    const [interiors, setInteriors] = useState([]);

    // State for selected items
    const [selectedExterior, setSelectedExterior] = useState([]);
    const [selectedRoof, setSelectedRoof] = useState([]);
    const [selectedWheel, setSelectedWheel] = useState([]);
    const [selectedInterior, setSelectedInterior] = useState([]);
    const [isConvertible, setIsConvertible] = useState(false);

    const handleCheckboxChange = () => {
        setIsConvertible(!isConvertible)
    }

    // Fetch data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [exteriorsData, roofsData, wheelsData, interiorsData] = await Promise.all([
                    ExteriorsAPI.getAllExteriors(),
                    RoofsAPI.getAllRoofs(),
                    WheelsAPI.getAllWheels(),
                    InteriorsAPI.getAllInteriors()
                ]);

                setExteriors(exteriorsData);
                setRoofs(roofsData);
                setWheels(wheelsData);
                setInteriors(interiorsData);

                console.log("Fetched exteriors data: ", exteriors);
                console.log("Fetched roofs data: ", roofs);
                console.log("Fetched wheels data: ", wheels);
                console.log("Fetched interiors data: ", interiors);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    // Post data
    const postCar =  async () => {
        try {
            if (!carName || !selectedExterior || !selectedRoof || !selectedWheel || !selectedInterior || price == null) {
            alert("Please fill in all required fields.");
            return; 
        }
            const carData = {
                name: carName,
                convertible: isConvertible,
                exterior_id: selectedExterior.id,
                roof_id: selectedRoof.id,
                wheel_id: selectedWheel.id,
                interior_id: selectedInterior.id,
                cost: price,
            };
            const response = await CarsAPI.createCar(carData);
        } catch (error) {
            throw error;
        }
    }

    const openGridModal = (gridType) => {
        setActiveGrid(gridType)
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleSelectItem = (item) => {
        switch (activeGrid) {
            case 'exteriors':
                setSelectedExterior(item);
                break;
            case 'roofs':
                setSelectedRoof(item);  
                break;
            case 'wheels':
                setSelectedWheel(item); 
                break;
            case 'interiors':
                setSelectedInterior(item);
                break;
            default:
                break;
        }
    };

    // Input car name
    const handleInputChange = (e) => {
        setCarName(e.target.value);
    };

    const calculateTotal = () => {
        const baseTotal = 
            price +
            (selectedExterior?.price || 0)+
            (selectedRoof?.price || 0)+
            (selectedWheel?.price || 0) +
            (selectedInterior?.price || 0)
        const total = isConvertible ? baseTotal + 5000 : baseTotal;
        return total;
    };

    const checkConvertible = (item) => {
        if (item.isconvertibleonly && !isConvertible) {
            alert("Convertible only");
        } else {
            handleSelectItem(item); // Otherwise, proceed with selection
        }
    };

    return (
        <div>
            <main>
                <header>
                    <div className="create-car">
                        <label>
                            <input id="isConvertible" type="checkbox" checked={isConvertible} onChange={handleCheckboxChange}></input>
                            Convertible
                        </label>
                        <div className="create-car-options">
                            <div id="customization-options" className="car-options">
                                <div id="car-options">
                                    <button onClick={() => openGridModal('exteriors')}>Exterior</button>
                                </div>
                                <div id="car-options">
                                    <button onClick={() => openGridModal('roofs')}>Roof</button>
                                </div>
                                <div id="car-options">
                                    <button onClick={() => openGridModal('wheels')}>Wheel</button>
                                </div>
                                <div id="car-options">
                                    <button onClick={() => openGridModal('interiors')}>Interior</button>
                                </div>
                                <div className="create-car-price">
                                    💰$ {calculateTotal()}
                                </div>
                            </div>
                        </div>
                        <div className="create-car-name">
                            <input 
                                type="text"
                                id="name"
                                name="name"
                                placeholder="My New Car"
                                value={carName}
                                onChange={handleInputChange}></input>
                            <input 
                                type="submit" 
                                className="create-car-button" 
                                value="Create"
                                onClick={() => postCar()}></input>
                        </div>
                    </div>
                </header>
            </main>

            {/* ----- Modal ----- */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Select Option"
                className="custom-modal-content"
                overlayClassName="custom-modal-overlay"
            >
                <div className="grid">
                    {(activeGrid === 'exteriors' ? exteriors :
                        activeGrid === 'roofs' ? roofs :
                        activeGrid === 'wheels' ? wheels : interiors)
                        .map((item, index) => (
                            <div
                                key={index}
                                className={`grid-item ${item.id === (activeGrid === 'exteriors' ? selectedExterior.id :
                                    activeGrid === 'roofs' ? selectedRoof.id :
                                    activeGrid === 'wheels' ? selectedWheel.id : selectedInterior.id)
                                    ? 'selected' : ''}`}
                                style={{ backgroundImage: `url(${item.image})` }}
                                onClick={() => checkConvertible(item)}
                            >
                                <div className="grid-item-overlay">
                                    <div className="grid-item-detail">
                                        <p>{item.name || item.color} <br /> 💵 ${item.price} <br /> {item.isconvertibleonly ? 'Convertible Only' : ''} </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <button onClick={closeModal}>Done</button>
            </Modal>
        </div>
    )
}

export default CreateCar