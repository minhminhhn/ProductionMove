import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";

import { useHistory } from "react-router";
import { paths } from "../../untils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavItem from "./NavItem";

const AdminNavigator = (probs) => {
    const subLang = useSelector(state => state.lang.AdminNavigator)
    const history = useHistory()
    const onClickAccounts = () => {
        history.push(paths.ADMIN_ACCOUNTS)
    }
    const onClickModels = () => {
        history.push(paths.ADMIN_MODELS)
    }
    const onClickProducts = () => {
        history.push(paths.ADMIN_PRODUCTS)
    }
    const onClickCustomers = () => {
        history.push(paths.ADMIN_CUSTOMERS)
    }

    return (
        <>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">{subLang.admin}</div>

            <NavItem
                pathname={paths.ADMIN_ACCOUNTS}
                onClickFunc={onClickAccounts}
                title={subLang.manage_accounts}
            />
            <NavItem
                pathname={paths.ADMIN_MODELS}
                onClickFunc={onClickModels}
                title={subLang.manage_models}
            />
            <NavItem
                pathname={paths.ADMIN_PRODUCTS}
                onClickFunc={onClickProducts}
                title={subLang.manage_products}
            />
            <NavItem
                pathname={paths.ADMIN_CUSTOMERS}
                onClickFunc={onClickCustomers}
                title={subLang.view_customers}
                Icon = {() => { return (
                    <i className="fa-solid fa-eye"></i>
                )}}
            />
        </>
    )
}

export default AdminNavigator