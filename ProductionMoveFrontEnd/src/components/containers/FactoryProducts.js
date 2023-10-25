import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";
import "../../vendor/datatables/dataTables.bootstrap4.min.css";
import { Redirect } from "react-router";
import { paths } from "../../untils/constant";
import useCallApi from "../../untils/fetch";
import { apiUrls, roles } from '../../untils/constant'
import TableBase from "../sub_components/Table"
import FactoryImportProducts from "../sub_components/FactoryImportProducts";
import ProductDisplay from "../display/ProductDisplay";
import ProductActions from "../action_component/ProductActions";

const FactoryProducts = () => {
    const subLang = useSelector(state => state.lang.FactoryProducts)
    const account = useSelector(state => state.user.account)
    const [listProducts, setListProducts] = useState({})
    const [productsLoading, setProductLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [arrayProducts, setArrayProducts] = useState([])
    const [showModalImport, setShowModalImport] = useState(false)
    const [showModalExport, setShowModalExport] = useState(false)
    const [showProductDetail, setShowProductDetail] = useState(false)
    const [showProductActions, setShowProductActions] = useState(false)
    const [choosedRow, setChoosedRow] = useState({})
    const [choosedRows, setChoosedRows] = useState([])

    const indexMessage = useSelector(state => state.message.index)

    // *** prevent another role from accessing to link which just only for admin ***
    if (account?.role !== roles.FACTORY) {
        return (
            <Redirect to={paths.SYSTEM} />
        )
    }

    // *** API load data ***
    useEffect(async () => {
        setErrorMessage('')
        setProductLoading(true)
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
                }
            }
        ).then((data) => {
            setProductLoading(false)
            const holdersRequest = data.data.rows
            const products = {}
            for (const holder of holdersRequest) {
                const { product, nowAt, willAt, customer } = holder
                product.holders = { nowAt, willAt, customer }
                products[product.id] = product
            }
            setListProducts({
                ...listProducts,
                ...products
            })
        }).catch((error) => {
            setErrorMessage('Some error occur, please try again!')
        })
    }, [indexMessage])

    // *** update table of list products when numOfProducts or language is changed ***
    useEffect(() => {
        const transProducts = []
        Object.values(listProducts).forEach((product) => {
            const productCopy = { ...product }
            productCopy.model = `${product?.model?.name} - ${product?.model?.signName}`
            productCopy.factory = product?.model?.factory?.name
            const holders = product.holders
            productCopy.location = (() => {
                const roles = {
                    2: subLang.factory,
                    3: subLang.agency,
                    4: subLang.maintain_center
                }
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
            transProducts.sort((p1, p2) => Date.parse(p2.birth) - Date.parse(p1.birth))
            transProducts.push(productCopy)
        })
        setArrayProducts(transProducts)
    }, [subLang, listProducts])

    const tableColumns = [
        { dataField: 'id', text: 'Id' },
        { dataField: 'model', text: subLang.model },
        { dataField: 'factory', text: subLang.produced_factory },
        { dataField: 'birth', text: subLang.birth },
        // { dataField: 'state', text: subLang.state },
        { dataField: 'location', text: subLang.location }
    ]

    // *** update new account -> to table of accounts list -> when add new account ***
    const handleResult = (listNewProducts) => {
        // const listCopy = { ...listProducts }
        // listNewProducts.forEach(product => {
        //     listCopy[product.id] = product
        // })
        setListProducts({ ...listProducts, ...listNewProducts })
    }

    const handleCloseModal = (e) => {
        setShowModalImport(false)
        setShowModalExport(false)
    }

    const handleOpenModalImport = () => {
        setShowModalImport(true)
    }
    const handleOpenModalExport = (rows) => {
        setChoosedRows(rows)
        // setShowModalExport(true)
    }

    const closeModalProductDetail = () => {
        setShowProductDetail(false)
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setShowProductDetail(true)
            setChoosedRow(row)
        }
    };

    const clickAtions = (rows) => {
        setChoosedRows(rows)
        setShowProductActions(true)
    }

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">{subLang.manage_products}</h1>
            </div>

            {/* Button Import Products Data */}
            <button className="btn btn-primary" onClick={() => handleOpenModalImport()}>{subLang.import_products_btn}</button>
            {/* Popup Form **************************************************************** */}
            {
                <FactoryImportProducts
                    handleResult={handleResult}
                    handleClose={handleCloseModal}
                    show={showModalImport}
                />
            }
            {/* Button Export Products Data */}
            {/* <button className="btn btn-primary" onClick={() => handleOpenModalExport()}>{subLang.export_products_btn}</button> */}
            {/* Popup Form **************************************************************** */}
            {/* {
                <FactoryExportProducts
                handleResult={handleResult}
                handleClose={handleCloseModal}
                show={showModalExport}
                />
            } */}

            <ProductActions
                show={showProductActions}
                rows={choosedRows}
                columns={tableColumns}
                handleResult={handleResult}
                handleClose={() => setShowProductActions(false)}
            />
            <ProductDisplay
                show={showProductDetail}
                row={choosedRow}
                handleClose={closeModalProductDetail}
            />
            <TableBase
                title={subLang.sumary_re(arrayProducts.length)}
                data={arrayProducts}
                columns={tableColumns}
                isLoading={productsLoading}
                getBtn={undefined}
                rowEvents={rowEvents}
                clickActions={clickAtions}
                handleOpenModalExport = {handleOpenModalExport}
                choosed={true}
            />
        </div>
    )
}

export default FactoryProducts