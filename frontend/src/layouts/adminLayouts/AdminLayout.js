import { React } from "react";
import { MenuSlide } from "../../components/general/menuSlide/MenuSlide"
import { Link } from "react-router-dom";
import './AdminLayout.css'

export const AdminLayout = (props) => {
    const { children } = props
    return (
        <div className='admin-layout'>
            <div className='admin-layout__left'>
                <img></img>
                <MenuSlide />
            </div>
            <div className='admin-layout__header'>
                <h2><Link className="link" to="/">Coca Cola Flotas</Link></h2>
                <h3>Logout</h3>
            </div>
            <div className='admin-layout__rigth'>
                <div className='admin-layout__rigth-content'>
                    {children}
                </div>
            </div>
        </div>
    )
}