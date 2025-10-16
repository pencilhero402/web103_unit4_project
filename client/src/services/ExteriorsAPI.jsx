const API_URL = 'http://localhost:3000/api/exteriors'
const ExteriorsAPI = {
    getAllExteriors: async() => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data;
        } catch(error) {
            throw error;
        }
    },
};

export default ExteriorsAPI;