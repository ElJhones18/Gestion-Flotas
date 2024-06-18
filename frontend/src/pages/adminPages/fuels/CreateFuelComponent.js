import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload } from 'antd';
import { PATHS } from '../../../utils/config';
import axios from 'axios';
import fuel from '../../../uploads/images/Gas.png';
import { Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftCircleOutlined } from '@ant-design/icons';

const CreateFuelComponent = () => {
    const navigate = useNavigate()
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
        <>
            <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px'  }}>
                <Button type="danger" onClick={() => navigate(-1)}>
                    <LeftCircleOutlined style={{ fontSize: '25px' }} />
                </Button>
                <h2>Crear Combustible</h2>
                </div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card>
                            <Form layout="vertical" onFinish={handleSubmit}>
                                <Form.Item label="Costo" name="cost" rules={[{ required: true }]}>
                                    <Input value={cost} onChange={(e) => setCost(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Eficiencia" name="efficiency" rules={[{ required: true }]}>
                                    <Input value={efficiency} onChange={(e) => setEfficiency(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Marca" name="brand" rules={[{ required: true }]}>
                                    <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ float: 'right', marginTop:"10px" }}>
                                        Crear Combustible
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <div style={{ height: '50%' }}>
                            <img src={fuel} alt="Combustible" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default CreateFuelComponent;
