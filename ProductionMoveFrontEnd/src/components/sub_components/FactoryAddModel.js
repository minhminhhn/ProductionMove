import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import '../../styles/AdminAddAccount.scss'
import ToastUtil from "../../untils/toastUtil";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { Button, Modal, Form, Col, Row, InputGroup } from "react-bootstrap";
import MathJax from 'react-mathjax';

const FactoryAddModel = ({ handleResult, handleClose, show }) => {
    const subLang = useSelector(state => state.lang.FactoryAddModel)
    const account = useSelector(state => state.user.account)

    const modelNameRef = useRef()
    const signNameRef = useRef()
    const generationRef = useRef()
    const seriesRef = useRef()
    const birthRef = useRef()
    const lengthRef = useRef()
    const widthRef = useRef()
    const heightRef = useRef()
    const numberOfSeatsRef = useRef()
    const bodyTypeRef = useRef()
    const engineTypeRef = useRef()
    const boostTypeRef = useRef()
    const maxSpeedRef = useRef()
    const accelerationRef = useRef()
    const cityFuelRef = useRef()

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
            // numberOfSeats: numberOfSeatsRef.current.value,
            bodyType: bodyTypeRef.current.value,
            engineType: engineTypeRef.current.value,
            // boostType: boostTypeRef.current.value,
            // maxSpeed: maxSpeedRef.current.value,
            accceleration: accelerationRef.current.value,
            cityFuel: cityFuelRef.current.value
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
                bodyTypeRef.current.value = ''
                engineTypeRef.current.value = ''
                accelerationRef.current.value = ''
                cityFuelRef.current.value = ''

                ToastUtil.success(subLang.add_success, 1000);
                handleClose && handleClose()
            }).catch((error) => {
                const messageResponse = error.response.data.message
                setErrorMessage(messageResponse)
            })
        }

        await useCallApi(
            apiUrls.CREATE_MODEL,
            newModel
        ).then(async (data) => {
            console.log(data)

            newModel.factory = {
                name: account.name
            }

            handleResult && handleResult({
                ...newModel,
                id: data.data.id
            })

            modelNameRef.current.value = ''
            signNameRef.current.value = ''
            generationRef.current.value = ''
            birthRef.current.value = ''
            seriesRef.current.value = ''
            lengthRef.current.value = ''
            widthRef.current.value = ''
            heightRef.current.value = ''
            bodyTypeRef.current.value = ''
            engineTypeRef.current.value = ''
            accelerationRef.current.value = ''
            cityFuelRef.current.value = ''

            ToastUtil.success(subLang.add_success, 1000);
            handleClose && handleClose(e)
        }).catch((error) => {
            console.log(error)
            const messageResponse = error.response.data.message
            setErrorMessage(messageResponse)
        })

        // testAPI()
    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{subLang.add_new_model}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm="4">{subLang.name}*</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" ref={modelNameRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="sign_name">
                        <Form.Label column sm="4">{subLang.sign_name}*</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" ref={signNameRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="generation" >
                        <Form.Label column sm="4">{subLang.generation}</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" ref={generationRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="produced_factory" >
                        <Form.Label column sm="4">{subLang.produced_factory}</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={account.name} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="birth">
                        <Form.Label column sm="4">{subLang.birth}</Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" ref={birthRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="series">
                        <Form.Label column sm="4">{subLang.series}</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" ref={seriesRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="length">
                        <Form.Label column sm="4">{subLang.length}</Form.Label>
                        <Col sm="8">
                            <InputGroup>
                                <Form.Control type="number" ref={lengthRef} />
                                <InputGroup.Text>mm</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="width">
                        <Form.Label column sm="4">{subLang.width}</Form.Label>
                        <Col sm="8">
                            <InputGroup>
                                <Form.Control type="number" ref={widthRef} />
                                <InputGroup.Text>mm</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="height">
                        <Form.Label column sm="4">{subLang.height}</Form.Label>
                        <Col sm="8">
                            <InputGroup>
                                <Form.Control type="number" ref={heightRef} />
                                <InputGroup.Text>mm</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="body_type">
                        <Form.Label column sm="4">{subLang.body_type}</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" ref={bodyTypeRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="engine_type">
                        <Form.Label column sm="4">{subLang.engine_type}</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" ref={engineTypeRef} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="max_speed">
                        <Form.Label column sm="4">{subLang.max_speed}</Form.Label>
                        <Col sm="8">
                            <InputGroup>
                                <Form.Control type="number" ref={maxSpeedRef} />
                                <InputGroup.Text>km/h</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="acceleration">
                        <Form.Label column sm="4">{subLang.acceleration}</Form.Label>
                        <Col sm="8">
                            <InputGroup>
                                <Form.Control type="number" ref={accelerationRef} />
                                <InputGroup.Text>
                                    <MathJax.Provider>
                                        <MathJax.Node inline formula='m/s^2' />
                                    </MathJax.Provider>
                                </InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="city_fuel">
                        <Form.Label column sm="4">{subLang.city_fuel}</Form.Label>
                        <Col sm="8">
                            <InputGroup>
                                <Form.Control type="number" ref={cityFuelRef} />
                                <InputGroup.Text>
                                    <MathJax.Provider>
                                        <MathJax.Node inline formula='l/100km' />
                                    </MathJax.Provider>
                                </InputGroup.Text>
                            </InputGroup>
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

export default FactoryAddModel

