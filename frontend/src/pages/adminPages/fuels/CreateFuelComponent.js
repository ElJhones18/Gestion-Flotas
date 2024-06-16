import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload } from 'antd';
import { PATHS } from '../../../utils/config';
import axios from 'axios';

const CreateFuelComponent = () => {
    const [cost, setCost] = useState('');
    const [efficiency, setEfficiency] = useState('');
    const [brand, setBrand] = useState('');

    const handleSubmit = async () => {
        const fuel = {
            cost: Number(cost),
            efficiency,
            brand,
        };
        console.log(fuel);

        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.CREATE_FUEL;
            console.log(URL);

            const response = await axios.post(URL, fuel);

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{maxWidth:700, marginRight:'auto', marginLeft:'auto'}}>
            <h1>Crear combustible</h1>
            <br />
            <p>Ingrese los datos del nuevo combustible.</p>
            <p>Los campos con asterísco son obligatorios.</p>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                layout="horizontal"
                onFinish={handleSubmit}
            >
                <Form.Item label="Costo" name="cost" rules={[{ required: true }]}>
                    <Input onChange={(e) => setCost(e.target.value)} />
                </Form.Item>
                <Form.Item label="Eficiencia" name="efficiency" rules={[{ required: true }]}>
                    <Input onChange={(e) => setEfficiency(e.target.value)} />
                </Form.Item>
                <Form.Item label="Marca" name="brand" rules={[{ required: true }]}>
                    <Input onChange={(e) => setBrand(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Button type="primary" htmlType="submit">
                        Crear
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateFuelComponent;
