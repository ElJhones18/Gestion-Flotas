import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Tooltip, Select } from 'antd';
import { PATHS } from '../../../utils/config';
import axios from 'axios';

const CreateTireComponent = () => {
    const [brand, setBrand] = useState('');
    const [wear, setWear] = useState('');

    const [trucks, setTruck] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState('');

    const handleSubmit = async () => {
        const tire = {
            brand,
            wear,
            truckId: selectedTruck,
        };
        console.log(tire);

        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.CREATE_TIRE;
            console.log(URL);

            const response = await axios.post(URL, tire);

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchTrucks = async () => {
            try {
                const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_TRUCKS;
                console.log(URL);
                const response = await axios.get(URL);
                const trucks = response.data;
                console.log(trucks);
                setTruck(trucks);
            }
            catch (error) {
                console.error('Error fetching truck', error);
            }
        }
        fetchTrucks();
    }, []);

    return (
        <div style={{ maxWidth: 700, marginRight: 'auto', marginLeft: 'auto' }}>
            <h1>Crear neumático</h1>
            <br />
            <p>Ingrese los datos del nuevo neumático.</p>
            <p>Los campos con asterísco son obligatorios.</p>
            <br />
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onFinish={handleSubmit}
            >
                <Form.Item label="Marca" name="brand" rules={[{ required: true }]}>
                    <Input onChange={(e) => setBrand(e.target.value)} />
                </Form.Item>
                <Form.Item label="Desgaste" name="wear" rules={[{ required: true }]}>
                    <Input onChange={(e) => setWear(e.target.value)} />
                </Form.Item>
                <Form.Item label="Camión" name="truckId" rules={[{ required: true }]}>
                    <Select placeholder="Selecciona un camión"
                        value={selectedTruck}
                        onChange={(value) => {
                            setSelectedTruck(value)
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
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Button type="primary" htmlType="submit">
                        Crear neumático
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateTireComponent;