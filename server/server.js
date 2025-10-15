import express from 'express'
import cors from 'cors'
import carsRouter from './routes/cars.js'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 3000;

// initalize express
const app = express();

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/', carsRouter)

// Root route
app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Bolt Bucket</h1>')
})

// listens for app on port 3000 for connections
app.listen(PORT, () => {
  console.log(`CONNECTED. Listing on port ${PORT}`)
})
