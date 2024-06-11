import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Table,
    Avatar,
    Space,
    Tooltip,
    Modal,
    Form,
    Input,
    Switch,
    Upload,
    Button,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { Truck } from "../../../api/truck";
import { getTrucks, editTruckById, deleteTruckById } from "../../../slices/truckSlice";

const { confirm } = Modal;

export const ListTruckComponent = () => {
    const dispatch = useDispatch();
    const trucks = useSelector((state) => state.truck.trucks);
    const truckApi = new Truck();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTruck, setSelectedTruck] = useState(null);

    const [formData, setFormData] = useState({
        plate: "",
        brand: "",
        color: "",
        rotation_programming: "",
        fuel_consumption: "",
        model: "",
        load_capacity: "",
        photo: "",
        maintenance: [],
        tires: [],
        fuelId: "",
        driverId: "",
        /*fuel: "",
         availability: "",
        checklist: [], */
    });

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
    }, [dispatch]);

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

    // const handleUpload = (event) => {
    //     setFormData({
    //         ...formData,
    //         avatar: event.target.files[0]
    //     });
    // }

    const handleOk = () => {
        /*  formData.plate = selectedTruck.plate;
        formData.brand = selectedTruck.brand;
        formData.color = selectedTruck.color;
        formData.rotation_programming = selectedTruck.rotation_programming;
        formData.fuel_consumption = selectedTruck.fuel_consumption;
        formData.model = selectedTruck.model;
        formData.load_capacity = selectedTruck.load_capacity;
        formData.photo = selectedTruck.photo;
        formData.maintenance = selectedTruck.maintenance;
        formData.tires = selectedTruck.tires;
        formData.fuelId = selectedTruck.fuelId;
        formData.driverId = selectedTruck.driverId;
        formData.fuel = selectedTruck.fuel;
        formData.availability = selectedTruck.availability;
        formData.checklist = selectedTruck.checklist; */

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
        /*         formDataToSend.append("fuel", formData.fuel);
                formDataToSend.append("availability", formData.availability);
                formDataToSend.append("checklist", formData.checklist); */

        // console.log("Lo que ingresa",formDataToSend);
        // console.log("Lo que ingresa PLACA", formData.plate);
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

    const columns = [
        {
            title: "Foto",
            dataIndex: "photo",
            key: "photo",
            render: (text, record) => <Avatar src={`http://localhost:3001/uploads/avatars/${record.photo}`} />,
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
        {
            title: "Mantenimiento",
            dataIndex: "maintenance",
            key: "maintenance",
        },
        {
            title: "Llantas",
            dataIndex: "tires",
            key: "tires",
        },
        {
            title: "Id de combustible",
            dataIndex: "fuelId",
            key: "fuelId",
        },
        {
            title: "Id de conductor",
            dataIndex: "driverId",
            key: "driverId",
        },
        {
            title: "Combustible",
            dataIndex: "fuel",
            key: "fuel",
        },
        /*         {
                    title: "Disponibilidad",
                    dataIndex: "availability",
                    key: "availability",
                },
                {
                    title: "Checklist",
                    dataIndex: "checklist",
                    key: "checklist",
                }, */
        {
            title: "Acciones",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Editar">
                        <EditOutlined onClick={() => handleEdit(record.id)} />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <DeleteOutlined onClick={() => handleDelete(record.id)} />
                    </Tooltip>
                </Space>
            ),
        },

    ]

    return (
        <div className="container">
            <h2>Lista de Camiones</h2>
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