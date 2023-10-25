import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../untils/constant";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { Button, Modal, Form, Col, Row } from "react-bootstrap";


const RecallStart = ({ products, regisAction, hanldeResult }) => {
    const account = useSelector(state => state.user.account)
    const noteRef = useRef()


    useEffect(() => {
        const productIds = []
        products.forEach((product) => {
            productIds.push(product.id)
        })

        const action = async () => {
            return new Promise(async (resolve, reject) => {
                await useCallApi(
                    apiUrls.RECALL_PRODUCTS,
                    {
                        productIds: productIds,
                        note: noteRef.current?.value
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Note</Form.Label>
                <Form.Control as="textarea" ref={noteRef} rows={3} />
            </Form.Group>
        </>
    )
}

export default RecallStart