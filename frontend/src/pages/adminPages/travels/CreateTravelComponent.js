import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Form } from "antd";
import { PATHS } from "../../../utils/config";
import axios from "axios";

const { Option } = Select;

export const CreateTravelComponent = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const [trucks, setTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState('');

  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

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
          <Input
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required />
        </Form.Item>

        <Form.Item label="Destino" name="destination" rules={[{ required: true }]}>
          <Input
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required />
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
    </>
  );
};
