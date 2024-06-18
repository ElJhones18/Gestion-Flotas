import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, Row, Col, Card } from 'antd';
import { LeftCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import { PATHS } from '../../../utils/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import camion from '../../../uploads/images/camion.webp';

const CreateTruckComponent = () => {
    const navigate = useNavigate()
    const [plate, setPlate] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [rotationProgramming, setRotationProgramming] = useState(null);
    const [fuelConsumption, setFuelConsumption] = useState('');
    const [photo, setPhoto] = useState('');
    const [model, setModel] = useState('');
    const [loadCapacity, setLoadCapacity] = useState('');

    const [drivers, setDrivers] = useState([])
    const [selectedDriver, setSelectedDriver] = useState('');

    const [fuels, setFuels] = useState([]);
    const [selectedFuel, setSelectedFuel] = useState('');

    const handleSubmit = async () => {
        const truck = {
            plate,
            brand,
            color,
            rotation_programming: rotationProgramming,
            fuel_consumption: fuelConsumption,
            model,
            load_capacity: loadCapacity,
            fuelId: selectedFuel,
            driverId: selectedDriver,
        };
        console.log(truck);

        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.CREATE_TRUCK;
            console.log(URL);

            const formData = new FormData();
            // formData.append('photo', photo); actualmente no funciona
            formData.append('plate', plate);
            formData.append('brand', brand);
            formData.append('color', color);
            formData.append('rotation_programming', rotationProgramming);
            formData.append('fuel_consumption', fuelConsumption);
            formData.append('model', model);
            formData.append('load_capacity', loadCapacity);
            formData.append('fuelId', selectedFuel);
            formData.append('driverId', selectedDriver);

            const response = await axios.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);

        } catch (error) {
            console.error('Error creating truck:', error);
        }
    };

    useEffect(() => {
        fetchDrivers();
        fetchFuels();
    }, []);

    const fetchDrivers = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_USERS;
            // console.log(URL);
            const response = await axios.get(URL);
            const drivers = response.data.filter((driver) => driver.rol === 'Conductor');
            console.log(drivers);
            setDrivers(drivers);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const fetchFuels = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_FUELS;
            // console.log(URL);
            const response = await axios.get(URL);
            const fuels = response.data;
            console.log(fuels);
            setFuels(fuels);
        } catch (error) {
            console.error('Error fetching fuels:', error);
        }
    };

    return (
        <>
            <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px'  }}>
                <Button type="danger" onClick={() => navigate(-1)}>
                    <LeftCircleOutlined style={{ fontSize: '25px' }} />
                </Button>
                <h2>Crear Camión</h2>
                </div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card>
                            <Form layout="vertical" onFinish={handleSubmit}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Placa" name="plate" rules={[{ required: true }]}>
                                            <Input value={plate} onChange={(e) => setPlate(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Modelo" name="model" rules={[{ required: true }]}>
                                            <Input value={model} onChange={(e) => setModel(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Marca" name="brand" rules={[{ required: true }]}>
                                            <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Color" name="color" rules={[{ required: true }]}>
                                            <Input value={color} onChange={(e) => setColor(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    label="Rotación de neumáticos"
                                    name="rotationProgramming"
                                    rules={[{ required: true }]}
                                    style={{ width: '100%' }}
                                >
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        onChange={(date, dateString) => setRotationProgramming(dateString)}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Consumo de Combustible"
                                    name="fuelConsumption"
                                    rules={[{ required: true }]}
                                >
                                    <Select value={fuelConsumption} onChange={(value) => setFuelConsumption(value)}>
                                        <Option value="Alto">Alto</Option>
                                        <Option value="Bajo">Bajo</Option>
                                        <Option value="Medio">Medio</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Capacidad de carga" name="loadCapacity" rules={[{ required: true }]}>
                                    <Select value={loadCapacity} onChange={(value) => setLoadCapacity(value)}>
                                        <Option value="Alta">Alta</Option>
                                        <Option value="Baja">Baja</Option>
                                        <Option value="Media">Media</Option>
                                    </Select>
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
                                <Form.Item label="Marca de combustible" name="fuel" rules={[{ required: true }]}>
                                    <Select value={selectedFuel} onChange={(value) => setSelectedFuel(value)}>
                                        {fuels.map((fuel) => (
                                            <Option key={fuel.id} value={fuel.id}>
                                                {fuel.brand}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Foto">
                                    <Upload
                                        accept="image/*"
                                        beforeUpload={() => {
                                            return false;
                                        }}
                                        onChange={(info) => {
                                            console.log(info.fileList);
                                            if (info.fileList.length > 0) {
                                                const file = info.fileList[0].originFileObj;
                                                setPhoto(file);
                                            }
                                        }}
                                        fileList={[]}
                                    >
                                        <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                                        Crear camión
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <div style={{ height: '100%' }}>
                            <img src={camion} alt="Camión" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default CreateTruckComponent;
