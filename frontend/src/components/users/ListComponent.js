import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  /*const [users, setUsers] = useState([]); */

  /*     useEffect( () => {
        const fetchUsers = async () => {
            const data = await userApi.getUsers();
            setUsers(data);
        }
        fetchUsers();
    }, []);  */

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
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Active",
      dataIndex: "active_user",
      key: "active_user",
      render: (text, record) => (
        <span>{record.active_user ? "Yes" : "No"}</span>
      ),
    },
    /* {
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
        }, */
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
          onCancel={handleCancel}
        >
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
                name="user_name"
                value={selectedUser.user_name}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input
                name="last_name"
                value={selectedUser.last_name}
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
                fileList={[]}
              >
                <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
  /* return (
        <>
            <h2>Lista de usuarios</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <span>{user.email}</span> - <span>{user.username}</span> - <span>{user.lastname}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay usuarios</p>
            )}
        </>
    ) */
};
