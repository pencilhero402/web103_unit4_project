import { pool } from '../config/database.js';

const CarsController = {
    createCar: async (req, res) => {
        try {
            const { name, convertible, exterior_id, roof_id, wheel_id, interior_id, cost } = req.body
            const results = await pool.query(`
                INSERT INTO cars (name, convertible, exterior_id, roof_id, wheel_id, interior_id, cost) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, convertible, exterior_id, roof_id, wheel_id, interior_id, cost])
            res.status(200).json(results.rows[0])
        } catch(error) {
            res.status(409).json({error: error.message});
        }
    },

    getCars: async (req, res) => {
        try {
            const query = `
                SELECT
                    cars.id,
                    cars.name,
                    cars.convertible,
                    cars.exterior_id,
                    cars.roof_id,
                    cars.wheel_id,
                    cars.interior_id,
                    cars.cost,
                    exteriors.color AS exterior_color,
                    roofs.name AS roof_name,
                    wheels.name AS wheel_name,
                    interiors.name AS interior_name
                FROM cars
                LEFT JOIN exteriors ON cars.exterior_id = exteriors.id
                LEFT JOIN roofs ON cars.roof_id = roofs.id
                LEFT JOIN wheels ON cars.wheel_id = wheels.id
                LEFT JOIN interiors ON cars.interior_id = interiors.id
                ORDER BY id ASC;
                `
            const results = await pool.query(query);
            res.status(200).json(results.rows);
        } catch(error) {
            res.status(409).json({error: error.message});        
        }
    },
};

export default CarsController;