import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../untils/constant";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { Button, Modal, Form, Col, Row } from "react-bootstrap";


const MaintenanceActions = ({ products, regisAction }) => {
    const subLang = useSelector(state => state.lang.MaintenanceActions)
    const actionRef = useRef()
    const [actionKey, setActionKey] = useState('MAINTAIN_START')
    // const resources = useSelector(state => state.resources)

    // useEffect(() => {
    //     console.log(actionRef)
    // }, [actionRef.current])
    // console.log(products)

    const onChangeAction = (e) => {
        setActionKey(e.target.value)
    }

    const actions = [
        {
            key: 'RETURN_ERROR',
            title: 'Trả sản phẩm lỗi về cơ sở sản xuất',
            // valid: canMaintain(products)
        },
        {
            key: 'RETURN_RECALLED',
            title: 'Trả sản phẩm bị thu hồi về cơ sở sản xuất'
        },
        {
            key: 'RETURN_AGENCY',
            title: 'Trả sản phẩm đã bảo hành xong cho đại lý'
        },
        {
            key: 'CONFIRM',
            title: 'Xác nhận sản phẩm'
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
                // actionKey == 'MAINTAIN_START' &&
                // <MaintainStart regisAction={regisAction} products={products} />
            }
        </Form>
    )
}

export default MaintenanceActions



