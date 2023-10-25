import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";
import "../../vendor/datatables/dataTables.bootstrap4.min.css";
import { Redirect } from "react-router";
import { paths } from "../../untils/constant";
import TableBase from "../sub_components/Table";
import { textFilter, selectFilter } from "react-bootstrap-table2-filter";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import AdminAddAccount from "../sub_components/AdminAddAccount";
import AccountDisplay from "../display/AccountDisplay";

const AdminAccounts = () => {
    const account = useSelector(state => state.user.account)
    const subLang = useSelector(state => state.lang.AdminAccounts)
    const deviceType = useSelector(state => state.device.type)
    const [listPartners, setListPartners] = useState({})
    const [partnersloading, setPartnersLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [arrayPartners, setArrayPartners] = useState([])
    const [showCreateAccount, setShowCreateAccount] = useState(false)
    const [showAccountDetail, setShowAccountDetail] = useState(false)
    const [choosedRow, setChoosedRow] = useState({})

    // *** prevent another role from accessing to link which just only for admin ***
    if (account?.role !== 1) {
        return (
            <Redirect to={paths.SYSTEM} />
        )
    }

    // *** API load data ***
    useEffect(async () => {
        setErrorMessage('')
        setPartnersLoading(true)
        await useCallApi(
            apiUrls.GET_PARTNERS_BY_QUERY,
        ).then((data) => {
            setPartnersLoading(false)
            const partnersRequest = data.data.rows
            const partners = {}
            for (const partner of partnersRequest) {
                partners[partner.id] = partner
            }
            setListPartners({
                ...listPartners,
                ...partners
            })
        }).catch((error) => {
            setErrorMessage('Some error occur, please try again!')
        })
    }, [])

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
                return subLang.unknown
        }
    }
    // *** update table of list products when numOfProduct or language is changed ***
    useEffect(() => {
        const transPartners = []
        Object.values(listPartners).forEach((partner) => {
            transPartners.push({
                ...partner,
                role: getRole(partner.role)
            })
        })
        transPartners.sort((p1, p2) => Date.parse(p2.createdAt) - Date.parse(p1.createdAt))
        setArrayPartners(transPartners)
    }, [subLang, listPartners])

    const selectOptions = {
        options: {
            [subLang.admin]: subLang.admin,
            [subLang.factory]: subLang.factory,
            [subLang.maintain_center]: subLang.maintain_center,
            [subLang.agency]: subLang.agency,
            [subLang.unknown]: subLang.unknown
        }
    }

    const columns = (() => {
        const options = {
            id: { dataField: 'id', text: 'Id', sort: true },
            name: { dataField: 'name', text: subLang.name, filter: textFilter(), sort: true },
            email: { dataField: 'email', text: subLang.email, filter: textFilter() },
            phone: { dataField: 'phone', text: subLang.phone, filter: textFilter() },
            address: { dataField: 'address', text: subLang.address, filter: textFilter() },
            role: {
                dataField: 'role', text: subLang.role,
                formatter: cell => selectOptions.options[cell],
                filter: selectFilter(selectOptions)
            }
        }

        const { id, name, email, phone, address, role } = options

        if (deviceType.isMobie) {
            return [id, name, role]
        }
        if (deviceType.isTablet) {
            return [id, name, role, address]
        }
        if (deviceType.isDesktop) {
            return Object.values(options)
        }
    })()

    // *** update new account -> to table of accounts list -> when add new account ***
    const handleResult = (newAccount) => {
        const listCopy = { ...listPartners }
        listCopy[newAccount.id] = newAccount
        setListPartners(listCopy)
        // forceUpdate()
        // console.log(newAccount)
    }

    const closeModalCreateAccount = (e) => {
        setShowCreateAccount(false)
    }

    const closeModalAccountDetail = () => {
        setShowAccountDetail(false)
    }

    const openModalCreateAccount = () => {
        setShowCreateAccount(true)
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setShowAccountDetail(true)
            setChoosedRow(row)
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">{subLang.manage_accounts}</h1>
            </div>

            {/* Button Create Account */}
            <button className="btn btn-primary" onClick={() => openModalCreateAccount()}>{subLang.add_new_account}</button>

            {/* Popup Form **************************************************************** */}
            {
                <AdminAddAccount
                    handleResult={handleResult}
                    handleClose={closeModalCreateAccount}
                    show={showCreateAccount} />
            }

            <AccountDisplay
                handleClose={closeModalAccountDetail}
                show={showAccountDetail}
                row={choosedRow}
            />

            <TableBase
                title={`${subLang.sumary_re(arrayPartners.length)}`}
                data={arrayPartners}
                columns={columns}
                isLoading={partnersloading}
                getBtn={{ display: 'none' }}

                rowEvents={rowEvents}
            />
        </div>
    )
}

export default AdminAccounts