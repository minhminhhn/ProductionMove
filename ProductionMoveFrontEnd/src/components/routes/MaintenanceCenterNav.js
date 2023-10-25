import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";
import LanguageChooser from "../sub_components/LanguageChooser";
import { useHistory, withRouter } from "react-router";
import { paths } from "../../untils/constant";
import NavItem from "./NavItem";

const MaintenanceNavigator = (probs) => {
    const subLang = useSelector(state => state.lang.MaintenanceNavigator)
    const history = probs.history
    const onClickModels = () => {
        history.push(paths.MAINTENANCE_MODELS)
        console.log(history)
    }
    const onClickProducts = () => {
        history.push(paths.MAINTENANCE_PRODUCTS)
        console.log(history)
    }

    return (
        <>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">{subLang.maintenance}</div>

            <NavItem
                pathname = {paths.MAINTENANCE_MODELS}
                onClickFunc = {onClickModels}
                title = {subLang.maintenance_models}
                Icon = {() => { return (
                    <i className="fa-solid fa-eye"></i>
                )}}
            />
            <NavItem
                pathname = {paths.MAINTENANCE_PRODUCTS}
                onClickFunc = {onClickProducts}
                title = {subLang.maintenance_products}
            />
        </>
    )
}

export default withRouter(MaintenanceNavigator)