import { useState, useEffect } from "react";
import React from "react";
import { Form, Button, Checkbox, Select, Tooltip, message } from 'antd';
import { PATHS } from "../../../utils/config";
import axios from "axios";
import { Typography } from 'antd';
const { Title } = Typography;

const ChecklistComponent = () => {

    const [trucks, setTrucks] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState('');
    const [activeChecklist, setActiveChecklist] = useState(true);

    const [checklist, setChecklist] = useState({
        coolant: false,
        oil_level: false,
        tire_pressure: false,
        lights: false,
    });

    useEffect(() => {
        fetchTrucks();
    }, []);

    const fetchTrucks = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_TRUCKS;
            const response = await axios.get(URL);
            // console.log(response.data);
            setTrucks(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleFinish = async () => {
        // console.log(checklist);
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.CREATE_CHECKLIST;
            const data = { truckId: selectedTruck, ...checklist }
            console.log(data);
            const response = await axios.post(URL, data)
            console.log(response);
            message.success("Checklist creado correctamente");
        } catch (error) {
            console.error("Error creando la checklist" + error);
            message.error("Checklist creado correctamente");
        }
    }

    return (
        < >
            <h1>CHECKLIST </h1>
            <br />

            <Form
                size="large"
                style={{
                    maxWidth: 600,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Title level={5}>Selecciona un camión de la lista y marca llena el siguiente formulario.</Title>
                <br />

                <Form.Item>
                    <Select placeholder="Selecciona un camión"
                        value={selectedTruck}
                        onChange={(value) => {
                            setSelectedTruck(value)
                            setActiveChecklist(false)
                        }}>
                        {trucks.map((truck) => {
                            return (
                                <Select.Option key={truck.id} value={truck.id}>
                                    <Tooltip title={`Color: ${truck.color} - Marca: ${truck.brand} - Conductor: ${truck.driver.username} ${truck.driver.lastname}`}>
                                        <span>{truck.plate}</span>
                                    </Tooltip>
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                Selecciona solo los elementos que se encuentren en buen estado.

                <Form.Item>
                    <Checkbox
                        disabled={activeChecklist}
                        onChange={(e) => {
                            setChecklist({ ...checklist, coolant: e.target.checked })
                        }}
                    >Refrigerante</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox disabled={activeChecklist}
                        onChange={(e) => {
                            setChecklist({ ...checklist, oil_level: e.target.checked })
                        }}>Nivel de aceite</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox disabled={activeChecklist}
                        onChange={(e) => {
                            setChecklist({ ...checklist, tire_pressure: e.target.checked })
                        }}>Presión de las llantas</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox disabled={activeChecklist}
                        onChange={(e) => {
                            setChecklist({ ...checklist, lights: e.target.checked })
                        }}>Luces</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={activeChecklist}
                        onClick={handleFinish}>Terminar</Button>
                </Form.Item>

            </Form>
        </>
    )
}

export default ChecklistComponent;