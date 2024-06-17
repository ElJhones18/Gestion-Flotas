import { useEffect, useState } from "react";
import { PATHS } from "../../../utils/config";
import axios from "axios";

export const CreateStopComponent = () => {
    const [direction, setDirection] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [travels, setTravels] = useState([]);
    const [selectedTravel, setSelectedTravel] = useState('');

    const handleSubmit = async () => {
        const stop = {
            direction,
            latitude,
            longitude,
            travelId: selectedTravel,
        };
        console.log(stop);

        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.CREATE_STOP;
            console.log("Entra la URL",URL);
            console.log("Entra el stop",stop);

            const response = await axios.post(URL, stop, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);

        } catch (error) {
            console.error('Error creating stop:', error);
        }
    };

    useEffect(() => {
        fetchTravels();
    }, []);

    const fetchTravels = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_TRAVELS;
            // console.log(URL);
            const response = await axios.get(URL);
            const travels = response.data;
            console.log(travels);
            setTravels(travels);
        } catch (error) {
            console.error('Error fetching travels:', error);
        }
    };

    return (
        <div>
            <h1>Create Stop</h1>
            <form>
                <div>
                    <label htmlFor="direction">Direction:</label>
                    <input
                        type="text"
                        id="direction"
                        name="direction"
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="latitude">Latitude:</label>
                    <input
                        type="text"
                        id="latitude"
                        name="latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="longitude">Longitude:</label>
                    <input
                        type="text"
                        id="longitude"
                        name="longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="travel">Travel:</label>
                    <select
                        id="travel"
                        name="travel"
                        value={selectedTravel}
                        onChange={(e) => setSelectedTravel(e.target.value)}
                    >
                        <option value="">Select a travel</option>
                        {travels.map((travel) => (
                            <option key={travel.id} value={travel.id}>
                                {travel.origin} - {travel.destination}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="button" onClick={handleSubmit}>
                    Create Stop
                </button>
            </form>
        </div>
    );
}