import React from "react";
import { useHistory } from "react-router";

function NavItem({ pathname, onClickFunc, title, Icon = () => {return (<i className="fas fa-fw fa-wrench"></i>)} }) {
    const history = useHistory()
    return (
        <li className={`nav-item ${history.location.pathname.startsWith(pathname) ? 'active' : ''}`}>
            <a
                className="nav-link "
                href="#"
                onClick={() => onClickFunc()}
            >
                <Icon></Icon>
                <span>{title}</span>
            </a>
        </li>
    )
}

export default NavItem