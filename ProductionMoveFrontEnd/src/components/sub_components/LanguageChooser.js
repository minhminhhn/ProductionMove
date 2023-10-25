import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";
import '../../styles/LanguageChooser.scss'
import { switchLanguage } from "../../store/slices/languageSlice";


const LanguageChooser = () => {
    const subLang = useSelector(state => state.lang.LanguageChooser)
    const englishRef = useRef()
    const vietnameseRef = useRef()
    const dispatch = useDispatch()
    const onClickLanguage = (e) => {
        if (
            e.target === vietnameseRef.current && subLang._NAME_ != 'VI' ||
            e.target == englishRef.current && subLang._NAME_ != 'EN'
        ) {
            dispatch(switchLanguage())
        }
    }
    return (
        <li className="nav-item">
            <a
                className="nav-link pointer"
                data-toggle="collapse"
                data-target="#collapseLanguage"
                aria-expanded="true"
                aria-controls="collapseLanguage"
            >
                <i className="fas fa-fw fa-language"></i>
                <span>{subLang.language}</span>
            </a>
            <div
                id="collapseLanguage"
                className="collapse"
                aria-labelledby="headingLanguage"
                data-parent="#accordionSidebar"
            >
                <div className="bg-white py-2 collapse-inner rounded">
                    {/* <h6 className="collapse-header">Custom Utilities:</h6> */}
                    <a
                        className={`collapse-item language-area ${subLang._NAME_ === 'VI' ? "language-active" : ""}`}
                        onClick={(e) => onClickLanguage(e)}
                        ref={vietnameseRef}
                    >
                        {subLang.vietnamese}
                    </a>
                    <a
                        className={`collapse-item language-area ${subLang._NAME_ === 'EN' ? "language-active" : ""}`}
                        onClick={(e) => onClickLanguage(e)}
                        ref={englishRef}
                    >
                        {subLang.english}
                    </a>
                </div>
            </div>
        </li>
    )
}

export default LanguageChooser