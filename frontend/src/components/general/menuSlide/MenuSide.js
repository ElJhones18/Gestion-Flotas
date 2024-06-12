import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    UserDeleteOutlined,
    UsergroupAddOutlined,
    TruckOutlined,
    RightOutlined,
    LeftOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { ROUTES } from "../../../routes/index";

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
    getItem('Home', 'home', <Link to="/home"><HomeOutlined /></Link>),
    getItem('Usuarios', 'user', <Link to={ROUTES.ADMIN_LIST_USERS}><TeamOutlined /></Link>, [
        getItem('Listar usuarios', 'list-users', <Link to={ROUTES.ADMIN_LIST_USERS}><TeamOutlined /></Link>),
        getItem('Crear usuario', 'create-user', <Link to={ROUTES.ADMIN_CREATE_USER}><UsergroupAddOutlined /></Link>),
    ]),
    getItem('Camiones', 'truck', <Link to={ROUTES.ADMIN_LIST_TRUCKS}><TruckOutlined /></Link>, [
        getItem('Listar camiones', 'list-trucks', <Link to={ROUTES.ADMIN_LIST_TRUCKS}><TruckOutlined /></Link>),
        getItem('Crear camión', 'create-truck', <Link to={ROUTES.ADMIN_CREATE_TRUCK}><TruckOutlined /></Link>),
    ]),
    getItem('Team', 'sub3', <PieChartOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
    getItem('Cerrar Sesión', '10', <Link to="/logout"> <UserDeleteOutlined /> </Link>),
];

export const MenuSide = (props) => {
    const { collapsed, setCollapsed } = props

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu theme="light" defaultSelectedKeys={['home']} mode="inline" items={items} />
            <div onClick={() => setCollapsed(!collapsed)} style={{ display: "flex", justifyContent: "center" }}>
                {collapsed ? <RightOutlined /> : <LeftOutlined />}
            </div>
        </Sider>
    );
};
