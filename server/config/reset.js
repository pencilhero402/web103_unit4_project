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

    for (const exterior of exteriorData) {
        try {
            const insertQuery = {
                text: 'INSERT INTO exteriors (color, price, image) VALUES ($1, $2, $3) ON CONFLICT (color) DO NOTHING;',
                values: [exterior.color,exterior.price,exterior.image]
            }
            await pool.query(insertQuery)
            console.log(`✅ ${exterior.color} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting exteriors', err)
            return
        }
    }
};

const seedRoofsTable = async() => {
    await createRoofsTable();

    for (const roof of roofData) {
        try {
            const insertQuery = {
                text: 'INSERT INTO roofs (name, price, image) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING;',
                values: [roof.name, roof.price, roof.image]
            }
            await pool.query(insertQuery)
            console.log(`✅ ${roof.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting roofs', err)
            return
        }
    }
};

const seedWheelsTable = async() => {
    await createWheelsTable();

    for (const wheel of wheelData) {
        try {
            const insertQuery = {
                text: 'INSERT INTO wheels (name, price, image) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING;',
                values: [wheel.name, wheel.price, wheel.image]
            }
            await pool.query(insertQuery)
            console.log(`✅ ${wheel.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting wheels', err)
            return
        }
    }
};

const seedInteriorsTable = async() => {
    await createInteriorsTable();

    for (const interior of interiorData) {
        try {
            const insertQuery = {
                text: 'INSERT INTO interiors (name, price, image) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING;',
                values: [interior.name, interior.price, interior.image]
            }
            await pool.query(insertQuery)
            console.log(`✅ ${interior.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting interiors', err)
            return
        }
    }
};

const seedCarsTable = async () => {
    await createCarsTable();
    
    for (const car of carData) {
        try {
            const insertQuery = {
                text: 'INSERT INTO cars (name, convertible, exterior_id, roof_id, wheel_id, interior_id, cost) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                values: [car.name, car.convertible, car.exterior_id, car.roof_id, car.wheel_id, car.interior_id, car.cost]
            }
            await pool.query(insertQuery)
            console.log(`✅ ${car.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting cars', err)
            return
        }
    }
};

async function seedAllTables() {
    await seedExteriorsTable()
    await seedRoofsTable()
    await seedWheelsTable()
    await seedInteriorsTable()
    await seedCarsTable()
}

seedAllTables()
