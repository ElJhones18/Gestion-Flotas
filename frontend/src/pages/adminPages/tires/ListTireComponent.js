import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Form,
    Input,
    Modal,
    Space,
    Table,
    Tooltip,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tire } from "../../../api/tire";
import { getTires, deleteTireById, editTireById } from "../../../slices/tireSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/index";
import { PATHS } from "../../../utils/config";
import axios from "axios";

const { confirm } = Modal;

export const ListTireComponent = () => {
    const dispatch = useDispatch();
    const tires = useSelector((state) => state.tire);
    const tireApi = new Tire();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTire, setSelectedTire] = useState(null);
    const navigate = useNavigate()

    const [trucks, setTruck] = useState([]);
    const [truckMap, setTruckMap] = useState('');

    useEffect(() => {
        const fetchTires = async () => {
            try {
                const tiresData = await tireApi.getTires();
                dispatch(getTires(tiresData));
            } catch (error) {
                console.error("Failed to fetch tires", error);
            }
        };
        const fetchTrucks = async () => {
            try {
                const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_TRUCKS;
                const response = await axios.get(URL);
                const trucksData = response.data;

                // Crear un mapa para un acceso rápido por ID de camión
                const truckMap = trucksData.reduce((acc, truck) => {
                    acc[truck.id] = truck;
                    return acc;
                }, {});

                setTruck(trucksData);
                setTruckMap(truckMap);
            } catch (error) {
                console.error('Error fetching trucks', error);
            }
        };

        fetchTires();
        fetchTrucks();
    }, [dispatch]);

    const handleEdit = (id) => {
        const tire = tires.find((tire) => tire.id == id);
        console.log(tire);
        setSelectedTire(tire);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: "¿Quiere eliminar este neumático?",
            content: "Esta elección no se puede revertir",
            onOk() {
                tireApi.
                    deleteTireById(id)
                    .then(() => {
                        dispatch(deleteTireById(id));
                    })
                    .catch((error) => {
                        console.error("Failed to delete tire", error);
                    });
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTire(null);
    };

    const handleOk = () => {

       const formDataToSend = new FormData();
        formDataToSend.append("brand", selectedTire.brand);
        formDataToSend.append("wear", selectedTire.wear);
        formDataToSend.append("truckId", selectedTire.truckId);

        console.log(selectedTire);

        tireApi
            .editTireById(selectedTire.id, selectedTire)
            .then((result) => {
                dispatch(editTireById(result));
                setIsModalVisible(false);
                setSelectedTire(null);
            })
            .catch((error) => {
                console.error("Failed to edit tire", error);
            });
    }

    const handleChange = (event) => {
        setSelectedTire({
            ...selectedTire,
            [event.target.id]: event.target.value
        });
    }

    const columns = [
        {
            title: "Marca",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Desgaste",
            dataIndex: "wear",
            key: "wear",
        },
        {
            title: "ID Camión",
            dataIndex: "truckId",
            key: "truckId",
            render: (truckId) => {
                const truck = truckMap[truckId];
                return truck ? truck.plate : 'Desconocido';
            },
        },
        {
            title: "Acciones",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Editar">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record.id)}
                        />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button
                            type="primary"
                            shape="circle"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="container">

            <Button
                type="primary"
                onClick={() => navigate(ROUTES.ADMIN_CREATE_TIRE)}
            >
                Crear neumático
            </Button>
            <Table columns={columns} dataSource={tires} rowKey="id" />
            {selectedTire && (
                <Modal
                    title="Editar Neumático"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form>
                        <Form.Item label="Marca"
                            rules={[{ required: true, message: "Por favor ingrese la marca" }]}>
                            <Input
                                id="brand"
                                value={selectedTire.brand}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Desgaste"
                            rules={[{ required: true, message: "Por favor ingrese el desgaste" }]}>
                            <Input
                                id="wear"
                                value={selectedTire.wear}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="ID Camión"
                            rules={[{ required: true, message: "Por favor ingrese el camion" }]}>
                            <Input
                                id="truckId"
                                value={selectedTire.truckId}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
}