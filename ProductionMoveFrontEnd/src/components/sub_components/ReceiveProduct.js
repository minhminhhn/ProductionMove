import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../untils/constant";
import useCallApi from "../../untils/fetch";
import { apiUrls } from "../../untils/constant";
import { Redirect, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import BootstrapTable from "react-bootstrap-table-next";

const ReceiveProduct = ({ show, handleClose, data, columns }) => {
  const subLang = useSelector((state) => state.lang.ModelDisplay); // Language here

    const onClickSubmit= () => {
        handleClose && handleClose()
    }
  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Receive product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <BootstrapTable
                            keyField="id"
                            hover
                            data = {data}
                            columns = {columns}
                        /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onClickSubmit}>
            {'OK'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReceiveProduct;
