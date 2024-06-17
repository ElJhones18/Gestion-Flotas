import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Form } from "antd";
import { PATHS } from "../../../utils/config";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AsyncSelect from 'react-select/async';
import L from "leaflet";
import iconGreen from "../../../uploads/marks/green-mark.svg";
import iconRed from "../../../uploads/marks/red-mark.svg";

const { Option } = Select;

export const CreateTravelComponent = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState('');
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [mapCenter, setMapCenter] = useState([4.570868, -74.297333]); // Center map on Colombia
  const [mapReady, setMapReady] = useState(false);

  const [trucks, setTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState('');

  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

  // Define custom icons
  const originIcon = L.icon({
    iconUrl: iconGreen, 
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const destinationIcon = L.icon({
    iconUrl: iconRed, 
    iconSize: [25, 41], 
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const fetchSuggestions = async (inputValue) => {
    if (!inputValue) {
      return [];
    }
    try {
      const response = await axios.get(`https://graphhopper.com/api/1/geocode?q=${inputValue}, Colombia&locale=es&key=bc2c1444-a0c2-4cad-8814-6f196228c9fe`);
      console.log("API Response:", response.data);
      return response.data.hits.map(hit => ({
        label: `${hit.name}, ${hit.country}`,
        value: [hit.point.lat, hit.point.lng],
      }));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };

  const handleOriginChange = (selectedOption) => {
    setOrigin(selectedOption.value);
    updateBounds(selectedOption.value, destination);
  };

  const handleDestinationChange = (selectedOption) => {
    setDestination(selectedOption.value);
    updateBounds(origin, selectedOption.value);
  };

  const updateBounds = (origin, destination) => {
    if (origin && destination) {
      setBounds([origin, destination]);
    } else if (origin) {
      setBounds([origin]);
    } else if (destination) {
      setBounds([destination]);
    }
  };

  const [bounds, setBounds] = useState(null);

  const handleSubmit = async () => {
    const travel = {
      distance,
      origin,
      destination,
      driverId: selectedDriver,
      truckId: selectedTruck
    };

    try {
      const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.CREATE_TRAVEL;
      console.log("Entra la url", URL);
      console.log("Travel data:", travel);

      const response = await axios.post(URL, travel, {
        headers: {
            'Content-Type': 'application/json'
        }
      });
      console.log(response);
      
    } catch (error) {
      console.error("Error creating travel", error);
      console.error("Response data:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchTrucks();
  }, []);

  const fetchDrivers = async () =>  {
    try {
      const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_USERS;
      console.log(URL);
      const response = await axios.get(URL);
      const drivers = response.data.filter((driver) => driver.rol === 'Conductor');
      setDrivers(drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const fetchTrucks = async () => {
    try {
      const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_TRUCKS;
      const response = await axios.get(URL);
      setTrucks(response.data);
    } catch (error) {
      console.error("Error fetching trucks", error);
    }
  };

  const MapUpdater = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
      if (bounds && mapReady) {
        map.fitBounds(bounds);
      }
    }, [bounds, mapReady]);
    return null;
  };

  const handleMapLoad = () => {
    setMapReady(true);
  };

  return (
    <>
      <Button onClick={() => navigate(-1)}>Volver</Button>
      <h2>Crear Viaje</h2>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        labelWrap={true}
        onFinish={handleSubmit}>
        <Form.Item label="Distancia" name="distance" rules={[{ required: true }]}>
          <Input
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required />
        </Form.Item>

        <Form.Item label="Origen" name="origin" rules={[{ required: true }]}>
          <AsyncSelect
            cacheOptions
            loadOptions={fetchSuggestions}
            onChange={handleOriginChange}
            defaultOptions
          />
        </Form.Item>

        <Form.Item label="Destino" name="destination" rules={[{ required: true }]}>
          <AsyncSelect
            cacheOptions
            loadOptions={fetchSuggestions}
            onChange={handleDestinationChange}
            defaultOptions
          />
        </Form.Item>

        <Form.Item label="Conductor" name="driver" rules={[{ required: true }]}>
          <Select value={selectedDriver} onChange={(value) => setSelectedDriver(value)}>
            {drivers.map((driver) => (
              <Option key={driver.id} value={driver.id}>
                {driver.username} {driver.lastname}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Camión" name="truckId" rules={[{ required: true }]}>
          <Select value={selectedTruck} onChange={(value) => setSelectedTruck(value)}>
            {trucks.map((truck) => (
              <Option key={truck.id} value={truck.id}>
                {truck.plate} - {truck.model}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">Crear Viaje</Button>
      </Form>

      <MapContainer center={mapCenter} zoom={6} style={{ height: "400px", width: "100%" }} whenCreated={handleMapLoad}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater bounds={bounds} />
        {origin && (
          <Marker position={origin} icon={originIcon}>
            <Popup>
              Origen
            </Popup>
          </Marker>
        )}
        {destination && (
          <Marker position={destination} icon={destinationIcon}>
            <Popup>
              Destino
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};
