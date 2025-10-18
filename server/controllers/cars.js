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
                    exteriors.price AS exterior_cost,
                    roofs.name AS roof_name,
                    roofs.price AS roof_cost,
                    wheels.name AS wheel_name,
                    wheels.price AS wheel_cost,
                    interiors.name AS interior_name,
                    interiors.price AS interior_cost
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

    getCarById: async (req, res) => {
        const { id } = req.params;
        
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
                exteriors.image AS exterior_image,
                exteriors.price AS exterior_cost,
                roofs.name AS roof_name,
                roofs.image AS roof_image,
                roofs.price AS roof_cost,
                wheels.name AS wheel_name,
                wheels.image AS wheel_image,
                wheels.price AS wheel_cost,
                interiors.name AS interior_name,
                interiors.image AS interior_image,
                interiors.price AS interior_cost
            FROM cars
            LEFT JOIN exteriors ON cars.exterior_id = exteriors.id
            LEFT JOIN roofs ON cars.roof_id = roofs.id
            LEFT JOIN wheels ON cars.wheel_id = wheels.id
            LEFT JOIN interiors ON cars.interior_id = interiors.id
            WHERE cars.id = $1
        `;
        try {
            const result = await pool.query(query, [id]);
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error fetching car by id:', error);
            res.status(409).json({error: error.message}); 
        }
    },

    updateCar: async (req, res) => {
        const { id } = req.params;
        const { exterior_id, roof_id, wheel_id, interior_id } = req.body;
        try {
            const query = `
                UPDATE cars
                SET 
                    exterior_id = $1,
                    roof_id = $2, 
                    wheel_id = $3,
                    interior_id = $4
                WHERE id = $5
                RETURNING *;
            `;
            const values = [exterior_id, roof_id, wheel_id, interior_id, id];
            const result = await pool.query(query, values)
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(409).json({error: error.message}); 
        }
    },

    deleteCar: async(req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID is required to delete the car' });
        }

        try {
            const query = `DELETE FROM cars WHERE id = $1 RETURNING *;`
            const result = await pool.query(query, [id])
            res.status(200).json({message: `Car with ID ${id} deleted successfully`, car: result.rows[0]});
        } catch (error) {
            res.status(409).json({error: error.message})
        }
    },
};

export default CarsController;