import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useRef, useState } from "react";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { useDispatch, useSelector } from "react-redux";


const AccountDisplay = ({ show, handleClose, row }) => {
    const subLang = useSelector(state => state.lang.AccountDisplay)
    const [loadingAccount, setLoadingAccount] = useState(false)
    const [account, setAccount] = useState({

    })


    useEffect(async () => {
        if (row) {
            setLoadingAccount(true)
            await useCallApi(
                apiUrls.GET_PARTNERS_BY_QUERY,
                {
                    attributes: {
                        id: {
                            eq: row.id
                        }
                    }
                }
            ).then((response) => {
                const { data } = response
                if (data.rows.length === 1) {
                    const account = data.rows[0]
                    setAccount(account)
                }
                setLoadingAccount(false)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [row])

    return (
        <>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{subLang.account_details}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        loadingAccount && <div>Loading...</div>
                    }
                    <ul>
                        <li>Id : {account.id}</li>
                        <li>{subLang.name} : {account.name}</li>
                        <li>{subLang.userName} : {account.userName}</li>
                        <li>{subLang.role} : {account.role}</li>
                        <li>{subLang.status} : {account.status === 1 ? subLang.status_disable : subLang.status_enable}</li>
                        <li>{subLang.email} : {account.email}</li>
                        <li>{subLang.phone} : {account.phone}</li>
                        <li>{subLang.address} : {account.address}</li>
                        <li>{subLang.created_at} : {account.createdAt}</li>
                        <li>{subLang.updated_at} : {account.updatedAt}</li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AccountDisplay