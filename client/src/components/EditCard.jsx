import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './CardDetails.css'

Modal.setAppElement('#root');

const CardDetails = ( { carData, exteriors, roofs, wheels, interiors, onUpdate, onDelete } ) => {
    
    // Open modal and set active grid type
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeGrid, setActiveGrid] = useState(null);

    // State to track modal selection
    const [selectedExterior, setSelectedExterior] = useState(exteriors.find(exterior => exterior.id === carData?.exterior_id) || exteriors[0]);
    const [selectedRoof, setSelectedRoof] = useState(roofs.find(roof => roof.id === carData?.roof_id || roofs[0]));
    const [selectedWheel, setSelectedWheel] = useState(wheels.find(wheel => wheel.id === carData?.wheel_id || wheels[0]));
    const [selectedInterior, setSelectedInterior] = useState(interiors.find(interior => interior.id === carData?.interior_id || interiors[0]));

    const openGridModal = (gridType) => {
        setActiveGrid(gridType)
        setIsModalOpen(true)
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

    const handleUpdate = () => {
        const updatedCarData = {
            exterior_id: selectedExterior.id,
            roof_id: selectedRoof.id,
            wheel_id: selectedWheel.id,
            interior_id: selectedInterior.id,
            };
        onUpdate(updatedCarData); 
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this car?");
        if (confirmDelete) {
            onDelete(carData.id);
        }
    };

     const calculateTotal = () => {
        return (
            carData.cost +
            selectedExterior.price +
            selectedRoof.price +
            selectedWheel.price +
            selectedInterior.price
        );
    };

    const checkConvertible = (item) => {
        if (item.isconvertibleonly && !carData.convertible) {
            alert("Convertible only");
        } else {
            handleSelectItem(item); // Otherwise, proceed with selection
        }
    };


    const [total, setTotal] = useState(calculateTotal());
    useEffect(() => {
        setTotal(calculateTotal());
    }, [selectedExterior, selectedRoof, selectedWheel, selectedInterior]);


    return (
        <article>
            <header>
                <h3 className="car-title">
                    <img src="https://boltbucket-exemplar.onrender.com/assets/coupe-6d0eccac.png" alt="car-image"></img>
                    {carData.name}
                </h3>
                <div className="header-buttons">
                    <button onClick={() => openGridModal('exteriors')}>Exterior</button>
                    <button onClick={() => openGridModal('roofs')}>Roof</button>
                    <button onClick={() => openGridModal('wheels')}>Wheels</button>
                    <button onClick={() => openGridModal('interiors')}>Interior</button>
                </div>

                <Modal 
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Select Option"
                    className="custom-modal-content"
                    overlayClassName="custom-modal-overlay"
                >
                    <div className="grid">
                        {(activeGrid === 'exteriors' ? exteriors : activeGrid === 'roofs' ? roofs : activeGrid === 'wheels' ? wheels : interiors).map((item, index) => (
                            <div 
                                key={index} 
                                className={`grid-item ${item.id === (activeGrid === 'exteriors' ? selectedExterior.id :
                                        activeGrid === 'roofs' ? selectedRoof.id :
                                            activeGrid === 'wheels' ? selectedWheel.id : selectedInterior.id)
                                        ? 'selected' : ''}`}
                                style={{ backgroundImage: `url(${item.image})` }}
                                onClick={() => checkConvertible(item)}>
                                <div className="grid-item-overlay">
                                    <div className="grid-item-detail">
                                        <p>{item.name || item.color} <br />
                                             💵 ${item.price}   <br />
                                             {item.isconvertibleonly ? 'Convertible Only' : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={closeModal}>Done</button>
                </Modal>

            </header>
            <main>
                <div className='details-content'>
                    <div className='car-details-price'>
                        <h2>💰 ${total}</h2>
                    </div>
                    <div className='car-selection' style={{backgroundImage: `url(${selectedExterior.image})`}}>
                        <div className='car-selection-overlay'>
                            <div className='car-selection-details'>
                                <p>
                                    <strong>🖌️ Exterior: </strong>
                                    {selectedExterior.color}
                                </p>
                                <div className='option-price'>
                                    <p>
                                        💵 $ {selectedExterior.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='car-selection' style={{backgroundImage: `url(${selectedRoof.image})`}}>
                        <div className='car-selection-overlay'>
                            <div className='car-selection-details'>
                                <p>
                                    <strong>😎 Roof: </strong>
                                    {selectedRoof.name}
                                </p>
                                <div className='option-price'>
                                    <p>
                                        💵 $ {selectedRoof.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='car-modify'>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                    <div className='car-selection' style={{backgroundImage: `url(${selectedWheel.image})`}}>
                        <div className='car-selection-overlay'>
                            <div className='car-selection-details'>
                                <p>
                                    <strong>🛴 Wheels: </strong>
                                    {selectedWheel.name}
                                </p>
                                <div className='option-price'>
                                    <p>
                                        💵 $ {selectedWheel.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='car-selection' style={{backgroundImage: `url(${selectedInterior.image})`}}>
                        <div className='car-selection-overlay'>
                            <div className='car-selection-details'>
                                <p>
                                    <strong>💺 Interior: </strong>
                                    {selectedInterior.name}
                                </p>
                                <div className='option-price'>
                                    <p>
                                        💵 $ {selectedInterior.price}
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
