import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Form, Modal, Divider } from "antd";
import { PATHS } from "../../../utils/config";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {
  CloseCircleOutlined,
  LeftCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import iconGreen from "../../../uploads/marks/green-mark.svg";
import iconRed from "../../../uploads/marks/red-mark.svg";
import AsyncSelect from 'react-select/async';
import './CreateTravelComponent.css';

const { Option } = Select;

const MARKER_PATH = 'M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z';

export const CreateTravelComponent = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState('');
  const [mapCenter, setMapCenter] = useState([4.570868, -74.297333]); // Center map on Colombia
  const [mapReady, setMapReady] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [routingControl, setRoutingControl] = useState(null);
  const [instructions, setInstructions] = useState('');

  const [trucks, setTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState('');
  const [selectedDriverTrucks, setSelectedDriverTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

  const [waypoints, setWaypoints] = useState([{ id: 1, location: null }, { id: 2, location: null }]);
  const [waypointLabels, setWaypointLabels] = useState({});

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

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

  const intermediateIcon = (number) => L.divIcon({
    html: `<div style="position: relative;"><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="37" stroke: none;><path d="${MARKER_PATH}" fill="#76d0f7" /><circle cx="190" cy="190" r="110" fill="white" /><text x="50%" y="50%" text-anchor="middle" style="font-size: 180px;" fill="black">${number}</text></svg></div>`,
    className: "custom-icon",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
  });

  const fetchSuggestions = async (inputValue) => {
    if (!inputValue) {
      return [];
    }
    try {
      const response = await axios.get(`https://graphhopper.com/api/1/geocode?q=${inputValue}&locale=es&key=bc2c1444-a0c2-4cad-8814-6f196228c9fe`);
      return response.data.hits.map(hit => ({
        label: `${hit.name}, ${hit.country}`,
        value: [hit.point.lat, hit.point.lng],
        name: hit.name,
      }));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };

  const handleWaypointChange = (index, selectedOption) => {
    const newWaypoints = [...waypoints];
    newWaypoints[index].location = selectedOption.value;

    const newLabels = { ...waypointLabels };
    newLabels[index] = selectedOption.label;
    setWaypointLabels(newLabels);

    setWaypoints(newWaypoints);
    updateBounds(newWaypoints);
    updateRoutingControl(newWaypoints);

    if (index === 0) {
      setOrigin(selectedOption.label);
      console.log("Origen",selectedOption.label);
    } else {
      setDestination(selectedOption.label);
      console.log("Destino",selectedOption.label);
    }
  };

  const addWaypoint = () => {
    setWaypoints([...waypoints.slice(0, waypoints.length - 1), { id: waypoints.length + 1, location: null }, waypoints[waypoints.length - 1]]);
  };

  const removeWaypoint = (index) => {
    const newWaypoints = waypoints.filter((_, wpIndex) => wpIndex !== index);

    const newLabels = { ...waypointLabels };
    delete newLabels[index];
    setWaypointLabels(newLabels);

    setWaypoints(newWaypoints);
    updateBounds(newWaypoints);
    updateRoutingControl(newWaypoints);
  };

  const updateBounds = (waypoints) => {
    const bounds = waypoints
      .map(waypoint => waypoint.location)
      .filter(location => location !== null);
    if (bounds.length > 0) {
      setBounds(bounds);
    }
  };

  const [bounds, setBounds] = useState(null);

  const handleSubmit = async () => {
    const travel = {
      distance,
      /* waypoints: waypoints.map(wp => wp.location), */
      origin,
      destination,
      driverId: selectedDriver,
      truckId: selectedTruck
    };

    try {
      console.log(travel);
      const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.CREATE_TRAVEL;
      console.log("Entra a la URL", URL);
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
  }, [selectedDriver]);

  const fetchDrivers = async () => {
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
      const trucks = response.data;
      if (selectedDriver) {
        const selectedDriverTrucks = trucks.filter(truck => truck.driverId === selectedDriver);
        setSelectedDriverTrucks(selectedDriverTrucks);
      }
    } catch (error) {
      console.error('Error fetching trucks:', error);
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

  const updateRoutingControl = (waypoints) => {
    if (routingControl) {
      routingControl.setWaypoints(waypoints.map(wp => wp.location ? L.latLng(wp.location[0], wp.location[1]) : L.latLng(0, 0)));
    }
  };

  const RouteDrawer = ({ waypoints }) => {
    const map = useMap();

    useEffect(() => {
      if (routingControl) {
        updateRoutingControl(waypoints);
      }
    }, [waypoints]);

    useEffect(() => {
      if (waypoints.length > 1 && waypoints.every(wp => wp.location !== null)) {
        const locations = waypoints.map(wp => L.latLng(wp.location[0], wp.location[1]));

        if (routingControl) {
          routingControl.setWaypoints(locations);
        } else {
          const control = L.Routing.control({
            waypoints: locations,
            language: 'es',
            createMarker: function (i, wp, n) {
              const markerOptions = {
                icon: i === 0 ? originIcon : i === n - 1 ? destinationIcon : intermediateIcon(i),
              };

              const marker = L.marker(wp.latLng, markerOptions);

              let label = '';
              if (i === 0) {
                label = 'Origen ';
              } else if (i === n - 1) {
                label = 'Destino ';
              } else {
                label = `Parada ${i} `;
              }

              marker.bindPopup(label, { closeButton: true, autoClose: false, closeOnClick: true });
              return marker;
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
    }, [waypoints, map, routingControl]);

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button type="danger" onClick={() => navigate(-1)}><LeftCircleOutlined style={{ fontSize: '25px' }} /></Button>
        <h2>Crear Viaje</h2>
      </div>
      <div className="form-container">
        <div className="form-column column-left">
          <Form layout="vertical" onFinish={handleSubmit} style={{ margin: "20px" }}>
            <Form.Item label="Origen" rules={[{ required: true }]}>
              <AsyncSelect
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                placeholder="Desde"
                cacheOptions
                loadOptions={fetchSuggestions}
                onChange={selectedOption => handleWaypointChange(0, selectedOption)}
                defaultOptions
              />
            </Form.Item>
            {waypoints.slice(1, waypoints.length - 1).map((waypoint, index) => (
              <Form.Item key={waypoint.id} label={`Parada ${index + 1}`} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <AsyncSelect
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    placeholder="Pasando por"
                    cacheOptions
                    loadOptions={fetchSuggestions}
                    onChange={selectedOption => handleWaypointChange(index + 1, selectedOption)}
                    defaultOptions
                    styles={{
                      container: base => ({
                        ...base,
                        flexGrow: 1,
                      }),
                      control: base => ({
                        ...base,
                        height: '38px',
                        minWidth: '250px',
                      }),
                    }}
                  />
                  <Button type="danger" onClick={() => removeWaypoint(index + 1)} style={{ marginLeft: "5px", padding: "0px", display: 'flex', alignItems: 'center', height: '38px' }}>
                    <CloseCircleOutlined style={{ fontSize: '20px' }} /></Button>
                </div>
              </Form.Item>
            ))}
            <Form.Item label="Destino" rules={[{ required: true }]}>
              <AsyncSelect
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                placeholder="Hasta"
                cacheOptions
                loadOptions={fetchSuggestions}
                onChange={selectedOption => handleWaypointChange(waypoints.length - 1, selectedOption)}
                defaultOptions
              />
            </Form.Item>
            <Button type="danger" onClick={addWaypoint} style={{ alignContent: "center", marginBottom: "6px", padding: "0" }}>
              <PlusCircleOutlined style={{ fontSize: '20px', height: '10px' }} />Añadir ubicación
            </Button>
            <Form.Item label="Distancia">
              <Input id="distance" value={distance} readOnly />
            </Form.Item>
            <Divider style={{ marginBottom: "14px" }} />
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
                {selectedDriverTrucks.map((truck) => (
                  <Option key={truck.id} value={truck.id}>
                    {truck.plate} - {truck.model}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <Button type="primary" htmlType="submit">Crear Viaje</Button>
            </div>
          </Form>
        </div>
        <div className="form-column">
          {/* MAPA */}
          <MapContainer center={mapCenter} zoom={6} style={{ height: "430px", width: "100%" }} whenCreated={handleMapLoad}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapUpdater bounds={bounds} />
            {waypoints.map((waypoint, index) => (
              waypoint.location && (
                <Marker key={index} position={waypoint.location} icon={index === 0 ? originIcon : index === waypoints.length - 1 ? destinationIcon : intermediateIcon(index)}>
                  <Popup closeButton={true} autoClose={false} closeOnClick={false}>
                    {index === 0 ? `Origen: ${waypointLabels[index]}` : index === waypoints.length - 1 ? `Destino: ${waypointLabels[index]}` : `Parada ${index}: ${waypointLabels[index]}`}
                  </Popup>
                </Marker>
              )
            ))}
            <RouteDrawer waypoints={waypoints} />
          </MapContainer>
          {/* INSTRUCCIONES */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <Button type="primary" onClick={showModal}>
              Ver Instrucciones
            </Button>
          </div>
        </div>
      </div>
      <Modal title="Instrucciones de Ruta" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="modal-content">{instructions}</div>
      </Modal>
    </>
  );
};
