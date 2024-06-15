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
import { Tire } from "../../../api/tire";
import { getTires, editTireById, deleteTireById } from "../../../slices/tireSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/index"

const { confirm } = Modal;

export const ListTireComponent = () => {
    const dispatch = useDispatch();
    const tires = useSelector((state) => state.tire);
    const tireApi = new Tire();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTire, setSelectedTire] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTires = async () => {
            try {
                const tiresData = await tireApi.getTires();
                dispatch(getTires(tiresData));
            } catch (error) {
                console.error("Failed to fetch tires", error);
            }
        };

        fetchTires();
    }, [dispatch]);

    const handleEdit = (id) => {
        const tire = tires.find((tire) => tire.id === id);
        console.log(tire);
        setSelectedTire(tire);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        confirm({
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
            onCancel() { },
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTire(null);
    }

    const handleOk = () => {

        const formDataToSend = new FormData();
        formDataToSend.append('brand', selectedTire.brand);
        formDataToSend.append('wear', selectedTire.wear);
        formDataToSend.append('truckId', selectedTire.truck_id);
        console.log(selectedTire);

        tireApi.editTireById(selectedTire.id, selectedTire)
            .then((result) => {
                dispatch(editTireById(result));
                setIsModalVisible(false);
                setSelectedTire(null);
            })
            .catch((error) => {
                console.error('Failed to edit tire', error);
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
            title: "Camión",
            dataIndex: "truckId",
            key: "truck_id",
        },
        {
            title: "Acciones",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Editar">
                        <EditOutlined onClick={() => handleEdit(record.id)}/>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <DeleteOutlined onClick={() => handleDelete(record.id)}/>
                    </Tooltip>
                </Space>
            ),
        },
    ]

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Lista de neumáticos</h2>
                <Button onClick={() => navigate(ROUTES.ADMIN_CREATE_TIRE)}>Crear neumático</Button>
            </div>
            <Table
                dataSource={tires}
                columns={columns}
                rowKey="id"
            />
            <Modal
                title="Editar neumático"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item label="Marca">
                        <Input
                            name="brand"
                            value={selectedTire?.brand}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Desgaste">
                        <Input
                            name="wear"
                            value={selectedTire?.wear}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Camión">
                        <Input
                            name="truck_id"
                            value={selectedTire?.truck_id}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

}