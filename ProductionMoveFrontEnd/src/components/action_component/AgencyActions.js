import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../untils/constant";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import MaintainStart from './MaintainStart';
import ExportProducts from "./ExportProducts";

import { canMaintain, canExport, canRecall, canReturn, canConfirm, canPurchase } from "../../untils/actionAuth";
import RecallStart from "./RecallStart";
import ReturnProduct from "./ReturnProduct";
import ConfirmProduct from './ConfirmProducts';
import PurchaseProduct from './PurchaseProduct';




const AgencyActions = ({ products, regisAction }) => {
    const subLang = useSelector(state => state.lang.AgencyActions)
    const account = useSelector(state => state.user.account)
    const actionRef = useRef()

    const [actionKey, setActionKey] = useState('MAINTAIN')
    // const resources = useSelector(state => state.resources)

    // useEffect(() => {
    //     console.log(actionRef)
    // }, [actionRef.current])
    // console.log(products)

    const onChangeAction = (e) => {
        setActionKey(e.target.value)
        console.log(e.target.value)
    }

    useEffect(() => {
        if (actionRef.current) {
            setActionKey(actionRef.current.value)
        }
    }, [actionRef.current])

    const actions = [
        {
            key: 'MAINTAIN',
            type: 'MAINTAIN',
            valid: canMaintain(products),
            title: subLang.action_one,
        },
        {
            key: 'RECALL',
            type: 'RECALL',
            valid: canRecall(products),
            title: subLang.action_two,
        },
        {
            key: 'EXPORT',
            type: 'EXPORT',
            valid: canExport(products, account),
            title: subLang.action_three,
        },
        {
            key: 'RETURN',
            type: 'RETURN',
            valid: canReturn(products, account),
            title: subLang.action_four,
        },
        {
            key: 'CONFIRM',
            type: 'CONFIRM',
            valid: canConfirm(products, account),
            title: subLang.action_five,
        },
        {
            key: 'PURCHASE',
            type: 'PURCHASE',
            valid: canPurchase(products, account),
            title: subLang.action_six,
        }
    ]

    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="model">
                <Form.Label column sm="2">{subLang.actions_selection}</Form.Label>
                <Col sm="10">
                    <Form.Select onChange={(e) => { onChangeAction(e) }} ref={actionRef}>
                        {
                            actions.map((action) =>
                                <option value={action.key} key={action.key} disabled={action.valid ? false : true}>
                                    {
                                        action.title
                                    }
                                </option>
                            )
                        }
                    </Form.Select>
                </Col>
            </Form.Group>
            {
                actionKey == 'MAINTAIN' &&
                <MaintainStart regisAction={regisAction} products={products} />
            }
            {
                actionKey == 'EXPORT' &&
                <ExportProducts regisAction={regisAction} products={products} />
            }
            {
                actionKey == 'RECALL' &&
                <RecallStart regisAction={regisAction} products={products} />
            }
            {
                actionKey == 'RETURN' &&
                <ReturnProduct regisAction={regisAction} products={products} />
            }
            {
                actionKey == 'CONFIRM' &&
                <ConfirmProduct regisAction={regisAction} products={products} />
            }
            {
                actionKey == 'PURCHASE' &&
                <PurchaseProduct regisAction={regisAction} products={products} />
            }
        </Form>
    )
}

export default AgencyActions



