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
            window.location = '/customcars';
            return data;
        } catch (error) {
            console.error("Error fetching car by ID:", error)
            throw new Error(error.message || 'Failed to update car');
        }
    },
};

export default CarsAPI;