import React, { useEffect, useRef } from "react";
import "../../styles/Modal.scss"


const Modal = ({ children, handleClose, shower }) => {
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { handleClose });
        }
        return child;
    });

    const contentRef = useRef()

    return (
        <>
            <div className="custom-modal-container">
                <div className={`modal-content ${shower ? 'modal-show' : 'modal-hide'}`}>
                    {
                        childrenWithProps
                    }
                </div>
            </div>
        </>
    )
}

Modal.Header = ({ title, handleClose, closeText = 'x' }) => {
    return (
        <div className="modal-header">
            <div className="modal-title">{title}</div>
            <button className="modal-close" onClick={handleClose}>{closeText}</button>
        </div>
    )
}

Modal.Body = (probs) => {
    return (
        <div className="modal-body">
            {
                probs.children
            }
        </div>
    )
}

Modal.Footer = (probs) => {
    return (
        <div className="modal-footer">
            {
                probs.children
            }
        </div>
    )
}


Modal.Background = (probs) => {
    return (
        <div id='Modal-Background' className="hide"></div>
    )
}

export default Modal
