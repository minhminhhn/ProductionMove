import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";

import "../../vendor/datatables/jquery.dataTables.min"
import "../../vendor/datatables/dataTables.bootstrap4.min"
import '../../styles/AccountInfo.scss';

const AccountInfo = () => {
    const subLang = useSelector(state => state.lang.AccountInfo)
    const account = useSelector(state => state.user.account)
    const getRole = (roleId) => {
        switch (roleId) {
            case 1:
                return subLang.admin
            case 2:
                return subLang.factory
            case 3:
                return subLang.agency
            case 4:
                return subLang.maintain_center
            default:
                return 'Unknown'
        }
    }
    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">{subLang.account_info}</h1>
            </div>
            <div className="row">
                <div className="inf-container col-12 ml-5">
                    <ul>
                        <li>
                            <label>{subLang.name}: </label>
                            <span>{account.name}</span>
                        </li>
                        <li>
                            <label>{subLang.role}: </label>
                            <span>{getRole(account.role)}</span>
                        </li>
                        <li>
                            <label>{subLang.email}: </label>
                            <span>{account.email}</span>
                        </li>
                        <li>
                            <label>{subLang.phone}: </label>
                            <span>{account.phone}</span>
                        </li>
                        <li>
                            <label>{subLang.address}: </label>
                            <span>{account.address}</span>
                        </li>
                        <li>
                            <label>{subLang.birth}: </label>
                            <span>{account.birth ? account.birth : 'None'}</span>
                        </li>
                        <li>
                            <label>{subLang.status}: </label>
                            <span>{account.status == 2 ? subLang.status_enable : subLang.status_disable}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo
