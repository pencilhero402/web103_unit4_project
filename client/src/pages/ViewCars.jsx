import '../App.css'
import Card from '../components/Card.jsx'

const ViewCars = ({ title, cars }) => {
    return (
        <div className="Cars">
            <main>
                {
                    cars && cars.length > 0 ?
                    cars.map((car) =>
                        <Card
                            key={car.id}                            
                            id={car.id}
                            name={car.name}
                            convertible={car.convertible}
                            exterior_id={car.exterior_id}
                            exterior_color={car.exterior_color}
                            roof_id={car.roof_id}
                            roof_name={car.roof_name}
                            wheel_id={car.wheel_id}
                            wheel_name={car.wheel_name}
                            interior_id={car.interior_id}
                            interior_name={car.interior_name}
                            cost={car.cost}
                            />
                    ) : (
                    <h3 className="noResults">{'😢 No Cars Available'}</h3>
                    )
                }
            </main>
        </div>
    )
}

export default ViewCars