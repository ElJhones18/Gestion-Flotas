import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../../api/user";
import { getUsers, editUserById, deleteUserById } from "../../../slices/userSlice";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {

Avatar,
Button,
Form,
Input,
Modal,
Space,
Switch,
Table,
Tooltip,
Upload,
} from "antd";

const { confirm } = Modal;

export const ListComponent = () => {
const dispatch = useDispatch();
const users = useSelector((state) => state.user);
const userApi = new User();
const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [filterName, setFilterName] = useState(""); // Nuevo estado para el filtro por nombre
const navigate = useNavigate()

const [formData, setFormData] = useState({
    email: "",
    username: "",
    lastname: "",
    avatar: "",
    rol: "",
    active_user: false,
});

useEffect(() => {
    const fetchUsers = async () => {
        try {
            const usersData = await userApi.getUsers();
            console.log(usersData);
            dispatch(getUsers(usersData));
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    fetchUsers();
}, [dispatch, userApi]);

const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);
    console.log(user);
    setSelectedUser(user);
    setIsModalVisible(true);
};

const handleDelete = (id) => {
    confirm({
        title: "¿Quiere eliminar este usuario?",
        content: "Esta elección no se puede revertir",
        onOk() {
            userApi
                .deleteUserById(id)
                .then(() => {
                    dispatch(deleteUserById(id));
                })
                .catch((error) => {
                    console.error("Failed to delete user", error);
                });
        },
        onCancel() {
            console.log("Cancel delete");
        },
    });
};

const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
};

// const handleUpload = (event) => {
//     setFormData({
//         ...formData,
//         avatar: event.target.files[0]
//     });
// }

const handleOk = () => {

    formData.email = selectedUser.email;
    formData.username = selectedUser.username;
    formData.lastname = selectedUser.lastname;
    formData.active_user = selectedUser.active_user;
    formData.rol = selectedUser.rol;

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("lastname", formData.lastname);
    formDataToSend.append("avatar", formData.avatar);
    formDataToSend.append("active_user", formData.active_user);
    formDataToSend.append("rol", formData.rol);
    //formDataToSend.append("current_password", formData.current_password);
    console.log(formDataToSend);

    userApi
        .editUserById(selectedUser.id, formDataToSend)
        .then((result) => {
            dispatch(
                editUserById(result)
            );
            setIsModalVisible(false);
            setSelectedUser(null);
        })
        .catch((error) => {
            console.error("Failed to edit user", error);
        });
};

const handleChange = (e) => {
    setSelectedUser({
        ...selectedUser,
        [e.target.name]: e.target.value,
    });
};

const handleSwitchChange = (checked) => {
    setSelectedUser({
        ...selectedUser,
        active_user: checked,
    });
};

const handleTask = (id) => {
    const user = users.find((user) => user.id === id);
    console.log(user);
    /* setSelectedDriver(driver);
    setIsModalVisible(true); */
    navigate(`/admin/tasks/${id}`);
};

const columns = [
    {
        title: "Avatar",
        dataIndex: "avatar",
        key: "avatar",
        render: (text, record) => <Avatar src={`http://localhost:3001/uploads/avatars/${record.avatar}`} />,
    },
    {
        title: "Correo",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Nombre de Usuario",
        dataIndex: "username",
        key: "username",
    },
    {
        title: "Apellido",
        dataIndex: "lastname",
        key: "lastname",
    },
    {
        title: "Celular",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Cedula",
        dataIndex: "cedula",
        key: "cedula",
    },
    {
        title: "Rendimiento",
        dataIndex: "performance_driver",
        key: "performance_driver",
    },
    {
        title: "Activo",
        dataIndex: "active_user",
        key: "active_user",
        render: (text, record) => (
            <span>{record.active_user ? "Si" : "No"}</span>
        ),
    },
    {
        title: "Rol",
        dataIndex: "rol",
        key: "rol"
    },
    {
        title: "Acciones",
        key: "actions",
        render: (text, record) => (
            <Space size="middle">
                <Tooltip title="Tareas">

                    {record.rol !== "Admin" ?
                        <Button
                            onClick={() => handleTask(record.id)}
                            style={{ color: "Green", borderColor: "green" }}
                        >
                            Tareas
                        </Button>
                        : null
                    }

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

const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(filterName.toLowerCase()) && user.rol === "Conductor"
);

return (
    <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Lista de Usuarios</h2>
            <Input
                placeholder="Filtrar por nombre"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
            />
        </div>
        <Table dataSource={filteredUsers} columns={columns} rowKey="id" />
        {selectedUser && (
            <Modal
                title="Edit User"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form>
                    <Form.Item label="Email">
                        <Input
                            name="email"
                            value={selectedUser.email}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="User Name">
                        <Input
                            name="username"
                            value={selectedUser.username}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Last Name">
                        <Input
                            name="lastname"
                            value={selectedUser.lastname}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Active">
                        <Switch
                            checked={selectedUser.active_user}
                            onChange={handleSwitchChange}
                        />
                    </Form.Item>
                    <Form.Item label="Rol">
                        <Switch
                            checked={selectedUser.rol}
                            onChange={handleChange}
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