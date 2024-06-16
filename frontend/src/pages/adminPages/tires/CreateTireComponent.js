import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload } from 'antd';
import { Option } from 'antd/es/mentions';
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
            <Form.Item label="Marca" name="brand" rules={[{ required: true}]}>
                <Input onChange={(e) => setBrand(e.target.value)} />
            </Form.Item>
            <Form.Item label="Desgaste" name="wear" rules={[{ required: true}]}>
                <Input onChange={(e) => setWear(e.target.value)} />
            </Form.Item>
            <Form.Item label="Camión" name="truckId" rules={[{ required: true}]}>
                <Select value={selectedTruck} onChange={(e) => setSelectedTruck(e)}>
                    {trucks.map((truck) => (
                        <Option key={truck.id} value={truck.id}>
                            {truck.plate}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                <Button type="primary" htmlType="submit">
                    Crear neumático
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateTireComponent;