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
import { Fuel } from "../../../api/fuel";
import { getFuels, editFuelById, deleteFuelById } from "../../../slices/fuelSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/index"

const { confirm } = Modal;

export const ListFuelComponent = () => {
    const dispatch = useDispatch();
    const fuels = useSelector((state) => state.fuel);
    const fuelApi = new Fuel();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFuel, setSelectedFuel] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFuels = async () => {
            try {
                const fuelsData = await fuelApi.getFuels();
                dispatch(getFuels(fuelsData));
            } catch (error) {
                console.error("Failed to fetch fuels", error);
            }
        };

        fetchFuels();
    }, [dispatch]);

    const handleEdit = (id) => {
        const fuel = fuels.find((fuel) => fuel.id == id);
        console.log(fuel);
        setSelectedFuel(fuel);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        confirm({
            title: "¿Quiere eliminar este combustible?",
            content: "Esta elección no se puede revertir",
            onOk() {
                fuelApi.
                    deleteFuelById(id)
                    .then(() => {
                        dispatch(deleteFuelById(id));
                    })
                    .catch((error) => {
                        console.error("Failed to delete fuel", error);
                    });
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedFuel(null);
    };

    const handleOk = () => {

        const fuel = {
            cost: Number(selectedFuel.cost),
            efficiency: selectedFuel.efficiency,
            brand: selectedFuel.brand,
        };
        console.log(fuel);

        fuelApi
            .editFuelById(selectedFuel.id, fuel)
            .then(() => {
                dispatch(editFuelById(selectedFuel.id, fuel));
                setIsModalVisible(false);
                setSelectedFuel(null);
            })
            .catch((error) => {
                console.error("Failed to edit fuel", error);
            });
    }

    const handleChange = (event) => {
        setSelectedFuel({
            ...selectedFuel,
            [event.target.id]: event.target.value
        });
    }

    const columns = [
        {
            title: "Costo",
            dataIndex: "cost",
            key: "cost",
        },
        {
            title: "Eficiencia",
            dataIndex: "efficiency",
            key: "efficiency",
        },
        {
            title: "Marca",
            dataIndex: "brand",
            key: "brand",
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
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Combustibles</h2>
                <Button onClick={() => navigate(ROUTES.ADMIN_CREATE_FUEL)}>Agregar combustible</Button>
            </div>

            <Table
                columns={columns}
                dataSource={fuels}
                rowKey="id"
            />
            {selectedFuel && (
                <Modal
                    title="Editar combustible"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form>
                        <Form.Item
                            label="Costo"
                            rules={[{ required: true, message: "Por favor ingrese el costo" }]}
                        >
                            <Input
                                id="cost"
                                value={selectedFuel.cost}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Eficiencia"
                            rules={[{ required: true, message: "Por favor ingrese la eficiencia" }]}
                        >
                            <Input
                                id="efficiency"
                                value={selectedFuel.efficiency}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Marca"
                            rules={[{ required: true, message: "Por favor ingrese la marca" }]}
                        >
                            <Input
                                id="brand"
                                value={selectedFuel.brand}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
}