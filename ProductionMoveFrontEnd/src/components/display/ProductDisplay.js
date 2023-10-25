import Modal from 'react-bootstrap/Modal';

import React, { useEffect, useRef, useState } from "react";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { useDispatch, useSelector } from "react-redux";

import '../../styles/ProductDisplay.scss'


const ProductDisplay = ({ show, handleClose, row }) => {
    const subLang = useSelector(state => state.lang.ProductDisplay)
    const [loadingProduct, setLoadingProduct] = useState(false)
    const [product, setProduct] = useState({
        id: 9999,
        modelName: 'Unknown',
        factoryName: 'Unknown',
        birth: 'Unknown',
        location: 'Unknown',
    })

    const parseHistory = (product) => {

        const history = []
        history.push({
            id: 0,
            key: 'BIRTH',
            time: product.birth,
            factory: product?.model?.factory
        })
        if (product.purchase) {
            history.push({
                key: 'PURCHASE',
                time: product.purchase.date,
                agency: product.purchase.dealer,
                customer: product.purchase.customer
            })
        }

        if (product?.maintains) {
            for (const maintain of product.maintains) {
                history.push({
                    key: 'MAINTAIN_START',
                    time: maintain.date,
                    agency: product.purchase.dealer,
                    customer: product.purchase.customer
                })
            }
        }

        if (product?.recalls) {
            for (const recall of product.recalls) {
                history.push({
                    key: 'RECALL_START',
                    time: recall.date,
                    agency: product.purchase.dealer,
                    customer: product.purchase.customer
                })
            }
        }

        if (product?.exports) {
            for (const _export of product.exports) {
                const sample = {
                    time: _export.date,
                    sender: _export.sender,
                    reciever: _export.reciever,
                    isExport: true,
                    confirm: _export.confirm
                }
                switch (_export.type) {
                    case 0: {
                        sample.key = 'EXPORT_OUT'
                        break
                    }
                    case 1: {
                        sample.key = 'MAINTAIN_MOVING'
                        if (_export.sender.role === 3) sample.isFromAgency = true
                        break
                    }
                    case 2: {
                        sample.key = 'MAINTAIN_FAIL'
                        break
                    }
                    case 3: {
                        sample.key = 'RECALL_MOVING'
                        if (_export.sender.role === 3) sample.isFromAgency = true
                        break
                    }
                    case 4: {
                        sample.key = 'RETURN_CUSTOMER'
                        sample.reciever = product.purchase.customer
                        break
                    }
                }
                history.push(sample)
                if (sample.isExport && sample.confirm) {
                    history.push({
                        ...sample,
                        key: 'RECIEVED_PRODUCT'
                    })
                }
            }
        }
        history.sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
        return history
    }
    const roles = {
        2: subLang.factory,
        3: subLang.agency,
        4: subLang.maintain_center
    }

    useEffect(async () => {
        if (row) {
            setLoadingProduct(true)
            await useCallApi(
                apiUrls.GET_PRODUCTS_BY_QUERY,
                {
                    attributes: {
                        id: {
                            eq: row.id
                        }
                    },
                    associates: {
                        model: { factory: true },
                        purchase: {
                            dealer: true,
                            customer: true
                        },
                        exports: {
                            sender: true,
                            reciever: true
                        },
                        maintains: true,
                        recalls: true,
                        holders: true
                    }
                }
            ).then((response) => {
                const { data } = response
                if (data.rows.length === 1) {
                    const product = data.rows[0]
                    const productHistory = parseHistory(product)
                    product.history = productHistory
                    const holders = product.holders
                    product.location = (() => {
                        if (holders?.nowAt) {
                            if (holders?.willAt) {
                                return subLang.moving_to(holders.willAt)
                            } else {
                                return subLang.staying_at(holders.nowAt.name, roles[holders.nowAt.role])
                            }
                        } else {
                            return subLang.by_customer(holders.customer.name)
                        }



                    })()
                    product.modelName = product?.model?.name + ' - ' + product?.model?.signName
                    product.factoryName = product?.model?.factory?.name

                    setProduct(product)

                    // console.log(Date.parse('2004-01-11T17:00:00.000Z'))
                    // console.log(product)
                    // console.log(productHistory)
                }
                setLoadingProduct(false)

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
                    <Modal.Title>{subLang.product_details}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        loadingProduct && <div>Loading...</div>
                    }
                    <div className='product-detail-container'>
                        <div className='product-detail'>
                            <ul>
                                <li>Id: {product.id}</li>
                                <li>{subLang.model}: {product.modelName}</li>
                                <li>{subLang.produced_factory}: {product.factoryName}</li>
                                <li>{subLang.birth}: {product.birth}</li>
                                <li>{subLang.location}: {product.location}</li>
                            </ul>
                        </div>
                        <div className='product-history'>
                            <h5>{subLang.history}</h5>
                            <ul className='timeline'>
                                {
                                    product?.history?.map((event, index) => {

                                        const title = (() => {
                                            switch (event.key) {
                                                case 'BIRTH': {
                                                    return subLang.produced_at(event?.factory?.name)
                                                }
                                                case 'MAINTAIN_START': {
                                                    return subLang.begin_maintain(event?.agency?.name)
                                                }
                                                case 'EXPORT_OUT': {
                                                    return subLang.export_out(event?.sender, event?.reciever, roles)
                                                }
                                                case 'PURCHASE': {
                                                    return subLang.purchase_to(event?.customer.name)
                                                }
                                                case 'RECALL_START': {
                                                    return subLang.recall_start(event?.agency, event?.customer)
                                                }
                                                case 'MAINTAIN_FAIL': {
                                                    return subLang.maintain_fail(event?.sender, event?.reciever)
                                                }
                                                case 'MAINTAIN_MOVING': {
                                                    return subLang.maintain_moving(event.sender, event.reciever, event.isFromAgency)
                                                }
                                                case 'RETURN_CUSTOMER': {
                                                    return subLang.return_customer(event?.sender, event?.reciever)
                                                }
                                                case 'RECALL_MOVING': {
                                                    return subLang.recall_moving(event.sender, event.reciever, event.isFromAgency)
                                                }
                                                case 'RECIEVED_PRODUCT': {
                                                    if (event.reciever) {
                                                        return subLang.recieved_product(event.sender, event.reciever, roles)
                                                    }
                                                }
                                            }
                                            return event.key
                                        })();

                                        return (
                                            <li key={index} className='moment'>
                                                <h5 className='moment-title'>{event.time}</h5>
                                                <div className='moment-content'>
                                                    {
                                                        title
                                                    }
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProductDisplay