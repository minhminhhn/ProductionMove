import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../untils/constant";
import useCallApi from "../../untils/fetch";
import { apiUrls, roles } from "../../untils/constant";
import { Redirect, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import FactoryActions from "./FactoryActions";
import AgencyActions from "./AgencyActions";
import { async } from "q";
import ToastUtil from "../../untils/toastUtil";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import MaintainCenterActions from './MaintainCenterActions';

const pagination = paginationFactory({
    page: 1,
    sizePerPage: 4,
    nextPageText: ">",
    prePageText: "<",
    alwaysShowAllBtns: false,
});

const ProductActions = ({ show, handleClose, rows, columns, handleResult }) => {
    let subLang = useSelector((state) => state.lang.ProductActions); // Language here
    const account = useSelector((state) => state.user.account);
    const [selftColumns, setSelfColumns] = useState([...columns]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    if (account.role === roles.FACTORY) {
        subLang = useSelector((state) => state.lang.FactoryActions);
    }
    if (account.role === roles.AGENCY) {
        subLang = useSelector((state) => state.lang.AgencyActions);
    }

    const actionRef = useRef();
    const deleteActionRef = useRef();

    useEffect(() => {
        deleteActionRef.current = (row) => {
            // console.log(rows)
            const indexRow = rows.findIndex((rowF) => {
                return rowF.id == row.id;
            });
            console.log(rows);
            if (indexRow !== -1) {
                // setS
                rows.splice(indexRow, 1);
                forceUpdate();
            }
            // console.log(indexRow)
            // console.log(row)
            // console.log(rowId, name);
            //1 YourCellName
        };
    }, [rows]);

    useEffect(() => {
        const deleteRow = {
            dataField: "remove",
            text: "Delete",
            formatter: (cellContent, row) => {
                return (
                    <button
                        className="btn btn-danger btn-xs"
                        onClick={() => deleteActionRef.current(row)}
                    >
                        X
                    </button>
                );
            },
        };
        setSelfColumns([deleteRow, ...selftColumns]);
    }, []);

    if (account.role === roles.FACTORY) {
        subLang = useSelector((state) => state.lang.FactoryActions);
    }
    if (account.role === roles.AGENCY) {
        subLang = useSelector((state) => state.lang.AgencyActions);
    }

    const handleAction = async () => {
        if (actionRef.current) {
            await actionRef
                .current()
                .then(async ({ updatedIds, message }) => {
                    // console.log(updatedIds, message)
                    await useCallApi(apiUrls.GET_CURRENT_PRODUCTS_BY_QUERY, {
                        associates: {
                            product: {
                                model: { factory: true },
                            },
                            nowAt: true,
                            willAt: true,
                            customer: true,
                        },
                        attributes: {
                            id: {
                                or: updatedIds,
                            },
                        },
                    }).then((data) => {
                        const holdersRequest = data.data.rows;
                        const products = {};
                        for (const holder of holdersRequest) {
                            const { product, nowAt, willAt, customer } = holder;
                            product.holders = { nowAt, willAt, customer };
                            products[product.id] = product;
                        }
                        handleResult && handleResult(products);

                        ToastUtil.success(message, 1000);
                        handleClose && handleClose();
                    });
                })
                .catch((error) => {
                    console.log(error);
                    ToastUtil.error(error, 1000);
                });
        }
    };

    const regisAction = (actionR) => {
        actionRef.current = actionR;
    };

    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{subLang.actions_title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Các sản phẩm đã chọn
                    <div className="table-responsive">
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            hover
                            data={rows}
                            columns={selftColumns}
                            pagination={pagination}
                        />
                    </div>
                    {account.role === roles.FACTORY && (
                        <FactoryActions products={rows} regisAction={regisAction} />
                    )}
                    {account.role === roles.AGENCY && (
                        <AgencyActions products={rows} regisAction={regisAction} />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {subLang.cancel}
                    </Button>
                    <Button variant="primary" onClick={handleAction}>
                        {subLang.submit}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductActions;
