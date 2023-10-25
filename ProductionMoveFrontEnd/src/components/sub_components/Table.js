import React, { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";
import "../../styles/fontAS.css";
import "../../vendor/datatables/dataTables.bootstrap4.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { Button, OverlayTrigger, Tooltip, Collapse } from "react-bootstrap";

const TableBase = ({ isLoading, data, columns, title, rowEvents, clickActions, choosed, keyField }) => {
  const [choose, setChoose] = useState(false)
  const [choosedRows, setChoosedRows] = useState([])
  const [open, setOpen] = useState(false);
  const subLang = useSelector(state => state.lang.Table)
  const pagination = paginationFactory({
    page: 2,
    sizePerPage: 10,
    nextPageText: ">",
    prePageText: "<",
    alwaysShowAllBtns: false,
    // onPageChange: function (page, sizePerPage) {
    //   console.log('page', page);
    //   console.log('sizePerPage', sizePerPage);
    // },
    // onSizePerPageChange: function (page, sizePerPage) {
    //   console.log('page', page);
    //   console.log('sizePerPage', sizePerPage);
    // }
  });

  useEffect(() => {
    if (choosedRows.length === 0) setChoose(false)
    else setChoose(true)
  }, [choosedRows])


  const select = () => {
    console.log(choosedRows)
  }
  const selectRow = {
    mode: 'checkbox',
    // clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        const isNotExist = choosedRows.every(rowc => rowc.id != row.id)
        if (isNotExist) {
          setChoosedRows([...choosedRows, row])
        }
      } else {
        setChoosedRows(choosedRows.filter((rowc) => rowc.id != row.id))
      }

      // Check row already reject choosen in another component
      // const rowCheck = 

    },
    onSelectAll: (isSelect, rows, e) => {
      const uniqueRows = {}
      rows.forEach(row => uniqueRows[row.id] = row)
      if (isSelect) {
        choosedRows.forEach(row => uniqueRows[row.id] = row)
        setChoosedRows(Object.values(uniqueRows))
      } else {
        setChoosedRows(choosedRows.filter(rowc => !uniqueRows[rowc.id]))
      }
    }
  }

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex justify-content-between align-items-center">
        {
          choosed &&
          <OverlayTrigger placement="right" overlay={<Tooltip>{subLang.actions_btnName}</Tooltip>}>
            <Button variant="outline-primary"
              // aria-controls="example-collapse-text"
              // aria-expanded={open}
              onClick={() => {
                clickActions && clickActions(choosedRows)
                // handleOpenModalExport && handleOpenModalExport(choosedRows)
                // setOpen(!open)
              }}
              disabled={choose ? false : true}
            >
              <i className="fa-solid fa-car-side"></i>
            </Button>
          </OverlayTrigger>
        }
        <h6 className="m-0 font-weight-bold text-primary">{title}</h6>

        {/* <Collapse in={open}>

        <div id="example-collapse-text">
          <hr className="sidebar-divider" />
          <Button 
            onClick={() => {
              clickActions && clickActions(choosedRows)
            }}
          >
            Export
          </Button>{' '}
        </div>
      </Collapse> */}
      </div>
      <div className="card-body">
        <div className="table-responsive">
          {isLoading && <div>Loading...</div>}
          {
            choosed ?
              <BootstrapTable
                bootstrap4
                keyField="id"
                hover
                data={data}
                columns={columns}
                pagination={pagination}
                filter={filterFactory()}
                selectRow={selectRow}
                rowEvents={rowEvents}
                classes="table-base"
              /> :
              <BootstrapTable
                bootstrap4
                keyField="id"
                hover
                data={data}
                columns={columns}
                pagination={pagination}
                filter={filterFactory()}
                // selectRow={selectRow}
                rowEvents={rowEvents}
                classes="table-base"
              />
          }
        </div>
      </div>
    </div>
  );
};

export default TableBase;

