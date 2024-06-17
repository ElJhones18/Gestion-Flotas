import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Form, Modal } from "antd";
import { PATHS } from "../../../utils/config";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import iconGreen from "../../../uploads/marks/green-mark.svg";
import iconRed from "../../../uploads/marks/red-mark.svg";
import AsyncSelect from 'react-select/async';
import './CreateTravelComponent.css';

const { Option } = Select;

export const CreateTravelComponent = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState('');
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [mapCenter, setMapCenter] = useState([4.570868, -74.297333]); // Center map on Colombia
  const [mapReady, setMapReady] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [routingControl, setRoutingControl] = useState(null);
  const [instructions, setInstructions] = useState('');

  const [trucks, setTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState('');

  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

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
      const response = await axios.post(URL, travel, {
        headers: {
            'Content-Type': 'application/json'
        }
      });
      console.log(response);
    } catch (error) {
      console.error("Error creating travel", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchTrucks();
  }, []);

  const fetchDrivers = async () =>  {
    try {
      const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_USERS;
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

  const RouteDrawer = ({ origin, destination }) => {
    const map = useMap();
    const instructionsRef = useRef();

    useEffect(() => {
      if (origin && destination) {
        if (routingControl) {
          routingControl.getPlan().setWaypoints([
            L.latLng(origin[0], origin[1]),
            L.latLng(destination[0], destination[1])
          ]);
        } else {
          const control = L.Routing.control({
            waypoints: [
              L.latLng(origin[0], origin[1]),
              L.latLng(destination[0], destination[1])
            ],
            language: 'es',
            createMarker: function(i, wp) {
              return L.marker(wp.latLng, {
                icon: i === 0 ? originIcon : destinationIcon
              });
            },
            routeWhileDragging: true,
            lineOptions: {
              styles: [{ color: '#5980ad', opacity: 1, weight: 5 }]
            }

          }).addTo(map);

          control.on('routesfound', function (e) {
            const routes = e.routes;
            const summary = routes[0].summary;
            setDistance(`${(summary.totalDistance / 1000).toFixed(1)} km`);
            setInstructions(routes[0].instructions.map((instr, index) => (
              <div key={index} className="instruction-item">
              <span>{instr.text}</span>
              <span>{instr.distance.toFixed(0)} m</span>
            </div>
            )));
          });

          setRoutingControl(control);
        }
      }
    }, [origin, destination, map, routingControl]);
    return null;
  };

  const handleMapLoad = () => {
    setMapReady(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={() => navigate(-1)}>Volver</Button>
      <h2>Crear Viaje</h2>
      <Form
        layout="inline"
        className="inline-form"
        onFinish={handleSubmit}>
        <Form.Item label="Distancia">
          <Input
            id="distance"
            value={distance}
            readOnly
          />
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

      {/* MAPA */}
      <MapContainer center={mapCenter} zoom={6} style={{ height: "400px", width: "100%"}} whenCreated={handleMapLoad}>
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
        <RouteDrawer origin={origin} destination={destination} />
      </MapContainer>

      {/* INSTRUCCIONES */}
      <Button type="primary" onClick={showModal}>
        Ver Instrucciones
      </Button>
      <Modal title="Instrucciones de Ruta" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="modal-content">{instructions}</div>
      </Modal>
    </>
  );
};
