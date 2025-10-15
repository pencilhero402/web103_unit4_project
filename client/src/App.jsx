import React, { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import './App.css'
import Card from './components/Card'

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const url = 'http://localhost:3000/api/cars';
      const response = await fetch(url);
      const json = await response.json();
      //console.log(json)

      setCars(json);
      return json;
    }
    fetchCars();
  }, []);

  let element = useRoutes([
    {
      path: '/',
      element: (<>
        <CreateCar title='BOLT BUCKET | Customize' />
      </>
      )
    },
    {
      path:'/customcars',
      element: (
        <>
          <ViewCars title='BOLT BUCKET | Custom Cars' cars={cars}/>
        </>
      )
    },
    {
      path: '/customcars/:id',
      element: <CarDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='BOLT BUCKET | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App