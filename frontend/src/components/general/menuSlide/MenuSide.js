import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    TruckOutlined,
    RightOutlined,
    LeftOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Usuarios', 'user', <Link to="/admin/users"><TeamOutlined /></Link>, [
        getItem('Listar usuarios', 'list-users', <Link to="/admin/users"><TeamOutlined /></Link>),
        getItem('Crear usuario', 'create-user', <Link to="/admin/users/create"><UsergroupAddOutlined /></Link>),
    ]),
    getItem('Camiones', 'truck', <Link to="/admin/trucks"><TruckOutlined /></Link>, [
        getItem('Listar camiones', 'list-trucks', <Link to="/admin/trucks"><TruckOutlined /></Link>),
        getItem('Crear camión', 'create-truck', <Link to="/admin/truck/create"><TruckOutlined /></Link>),
    ]),
    getItem('Team', 'sub3', <PieChartOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

export const MenuSide = (props) => {
    const { collapsed, setCollapsed } = props

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu theme="light" defaultSelectedKeys={['user']} mode="inline" items={items} />
            <div onClick={() => setCollapsed(!collapsed)} style={{ display: "flex", justifyContent: "center" }}>
                {collapsed ? <RightOutlined /> : <LeftOutlined />}
            </div>
        </Sider>
    );
};
