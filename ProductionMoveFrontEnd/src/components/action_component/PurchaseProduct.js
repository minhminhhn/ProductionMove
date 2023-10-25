


import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../untils/constant";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { Button, Modal, Form, Col, Row } from "react-bootstrap";


const PurchaseProduct = ({ products, regisAction, hanldeResult }) => {
    const account = useSelector(state => state.user.account)
    const noteRef = useRef()
    const subLang = useSelector(state => state.lang.AdminProducts)
    const customerRef = useRef({})

    const CCIDRef = useRef()
    const emailRef = useRef()
    const nameRef = useRef()
    const phoneRef = useRef()
    const addressRef = useRef()

    const onChangeCCID = async () => {
        const cardId = CCIDRef.current.value
        console.log(cardId)
        const customerInfRes = await useCallApi(
            apiUrls.GET_CUSTOMER,
            {
                attributes: {
                    cardId: {
                        eq: cardId
                    }
                }
            }
        ).catch(err => {
            console.log(err)
        })
        const rows = customerInfRes.data.rows
        if (rows.length > 0) {
            const customer = rows[0]
            nameRef.current.placeholder = customer.name
            emailRef.current.placeholder = customer.email
            phoneRef.current.placeholder = customer.phone ? customer.phone : ''
            addressRef.current.placeholder = customer.address ? customer.address : ''
            // console.log(customer)
            customerRef.current = customer
        } else {
            nameRef.current.placeholder = ''
            emailRef.current.placeholder = ''
            phoneRef.current.placeholder = ''
            addressRef.current.placeholder = ''
            customerRef.current = {}
        }
    }


    useEffect(() => {
        const productIds = []
        products.forEach((product) => {
            productIds.push(product.id)
        })
        const productId = productIds[0]

        const action = async () => {
            const reCus = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                address: addressRef.current.value,
                cardId: CCIDRef.current.value,
                id: customerRef.current?.id
            }
            console.log(reCus)
            return new Promise(async (resolve, reject) => {
                await useCallApi(
                    apiUrls.SOLD_PRODUCT,
                    {
                        productId: productId,
                        customer: reCus
                    }
                ).then((res) => {
                    // const productIds = []
                    // res.data.forEach((maintain) => {
                    //     productIds.push(maintain.productId)
                    // })
                    resolve({
                        updatedIds: productIds,
                        message: 'Sucess message'
                    })
                }).catch((err) => {
                    console.log(err)
                    reject('Error Message')
                })
            })
        }
        regisAction(action)
    }, [products])

    return (
        <>
            <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="2">CCID*</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" ref={CCIDRef} onChange={onChangeCCID} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="2">Name*</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" ref={nameRef} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="2" >Email*</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" ref={emailRef} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="2">Phone</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" ref={phoneRef} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="2">Address</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" ref={addressRef} />
                </Col>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Note</Form.Label>
                <Form.Control as="textarea" ref={noteRef} rows={3} />
            </Form.Group>
        </>
    )
}

export default PurchaseProduct