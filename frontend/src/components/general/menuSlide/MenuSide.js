import React from 'react';
import { Link } from 'react-router-dom';
import {
    FileOutlined,
    SlidersOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    TruckOutlined,
    RightOutlined,
    LeftOutlined,
    HomeOutlined,
    FireOutlined,
    ToolOutlined,
    FileAddOutlined,
    HistoryOutlined
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
    getItem('Neumáticos', 'tire', <Link to={ROUTES.ADMIN_LIST_TIRES}><ToolOutlined /></Link>, [
        getItem('Listar neumáticos', 'list-tires', <Link to={ROUTES.ADMIN_LIST_TIRES}><UnorderedListOutlined /></Link>),
        getItem('Crear neumático', 'create-tire', <Link to={ROUTES.ADMIN_CREATE_TIRE}><FileAddOutlined /></Link>),
    ]),
    getItem('Mantenimiento', 'maintenance', <SlidersOutlined />, [
        getItem('', '6', <Link to={ROUTES.ADMIN_CREATE_MAINTENANCE}>Crear mantenimiento</Link>),
        getItem('Historial', '8', <Link to={ROUTES.ADMIN_LIST_MAINTENANCES}><HistoryOutlined /></Link>),]),
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
