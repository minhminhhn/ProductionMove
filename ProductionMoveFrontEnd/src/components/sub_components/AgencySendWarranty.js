import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import '../../styles/AdminAddAccount.scss'
import ToastUtil from "../../untils/toastUtil";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { Button, Modal, Form, Col, Row, InputGroup } from "react-bootstrap";
import MathJax from 'react-mathjax';

const AgencySendWarranty = ({ handleResult, handleClose, show }) => {
    const subLang = useSelector(state => state.lang.AgencySendWarrantyOrder)
    const account = useSelector(state => state.user.account)

    const modelNameRef = useRef()
    const signNameRef = useRef()
    const generationRef = useRef()
    const seriesRef = useRef()
    const birthRef = useRef()
    const lengthRef = useRef()
    const widthRef = useRef()
    const heightRef = useRef()

    const [errorMessage, setErrorMessage] = useState('')

    const onClickSubmit = async (e) => {
        setErrorMessage('')
        const newModel = {
            name: modelNameRef.current.value,
            signName: signNameRef.current.value,
            generation: generationRef.current.value,
            birth: birthRef.current.value,
            series: seriesRef.current.value,
            length: lengthRef.current.value,
            width: widthRef.current.value,
            height: heightRef.current.value,
        }

        console.log(newModel)

        const testAPI = () => {
            Promise.resolve(newModel).then((data) => {
                modelNameRef.current.value = ''
                signNameRef.current.value = ''
                generationRef.current.value = ''
                birthRef.current.value = ''
                seriesRef.current.value = ''
                lengthRef.current.value = ''
                widthRef.current.value = ''
                heightRef.current.value = ''

                ToastUtil.success(subLang.add_success, 1000);
                handleClose && handleClose()
            }).catch((error) => {
                const messageResponse = error.response.data.message
                setErrorMessage(messageResponse)
            })
        }
        
        // await useCallApi(
        //     apiUrls.CREATE_MODEL,
        //     newModel
        // ).then((data) => {
        //     console.log(data)

        //     handleResult && handleResult({
        //         ...newModel,
        //         id: data.data.id
        //     })

        //     modelNameRef.current.value = ''
        //     signNameRef.current.value = ''
        //     generationRef.current.value = ''
        //     birthRef.current.value = ''
        //     seriesRef.current.value = ''
        //     lengthRef.current.value = ''
        //     widthRef.current.value = ''
        //     heightRef.current.value = ''

        //     ToastUtil.success(subLang.add_success, 1000);
        //     handleClose && handleClose(e)
        // }).catch((error) => {
        //     console.log(error)
        //     const messageResponse = error.response.data.message
        //     setErrorMessage(messageResponse)
        // })

        // testAPI()
    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{subLang.add_new_customer}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm="4">{subLang.name}*</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" ref={modelNameRef}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="produced_factory" >
                        <Form.Label column sm="4">{subLang.produced_factory}</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={account.name}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="birth">
                        <Form.Label column sm="4">{subLang.birth}</Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" ref={birthRef}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="height">
                        <Form.Label column sm="4">{subLang.height}</Form.Label>
                        <Col sm="8">
                            <InputGroup>
                                <Form.Control type="number" ref={heightRef}/>
                                <InputGroup.Text>mm</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                        <Form.Label column sm="4">{subLang.reason}</Form.Label>
                        <Col sm="8">
                            <Form.Control as="textarea" rows={3}/>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onClickSubmit}>{subLang.submit}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AgencySendWarranty

