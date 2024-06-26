import { React, useState } from "react";
import { MenuSide } from "../../components/general/menuSlide/MenuSide"
import logo from "../../uploads/images/logoCocaCola.svg"
import './AdminLayout.css'
import Notifications from "../../components/general/notifications/Notifications";
import UserOptions from "../../components/general/user/UserOptions";

export const AdminLayout = (props) => {
    const { children } = props
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className='admin-layout' style={collapsed ? { gridTemplateColumns: "80px 1fr" } : { gridTemplateColumns: "200px 1fr" }}>
            <div className='admin-layout__header'>
                <a className="logo" ><img src={logo} alt="Logo" /></a>
                <div className="header-right">
                    <div className="bell">
                        <Notifications />
                    </div>

                    <UserOptions />

                </div>
            </div>
            <div className='admin-layout__left'>
                <MenuSide collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>
            <div className='admin-layout__rigth'>
                <div className='admin-layout__rigth-content'>
                    {children}
                </div>
            </div>
        </div>
    )
}