import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../untils/constant";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { canMaintain, canExport, canRecall, canReturn } from "../../untils/actionAuth";
import ExportProducts from "./ExportProducts";

const FactoryActions = ({ products, regisAction }) => {
    const subLang = useSelector(state => state.lang.FactoryActions)
    const account = useSelector(state => state.user.account)
    const actionRef = useRef()

    const [actionKey, setActionKey] = useState('EXPORT')

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
            key: 'EXPORT',
            type: 'EXPORT',
            valid: canExport(products, account),
            title: subLang.action_one
        },
        {
            key: 'CONFIRM',
            type: 'CONFIRM',
            title: subLang.action_two
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
                actionKey == 'EXPORT' &&
                <ExportProducts regisAction={regisAction} products={products} />
            }
        </Form>
    )
}

export default FactoryActions