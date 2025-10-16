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
            console.log(`${API_URL}/${id}`)
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
};

export default CarsAPI;