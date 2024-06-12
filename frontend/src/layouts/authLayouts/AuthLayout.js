import { React } from "react";
import logo from "../../uploads/images/logoCocaCola.svg"
import coca from "../../uploads/images/register-login.png"
import './AuthLayout.css'

export const AuthLayout = (props) => {
    const { children } = props

    return (
        <div className='auth-layout'>
            <div className='auth-layout__header'>
                <a className="logo" href="/"><img src={logo} alt="Logo" href="/" /></a>
            </div>
                <img className='auth-layout__left' src={coca} alt="CocaCola" />
            <div className='auth-layout__rigth'>
                <div className='auth-layout__rigth-content'>
                    {children}
                </div>
            </div>
        </div>
    )
}