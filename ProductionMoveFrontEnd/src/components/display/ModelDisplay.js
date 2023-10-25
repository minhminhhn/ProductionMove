import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../untils/constant";
import useCallApi from "../../untils/fetch";
import { apiUrls } from '../../untils/constant'
import { Redirect, useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModelDisplay = ({ show, handleClose, row }) => {
    const subLang = useSelector(state => state.lang.ModelDisplay)
    const [loadingModel, setLoadingModel] = useState(false)
    const [model, setModel] = useState({
        id: 999999,
        name: 'Unknown',
        signName: 'Unknown',
        generation: 'Unknown',
        factory: 'Unknown',
        producedFactory: 'Unknown',
        birth: 'Unknown',
        series: 'Unknown',
        trim: 'Unknown',
        length: 'Unknown',
        width: 'Unknown',
        height: 'Unknown',
        bodyType: 'Unknown',
        engineType: 'Unknown',
        maxSpeed: 'Unknown',
        accceleration: 'Unknown',
        cityFuel: 'Unknown',
    })


    useEffect(async () => {

        if (row) {
            setLoadingModel(true)
            await useCallApi(
                apiUrls.GET_MODELS_BY_IDS,
                {
                    listId: [row.id]
                }
            ).then((response) => {
                const { data } = response
                if (data.length === 1) {
                    const model = data[0]
                    model.producedFactory = model?.factory?.name
                    setModel(model)
                }
            }).catch((error) => {
                console.log(error)
            })
            setLoadingModel(false)
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
                    <Modal.Title>{subLang.model_details}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        loadingModel && <div>Loading...</div>
                    }
                    <ul>
                        <li>Id : {model.id}</li>
                        <li>{subLang.name}: {model.name}</li>
                        <li>{subLang.sign_name}: {model.signName}</li>
                        <li>{subLang.generation}: {model.generation}</li>
                        <li>{subLang.produced_factory}: {model.producedFactory}</li>
                        <li>{subLang.birth}: {model.birth}</li>
                        <li>{subLang.series}: {model.series}</li>
                        <li>{subLang.trim}: {model.trim}</li>
                        <li>{subLang.length}: {model.length}</li>
                        <li>{subLang.width}: {model.width}</li>
                        <li>{subLang.height}: {model.height}</li>
                        <li>{subLang.body_type}: {model.bodyType}</li>
                        <li>{subLang.max_speed}: {model.maxSpeed}</li>
                        <li>{subLang.acceleration}: {model.accceleration}</li>
                        <li>{subLang.city_fuel}: {model.cityFuel}</li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModelDisplay




