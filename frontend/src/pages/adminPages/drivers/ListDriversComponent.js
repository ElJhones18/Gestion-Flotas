import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Driver } from "../../../api/driver";
import { getDrivers, editDriverById, deleteDriverById } from "../../../slices/driverSlice";
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
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

export const ListDriversComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const drivers = useSelector((state) => state.driver);
    const driverApi = new Driver();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);

    const [formData, setFormData] = useState({
        drivername: "",
        lastname: "",
        cedula: "",
        phone: "",
        email: "",
        performance_driver: "",
        tasks: []
    });

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const driversData = await driverApi.getDrivers();
                dispatch(getDrivers(driversData));
            } catch (error) {
                console.error("Failed to fetch drivers", error);
            }
        };

        fetchDrivers();
    }, [dispatch]);

    const handleTask = (id) => {
        console.log("IIIIIIIDDDDDD", id);
        const driver = drivers.find((driver) => driver.id === id);
        console.log(driver);
        /* setSelectedDriver(driver);
        setIsModalVisible(true); */
        navigate(`/admin/tasks/${id}`);
    };

    const handleEdit = (id) => {
        const driver = drivers.find((driver) => driver.id === id);
        console.log(driver);
        setSelectedDriver(driver);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        confirm({
            title: "¿Quiere eliminar este usuario?",
            content: "Esta elección no se puede revertir",
            onOk() {
                driverApi
                    .deleteDriverById(id)
                    .then(() => {
                        dispatch(deleteDriverById(id));
                    })
                    .catch((error) => {
                        console.error("Failed to delete driver", error);
                    });
            },
            onCancel() {
                console.log("Cancel delete");
            },
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedDriver(null);
    };

    // const handleUpload = (event) => {
    //     setFormData({
    //         ...formData,
    //         avatar: event.target.files[0]
    //     });
    // }

    const handleOk = () => {

        formData.email = selectedDriver.email;
        formData.drivername = selectedDriver.drivername;
        formData.lastname = selectedDriver.lastname;
        formData.active_driver = selectedDriver.active_driver;

        const formDataToSend = new FormData();
        formDataToSend.append("email", formData.email);
        formDataToSend.append("drivername", formData.drivername);
        formDataToSend.append("lastname", formData.lastname);
        formDataToSend.append("avatar", formData.avatar);
        formDataToSend.append("active_driver", formData.active_driver);
        //formDataToSend.append("current_password", formData.current_password);
        console.log(formDataToSend);

        driverApi
            .editDriverById(selectedDriver.id, formDataToSend)
            .then((result) => {
                dispatch(
                    editDriverById(result)
                );
                setIsModalVisible(false);
                setSelectedDriver(null);
            })
            .catch((error) => {
                console.error("Failed to edit driver", error);
            });
    };

    const handleChange = (e) => {
        setSelectedDriver({
            ...selectedDriver,
            [e.target.name]: e.target.value,
        });
    };

    const handleSwitchChange = (checked) => {
        setSelectedDriver({
            ...selectedDriver,
            active_driver: checked,
        });
    };

    const columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (text, record) => <Avatar src={record.avatar} />,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Driver Name",
            dataIndex: "drivername",
            key: "drivername",
        },
        {
            title: "Last Name",
            dataIndex: "lastname",
            key: "lastname",
        },
        {
            title: "Active",
            dataIndex: "active_driver",
            key: "active_driver",
            render: (text, record) => (
                <span>{record.active_driver ? "Yes" : "No"}</span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Tareas">
                        <Button
                            onClick={() => handleTask(record.id)}
                            style={{ color: "Green", borderColor: "green" }}
                        >
                            Tareas
                        </Button>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <EditOutlined
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => handleEdit(record.id)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <DeleteOutlined
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="container">
            <h2>Drivers List</h2>
            <Table dataSource={drivers} columns={columns} rowKey="id" />
            {selectedDriver && (
                <Modal
                    title="Edit Driver"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <Form>
                        <Form.Item label="Email">
                            <Input
                                name="email"
                                value={selectedDriver.email}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Driver Name">
                            <Input
                                name="drivername"
                                value={selectedDriver.drivername}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Last Name">
                            <Input
                                name="lastname"
                                value={selectedDriver.lastname}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Active">
                            <Switch
                                checked={selectedDriver.active_driver}
                                onChange={handleSwitchChange}
                            />
                        </Form.Item>
                        <Form.Item label="Avatar">
                            <Upload
                                accept="image/*"
                                beforeUpload={() => {
                                    return false;
                                }}
                                onChange={(info) => {
                                    console.log(info.fileList);

                                    if (info.fileList.length > 0) {
                                        const file = info.fileList[0].originFileObj;
                                        setFormData({
                                            ...formData,
                                            avatar: file,
                                        });
                                    }
                                }}
                                // onChange={handleUpload}
                                fileList={[]}>
                                <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
};