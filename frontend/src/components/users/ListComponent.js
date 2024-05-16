import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../api/user";
import { getUsers, editUserById, deleteUserById } from "../../slices/userSlice";
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

const { confirm } = Modal;

export const ListComponent = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const userApi = new User();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await userApi.getUsers();
                dispatch(getUsers(usersData));
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };

        fetchUsers();
    }, [dispatch]);

    const handleEdit = (id) => {
        const user = users.find((user) => user.id === id);
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        confirm({
            title: "Seguro quieres eliminar este usuario?",
            content: "Esta opción no se puede revertir",
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

    const handleOk = () => {
        userApi
            .editUserById(selectedUser.id, selectedUser)
            .then((result) => {
                dispatch(
                    editUserById({ userId: selectedUser.id, updatedUserData: result })
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
            title: "User Name",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Last Name",
            dataIndex: "lastname",
            key: "lastname",
        },
        {
            title: "Active",
            dataIndex: "active_user",
            key: "active_user",
            render: (text, record) => (
                <span>{record.active_user ? "Yes" : "No"}</span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
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
            <h2>Users List</h2>
            <Table dataSource={users} columns={columns} rowKey="id" />
            {selectedUser && (
                <Modal
                    title="Edit User"
                    visible={isModalVisible}
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
                        <Form.Item label="Avatar">
                            <Upload
                                accept="image/*"
                                beforeUpload={(file) => {
                                    return false;
                                }}
                                onChange={(info) => {
                                    console.log(info.fileList);
                                }}
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