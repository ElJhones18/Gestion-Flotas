import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import { PATHS } from '../../../utils/config';
import axios from 'axios';

const CreateTireComponent = () => {
    const [brand, setBrand] = useState('');
    const [wear, setWear] = useState('');
    const [trucks, setTruckId] = useState([]);
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

            const formData = new FormData();
            formData.append('brand', brand);
            formData.append('wear', wear);
            formData.append('truckId', selectedTruck);

            const response = await axios.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);
        } catch (error) {
            console.error('Error al crear el neumático', error);
        }
    };

    useEffect(() => {
        fetchTrucks();
    }, []);

    const fetchTrucks = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_TRUCKS;
            const response = await axios.get(URL);
            const trucks = response.data;
            console.log(trucks);
            setTruckId(trucks);
        } catch (error) {
            console.error('Error al obtener los camiones', error);
        }
    };

    return (
        <>
            <h2>Crear neumatico</h2> <br />

            <Form onFinish={handleSubmit}>
                <Form.Item
                    label="Marca"
                    name="brand"
                    rules={[{ required: true, message: 'Por favor ingrese la marca del neumático' }]}
                >
                    <Input onChange={(e) => setBrand(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Desgaste"
                    name="wear"
                    rules={[{ required: true, message: 'Por favor ingrese el desgaste del neumático' }]}
                >
                    <Input onChange={(e) => setWear(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Camión"
                    name="truckId"
                    rules={[{ required: true, message: 'Por favor seleccione el camión' }]}
                >
                    <Select onChange={(value) => setSelectedTruck(value)}>
                        {trucks.map((truck) => (
                            <Option key={truck.id} value={truck.id}>{truck.plate}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Crear neumatico
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateTireComponent;
