import { pool } from './database.js'
import './dotenv.js'
import carData from '../data/cars.js'
import exteriorData from '../data/exteriors.js'
import roofData from '../data/roofs.js'
import wheelData from '../data/wheels.js'
import interiorData from '../data/interiors.js'

const createCarsTable = async () => {
    const createCarsQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            convertible BOOLEAN,
            exterior_id INTEGER REFERENCES exteriors(id),
            roof_id INTEGER REFERENCES roofs(id),
            wheel_id INTEGER REFERENCES wheels(id),
            interior_id INTEGER REFERENCES interiors(id),
            cost INTEGER NOT NULL
        );
    `
    try {
        const res = await pool.query(createCarsQuery)
        console.log('🚗 cars table create successfully')
    } catch (err) {
        console.error('⚠️ error creating cars table', err)
    }
}

const createExteriorsTable = async () => {
    const createExteriorsQuery = `
    CREATE TABLE IF NOT EXISTS exteriors (
        id SERIAL PRIMARY KEY,
        color VARCHAR(100) NOT NULL UNIQUE,
        price INTEGER NOT NULL,
        image VARCHAR(500) NOT NULL
    );
    `
    try {
        const res = await pool.query(createExteriorsQuery)
        console.log('😎 exteriors table create successfully')
    } catch (err) {
        console.error('⚠️ error creating exteriors table', err)
    }
};

const createRoofsTable = async () => {
    const createRoofsQuery = `
    CREATE TABLE IF NOT EXISTS roofs (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        price INTEGER NOT NULL,
        image VARCHAR(500) NOT NULL
    );
    `
    try {
        const res = await pool.query(createRoofsQuery)
        console.log('🏠 roofs table create successfully')
    } catch (err) {
        console.error('⚠️ error creating roofs table', err)
    }
};

const createWheelsTable = async () => {
    const createWheelsQuery = `
    CREATE TABLE IF NOT EXISTS wheels (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        price INTEGER NOT NULL,
        image VARCHAR(500) NOT NULL
    );
    `
    try {
        const res = await pool.query(createWheelsQuery)
        console.log('🛞 wheels table create successfully')
    } catch (err) {
        console.error('⚠️ error creating wheels table', err)
    }
};

const createInteriorsTable = async () => {
    const createInteriorsQuery = `
    CREATE TABLE IF NOT EXISTS interiors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        price INTEGER NOT NULL,
        image VARCHAR(500) NOT NULL
    );
    `
    try {
        const res = await pool.query(createInteriorsQuery)
        console.log('🚘 interiors table create successfully')
    } catch (err) {
        console.error('⚠️ error creating interiors table', err)
    }
};

const seedExteriorsTable = async() => {
    await createExteriorsTable();

    exteriorData.forEach((exterior) => {
        const insertQuery = {
            text: 'INSERT INTO exteriors (color, price, image) VALUES ($1, $2, $3) ON CONFLICT (color) DO NOTHING;' 
        }

        const values = [
            exterior.color,
            exterior.price,
            exterior.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting exteriors', err)
                return
            }
            console.log(`✅ ${exterior.color} added successfully`)
            })
    })
};

const seedRoofsTable = async() => {
    await createRoofsTable();

    roofData.forEach((roof) => {
        const insertQuery = {
            text: 'INSERT INTO roofs (name, price, image) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING;'
        }

        const values = [
            roof.name,
            roof.price,
            roof.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting roofs', err)
                return
            }
            console.log(`✅ ${roof.name} added successfully`)
            })
    })
};

const seedWheelsTable = async() => {
    await createWheelsTable();

    wheelData.forEach((wheel) => {
        const insertQuery = {
            text: 'INSERT INTO wheels (name, price, image) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING;'
        }

        const values = [
            wheel.name,
            wheel.price,
            wheel.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting wheels', err)
                return
            }
            console.log(`✅ ${wheel.name} added successfully`)
            })
    })
};

const seedInteriorsTable = async() => {
    await createInteriorsTable();

    interiorData.forEach((interior) => {
        const insertQuery = {
            text: 'INSERT INTO interiors (name, price, image) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING;'
        }

        const values = [
            interior.name,
            interior.price,
            interior.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting interiors', err)
                return
            }
            console.log(`✅ ${interior.name} added successfully`)
            })
    })
};

const seedCarsTable = async () => {
    await createCarsTable();

    carData.forEach((car) => {
        const insertQuery = {
            text: 'INSERT INTO cars (name, convertible, exterior_id, roof_id, wheel_id, interior_id, cost) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }

        const values = [
            car.name,
            car.convertible,
            car.exterior_id,
            car.roof_id,
            car.wheel_id,
            car.interior_id,
            car.cost
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting cars', err)
                return
            }
            console.log(`✅ ${car.name} added successfully`)
            })
    })
};

async function seedAllTables() {
    await seedExteriorsTable()
    await seedRoofsTable()
    await seedWheelsTable()
    await seedInteriorsTable()
    await seedCarsTable()
}

seedAllTables()
