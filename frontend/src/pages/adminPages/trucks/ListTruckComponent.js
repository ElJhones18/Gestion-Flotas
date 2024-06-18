import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Avatar,
    Button,
    Form,
    Input,
    Modal,
    Space,
    Table,
    Tooltip,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Truck } from "../../../api/truck";
import { getTrucks, editTruckById, deleteTruckById } from "../../../slices/truckSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/index"
import { PATHS } from "../../../utils/config";
import axios from "axios";

const { confirm } = Modal;

export const ListTruckComponent = () => {
    const dispatch = useDispatch();
    const trucks = useSelector((state) => state.truck);
    const truckApi = new Truck();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [drivers, setDrivers] = useState([])
    const [fuels, setFuels] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTrucks = async () => {
            try {
                const trucksData = await truckApi.getTrucks();
                dispatch(getTrucks(trucksData));
            } catch (error) {
                console.error("Failed to fetch trucks", error);
            }
        };

        fetchTrucks();
        // console.log(JSON.stringify(trucks));
    }, [dispatch]);


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
    const handleEdit = (id) => {
        const truck = trucks.find((truck) => truck.id === id);
        console.log(truck);
        setSelectedTruck(truck);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        confirm({
            title: "¿Quiere eliminar este camión?",
            content: "Esta elección no se puede revertir",
            onOk() {
                truckApi.
                    deleteTruckById(id)
                    .then(() => {
                        dispatch(deleteTruckById(id));
                    })
                    .catch((error) => {
                        console.error("Failed to delete truck", error);
                    });
            },
            onCancel() {
                console.log("Cancel delete");
            },
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTruck(null);
    }

    const handleOk = () => {

        const formDataToSend = new FormData();
        formDataToSend.append("plate", selectedTruck.plate);
        formDataToSend.append("brand", selectedTruck.brand);
        formDataToSend.append("color", selectedTruck.color);
        formDataToSend.append("rotation_programming", selectedTruck.rotation_programming);
        formDataToSend.append("fuel_consumption", selectedTruck.fuel_consumption);
        formDataToSend.append("model", selectedTruck.model);
        formDataToSend.append("load_capacity", selectedTruck.load_capacity);
        formDataToSend.append("photo", selectedTruck.photo);
        formDataToSend.append("maintenance", selectedTruck.maintenance);
        formDataToSend.append("tires", selectedTruck.tires);
        formDataToSend.append("fuelId", selectedTruck.fuelId);
        formDataToSend.append("driverId", selectedTruck.driverId);
        console.log(selectedTruck);

        truckApi
            .editTruckById(selectedTruck.id, selectedTruck)
            .then((result) => {
                dispatch(
                    editTruckById(result)
                );

                setIsModalVisible(false);
                setSelectedTruck(null);
            })
            .catch((error) => {
                console.error("Failed to edit truck", error);
            });
    }

    const handleChange = (event) => {
        setSelectedTruck({
            ...selectedTruck,
            [event.target.id]: event.target.value
        });
    }

    const getDriverNameById = (id) => {
        const driver = drivers.find((driver) => driver.id === id);
        if (driver) {
            return driver.username + " " + driver.lastname;
        }
        return "Desconocido";
    }

    const getFuelNameById = (id) => {
        const fuel = fuels.find((fuel) => fuel.id === id);
        if (fuel) {
            return fuel.brand;
        }
        return "Desconocido";
    }

    const columns = [
        {
            title: "Foto",
            dataIndex: "photo",
            key: "photo",
            render: (text, record) => <Avatar src={`http://localhost:3001/uploads/trucks/${record.photo}`} />,
        },
        {
            title: "Placa",
            dataIndex: "plate",
            key: "plate",
        },
        {
            title: "Marca",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
        },
        {
            title: "Programación de rotación",
            dataIndex: "rotation_programming",
            key: "rotation_programming",
        },
        {
            title: "Consumo de combustible",
            dataIndex: "fuel_consumption",
            key: "fuel_consumption",
        },
        {
            title: "Modelo",
            dataIndex: "model",
            key: "model",
        },
        {
            title: "Capacidad de carga",
            dataIndex: "load_capacity",
            key: "load_capacity",
        },
/*         {
            title: "Llantas",
            dataIndex: "tires",
            key: "tires",
        }, */
        {
            title: "Combustible",
            dataIndex: "fuelId",
            // render: (record) => {
            //     const fuel = JSON.stringify(JSON.parse(JSON.stringify(record.fuel)).username);
            //     return fuel.slice(1, -1);
            // },
            key: "fuelId",
            render: (id) => getFuelNameById(id)
        },
        {
            title: "Conductor",
            dataIndex: "driverId",
            key: "driverId",
            render: (id) => getDriverNameById(id)
        },
        {
            title: "Acciones",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Editar">
                        <EditOutlined 
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => handleEdit(record.id)} />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <DeleteOutlined 
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDelete(record.id)} />
                    </Tooltip>
                </Space>
            ),
        },
    ]

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Lista de Camiones</h2>
                <Button onClick={() => navigate(ROUTES.ADMIN_CREATE_TRUCK)}>Crear camión</Button>
            </div>
            <Table dataSource={trucks} columns={columns} rowKey="id" />

            {selectedTruck && (
                <Modal
                    title="Editar Camión"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form>
                        <Form.Item label="Placa">
                            <Input
                                id="plate"
                                value={selectedTruck.plate}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Marca">
                            <Input
                                id="brand"
                                value={selectedTruck.brand}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Color">
                            <Input
                                id="color"
                                value={selectedTruck.color}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Programación de rotación">
                            <Input
                                id="rotation_programming"
                                value={selectedTruck.rotation_programming}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Consumo de combustible">
                            <Input
                                id="fuel_consumption"
                                value={selectedTruck.fuel_consumption}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Modelo">
                            <Input
                                id="model"
                                value={selectedTruck.model}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Capacidad de carga">
                            <Input
                                id="load_capacity"
                                value={selectedTruck.load_capacity}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Id de combustible">
                            <Input
                                id="fuelId"
                                value={selectedTruck.fuelId}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Id de conductor">
                            <Input
                                id="driverId"
                                value={selectedTruck.driverId}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>

    )
}   