import { React, useState } from "react";
import { MenuSlide } from "../../components/general/menuSlide/MenuSlide"
import { Link } from "react-router-dom";
import logo from "../../uploads/images/logoCocaCola.svg"
import './AdminLayout.css'
import { UserOutlined } from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";

export const AdminLayout = (props) => {
    const { children } = props
    const [collapsed, setCollapsed] = useState(false);
    
    const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollapsed({ collapsed });
      }

    return (
        <div className='admin-layout'>
        <div className='admin-layout__left'>
            <MenuSlide />
        </div>
        <div className='admin-layout__header'>
        <a className="logo" href="/"><img src={logo} alt="Logo" href="/" /></a>
        <UserOutlined style={{fontSize: '23px'}}/>
        </div>
        <div className='admin-layout__rigth'>
            <div className='admin-layout__rigth-content'>
                {children}
            </div>
        </div>
    </div>  
    )
}