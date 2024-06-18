import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import { PATHS } from '../../../utils/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            <div style={{
                maxWidth: 700,
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                <Button onClick={() => navigate(-1)}>Volver</Button>
                <h1>Crear Camión</h1> <br />

                <p>Complete el siguiente formulario para crear un nuevo camión</p>
                <p>Los campos con asterísco son obligatorios.</p>

                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    labelWrap={true}
                    onFinish={handleSubmit}>
                    <Form.Item label="Placa" name="plate" rules={[{ required: true }]}>
                        <Input value={plate} onChange={(e) => setPlate(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Marca" name="brand" rules={[{ required: true }]}>
                        <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Color" name="color" rules={[{ required: true }]}>
                        <Input value={color} onChange={(e) => setColor(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Modelo" name="model" rules={[{ required: true }]}>
                        <Input value={color} onChange={(e) => setModel(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Rotación de neumáticos"
                        name="rotationProgramming"
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            format="DD/MM/YYYY"
                            // value={rotationProgramming}
                            onChange={(date, dateString) => setRotationProgramming(dateString)}
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
                                    // setFormData({
                                    //     ...formData,
                                    //     avatar: file,
                                    // });
                                    setPhoto(file);
                                }
                            }}
                            // onChange={handleUpload}
                            fileList={[]}>
                            <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Crear camión
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default CreateTruckComponent;
