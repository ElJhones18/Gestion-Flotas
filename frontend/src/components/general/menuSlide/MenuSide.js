import React from 'react';
import { Link } from 'react-router-dom';
import {
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserDeleteOutlined,
    InfoCircleOutlined,
    UnorderedListOutlined,
    TruckOutlined,
    RightOutlined,
    LeftOutlined,
    HomeOutlined,
    FireOutlined
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
        // getItem('Crear usuario', 'create-user', <Link to={ROUTES.ADMIN_CREATE_USER}><UsergroupAddOutlined /></Link>),
    ]),
    getItem('Camiones', 'truck', <Link to={ROUTES.ADMIN_LIST_TRUCKS}><TruckOutlined /></Link>, [
        getItem('Listar camiones', 'list-trucks', <Link to={ROUTES.ADMIN_LIST_TRUCKS}><TruckOutlined /></Link>),
        getItem('Crear camión', 'create-truck', <Link to={ROUTES.ADMIN_CREATE_TRUCK}><TruckOutlined /></Link>),
        getItem('Crear checklist', 'create-checklist', <Link to={ROUTES.CHECKLIST}><UnorderedListOutlined /></Link>),
    ]),
    getItem('Combustibles', 'fuel', <Link to={ROUTES.ADMIN_LIST_FUELS}><FireOutlined /></Link>, [
        getItem('Listar combustibles', 'list-fuels', <Link to={ROUTES.ADMIN_LIST_FUELS}><UnorderedListOutlined /></Link>),
        getItem('Crear combustible', 'create-fuel', <Link to={ROUTES.ADMIN_CREATE_FUEL}><FileOutlined /></Link>),
    ]),
    getItem('Team', 'sub3', <PieChartOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
    getItem('Portal del Conductor', 'driver-portal', <Link to={ROUTES.DRIVER_PORTAL}><InfoCircleOutlined /></Link>),
    getItem('Cerrar Sesión', '10', <Link to={ROUTES.LOGOUT}>  <UserDeleteOutlined /> </Link>),
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
