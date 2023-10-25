import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import '../../styles/AdminAddAccount.scss'
import ToastUtil from "../../untils/toastUtil";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const AdminAddAccount = ({ handleResult, handleClose, show }) => {
    const subLang = useSelector(state => state.lang.AdminAddAccount)

    const userNameRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()
    const nameRef = useRef()
    const phoneRef = useRef()
    const addressRef = useRef()
    const roleRef = useRef()

    const [errorMessage, setErrorMessage] = useState('')

    const onClickAddAccount = async (e) => {
        setErrorMessage('')
        const newAcc = {
            userName: userNameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
            name: nameRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value,
            role: roleRef.current.value
        }

        // const testAPI = () => {
        //     Promise.resolve(newAcc).then((data) => {
        //         userNameRef.current.value = ''
        //         passwordRef.current.value = ''
        //         emailRef.current.value = ''
        //         nameRef.current.value = ''
        //         addressRef.current.value = ''
        //         phoneRef.current.value = ''

        //         ToastUtil.success(subLang.create_success, 1000);
        //         handleClose && handleClose()
        //     }).catch((error) => {
        //         const messageResponse = error.response.data.message
        //         setErrorMessage(messageResponse)
        //     })
        // }

        // testAPI()
        await useCallApi(
            apiUrls.CREATE_PARTNER,
            newAcc
        ).then((data) => {
            handleResult && handleResult({
                ...newAcc,
                id: data.data.id,
                createdAt: (new Date()).toString()
            })

            userNameRef.current.value = ''
            passwordRef.current.value = ''
            emailRef.current.value = ''
            nameRef.current.value = ''
            addressRef.current.value = ''
            phoneRef.current.value = ''

            ToastUtil.success(subLang.create_success, 1000);
            handleClose && handleClose(e)
            // console.log(data)
        }).catch((error) => {
            // console.log(error)
            const messageResponse = error.response.data.message
            setErrorMessage(messageResponse)
        })
    }

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

    return (
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{subLang.add_new_account}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="AdminAddAccount-popupz">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">{subLang.userName}*</Form.Label>
                        <Col sm="8">
                            <Form.Control placeholder={subLang.userName} required ref={userNameRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">{subLang.password}*</Form.Label>
                        <Col sm="8">
                            <Form.Control type="password" placeholder={subLang.password} required ref={passwordRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">{subLang.email}*</Form.Label>
                        <Col sm="8">
                            <Form.Control placeholder={subLang.email} ref={emailRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">{subLang.name}</Form.Label>
                        <Col sm="8">
                            <Form.Control placeholder={subLang.name} ref={nameRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">{subLang.phone}</Form.Label>
                        <Col sm="8">
                            <Form.Control placeholder={subLang.phone} ref={phoneRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">{subLang.address}</Form.Label>
                        <Col sm="8">
                            <Form.Control placeholder={subLang.address} ref={addressRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">{subLang.role}</Form.Label>
                        <Col sm="8">
                            <Form.Select ref={roleRef}>
                                <option value={getRole(1)}>{getRole(1)}</option>
                                <option value={getRole(2)}>{getRole(2)}</option>
                                <option value={getRole(3)}>{getRole(3)}</option>
                                <option value={getRole(4)}>{getRole(4)}</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <div className="errorMsg">{errorMessage}</div>
                    {/* <Form.Group as={Row} className="mb-3" controlId="birth">
                        <Form.Label column sm="4">{subLang.birth}</Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" ref={birthRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="quantity">
                        <Form.Label column sm="4">{subLang.quantity}</Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" ref={quantityRef} />
                        </Col>
                    </Form.Group> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {subLang.cancel}
                </Button>
                <Button variant="primary" onClick={onClickAddAccount}>{subLang.add_new_account}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AdminAddAccount

