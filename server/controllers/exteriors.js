import { pool } from '../config/database.js'

const ExteriorsController = {
    getExteriors: async(req, res) => {
        try {
            const query = `SELECT * FROM exteriors;`
            const results = await pool.query(query)
            res.status(200).json(results.rows)
        } catch (error) {
            res.status(409).json({error: error.message})
        }
    }
};

export default ExteriorsController;