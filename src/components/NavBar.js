import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContext";
import { useEffect, useState } from "react";

import styles from './NavBar.module.css'

const NavBar = () => {
    const { user } = useAuthValue()
    const {logout} = useAuthentication()
    const [isMobile, setIsMobile] = useState(false)

   

    return (
        <nav>
            <NavLink to="/" className={styles.brand}>Mini <span>Blog</span></NavLink>
            <ul className={isMobile ? styles.responsive_list: styles.links_list }
            onClick={() => setIsMobile(false)}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>Home</NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')}>Cadastrar</NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : '')}>Novo post</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : '')}>Dashboard</NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>Sobre</NavLink>
                </li>
                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>

                )}



            </ul>
            <button className={styles.mobile_menu_icon} onClick={() => setIsMobile(!isMobile)}>
                {isMobile ? (<i className="fas fa-times"></i>) : (<i className="fas fa-bars"></i>)}
            </button>
            

        </nav>
    )
}

export default NavBar