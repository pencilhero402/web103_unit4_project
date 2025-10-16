const API_URL = 'http://localhost:3000/api/interiors'
const InteriorsAPI = {
    getAllInteriors: async() => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data;
        } catch(error) {
            throw error;
        }
    },
};

export default InteriorsAPI;