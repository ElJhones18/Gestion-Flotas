import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
const items = [
    {
        key: "sub1",
        label: "Usuarios",
        icon: <MailOutlined />,
        children: [
            {
                key: "/admin/users",
                label: <Link to="/admin/users">Usuarios</Link>,
                children: [
                    {
                        key: "/admin/users/create",
                        label: <Link to="/admin/users/create">Crear usuario</Link>,
                    },
                ],
            },
            
        ],
    },
    {
        key: "sub2",
        label: "Camiones",
        icon: <AppstoreOutlined />,
        children: [
            {
                key: "/admin/trucks",
                label: <Link to="/admin/trucks">Camiones</Link>,
                children: [
                    {
                        key: "/admin/truck/create",
                        label: <Link to="/admin/truck/create">Crear camión</Link>,
                    },
                ],
            },
        ],
    },
    // {
    //     key: "sub2",
    //     label: "Tareas",
    //     icon: <AppstoreOutlined />,
    //     children: [
    //         {
    //             key: "5",
    //             label: <Link to="/admin/tasks">Gestionar tareas</Link>,
    //         },
    //     ],
    // },
    {
        type: "divider",
    },
    {
        key: "sub4",
        label: "Navigation Three",
        icon: <SettingOutlined />,
        children: [
            {
                key: "9",
                label: "Option 9",
            }
        ],
    },
    {
        key: "grp",
        label: "Group",
        type: "group",
        children: [
            {
                key: "13",
                label: "Option 13",
            },
            {
                key: "14",
                label: "Option 14",
            },
        ],
    },
];

export const MenuSlide = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e.key);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} style={{ width: 256 }} selectedKeys={[current]} mode="inline" items={items} />;
};