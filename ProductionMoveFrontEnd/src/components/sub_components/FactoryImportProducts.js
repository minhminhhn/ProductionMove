import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import '../../styles/AdminAddAccount.scss'
import ToastUtil from "../../untils/toastUtil";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { Button, Modal, Form, Col, Row } from "react-bootstrap";

const FactoryImportProducts = ({ handleResult, handleClose, show }) => {
    const subLang = useSelector(state => state.lang.FactoryImportProducts)
    const account = useSelector(state => state.user.account)

    const quantityRef = useRef()
    const modelIdRef = useRef()
    const birthRef = useRef()

    const [errorMessage, setErrorMessage] = useState('')
    const [errorMessage2, setErrorMessage2] = useState('')
    const [listModels, setListModels] = useState([])

    // *** Get listModels by factoryId
    useEffect(async () => {
        setErrorMessage2('')
        await useCallApi(
            apiUrls.GET_MODELS_BY_QUERY,
            {
                attributes: {
                    factoryId: { eq: account.id }
                }
            }
        ).then((data) => {
            console.log("models:")
            console.log(data)
            setListModels(data.data.rows)
        }).catch((error) => {
            console.log(error)
            const messageResponse2 = error.response.data.message
            setErrorMessage2(messageResponse2)
        })
    }, [])

    // *** function will call API to import products
    const onClickSubmit = async (e) => {
        setErrorMessage('')
        const quantity = quantityRef.current.value
        const newProduct = {
            modelId: modelIdRef.current.value,
            birth: birthRef.current.value,
        }
        let listNewProducts = []
        for (let i = 0; i < quantity; i++) {
            listNewProducts.push(newProduct)
        }

        // const testAPI = () => {
        //     Promise.resolve(listNewProducts).then((data) => {
        //         modelIdRef.current.value = ''
        //         birthRef.current.value = ''

        //         ToastUtil.success(subLang.import_success, 1000);
        //         handleClose && handleClose()
        //     }).catch((error) => {
        //         const messageResponse = error.response.data.message
        //         setErrorMessage(messageResponse)
        //     })
        // }
        // console.log(modelIdRef.current)

        // *** call API to import products
        await useCallApi(
            apiUrls.CREATE_PRODUCTS,
            {
                products: listNewProducts
            }
        ).then(async (data) => {
            const products = data.data
            const ids = []
            products.forEach((product) => { ids.push(product.id) })
            await useCallApi(
                apiUrls.GET_CURRENT_PRODUCTS_BY_QUERY,
                {
                    associates: {
                        product: {
                            model: { factory: true }
                        },
                        nowAt: true,
                        willAt: true,
                        customer: true
                    },
                    attributes: {
                        id: {
                            or: ids
                        }
                    }
                }
            ).then((data) => {
                console.log(data)
                const holdersRequest = data.data.rows
                const products = {}
                for (const holder of holdersRequest) {
                    const { product, nowAt, willAt, customer } = holder
                    product.holders = { nowAt, willAt, customer }
                    products[product.id] = product
                }
                handleResult && handleResult(products)

                modelIdRef.current.value = ''
                birthRef.current.value = ''

                ToastUtil.success(subLang.import_success, 1000);
                handleClose && handleClose(e)

            })
            // console.log(data)
        }).catch((error) => {
            console.log(error)
            const messageResponse = error.response.data.message
            setErrorMessage(messageResponse)
        })

        // testAPI()
    }

    {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        // console.log(today);
    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{subLang.import_products}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="produced_factory">
                        <Form.Label column sm="4">{subLang.produced_factory}</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={account.name} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="model">
                        <Form.Label column sm="4">{subLang.model}</Form.Label>
                        <Col sm="8">
                            <Form.Select ref={modelIdRef} aria-label="Default select example" >
                                {listModels.map(model => (
                                    <option value={model.id} key={model.id}>
                                        {model.id + " - " + model.name + " - " + model.signName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="birth">
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

export default FactoryImportProducts

