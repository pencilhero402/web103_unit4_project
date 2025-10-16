const API_URL = 'http://localhost:3000/api/roofs'
const RoofsAPI = {
    getAllRoofs: async() => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data;
        } catch(error) {
            throw error;
        }
    },
};

export default RoofsAPI;