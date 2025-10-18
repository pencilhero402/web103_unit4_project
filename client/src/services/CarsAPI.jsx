const API_URL = 'http://localhost:3000/api/cars'
const CarsAPI = {
    getAllCars: async() => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data;
        } catch(error) {
            throw error;
        }
    },

    getCarById: async(id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`)
            if (!response.ok) {
                throw new Error(`Car with ID ${id} not found`);
            }
            const data = await response.json();
            return data
        } catch(error) {
            console.error("Error fetching car by ID:", error)
            throw new Error(error.message)
        }
    },

    updateCar: async(id, updatedData) => {
        try {
            const options = {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            };

            const response = await fetch(`${API_URL}/${id}`, options)
            if (!response.ok) {
                throw new Error(`Car with ID ${id} not found`)
            }
            const data = await response.json();
            window.location = `/customcars/${id}`;
            return data;
        } catch (error) {
            console.error("Error fetching car by ID:", error)
            throw new Error(error.message || 'Failed to update car');
        }
    },

    createCar: async (carData) => {
        try {
            const requestBody = {
                name: carData.name,
                convertible: carData.convertible,
                exterior_id: carData.exterior_id,
                roof_id: carData.roof_id,
                wheel_id: carData.wheel_id,
                interior_id: carData.interior_id,
                cost: carData.cost
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            }
            const response = await fetch(`${API_URL}`, options)
            const data = await response.json()
            window.location = `/customcars`;
            return data
        } catch (error) {
            throw error;
        }
    },

    deleteCar: async(id) => {
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await fetch(`${API_URL}/${id}`, options)
            const data = await response.json()
            window.location = `/customcars`;
            return data
        } catch (error) {
            throw error;
        }
    },
};

export default CarsAPI;