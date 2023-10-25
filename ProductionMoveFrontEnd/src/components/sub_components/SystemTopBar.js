import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";
import { useHistory } from "react-router-dom";

import { paths } from "../../untils/constant";
import { userLogout } from "../../store/slices/userSlices";
import Message from "../containers/Message";

const SystemTopBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const subLang = useSelector((state) => state.lang.SystemTopBar);
  const onClickLogout = () => {
    history.push(paths.HOME);
    dispatch(userLogout());
  };
  const onClickAccount = () => {
    history.push(paths.ACCOUNT);
  };
  const account = useSelector((state) => state.user.account);

  const onClickToggle = () => {
    console.log(document.getElementById('accordionSidebar').getAttribute('class'))
    let x = document.getElementById('accordionSidebar').getAttribute('class')
    let check = x.indexOf('toggled');
    if (check != -1) {
      let y = x.substring(0, check - 1)
      document.getElementById('accordionSidebar').setAttribute('class', y)
    } else {
      let y = x + " toggled"
      document.getElementById('accordionSidebar').setAttribute('class', y)
    }

    let bx = document.body.getAttribute('class')
    if (bx) {
      document.body.removeAttribute('class')
    } else {
      bx = "sidebar-toggled"
      document.body.setAttribute('class', bx)
    }

  }
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        onClick={onClickToggle}
      >
        <i className="fa fa-bars"></i>
      </button>

      <ul className="navbar-nav ml-auto">
        <Message />

        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {account.name}
            </span>
            <img
              className="img-profile rounded-circle"
              src="./undraw_profile.svg"
            />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              onClick={() => {
                onClickAccount();
              }}
            >
              <i className="fas fa-user-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              {subLang.account}
            </a>

            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              onClick={() => {
                onClickLogout();
              }}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              {subLang.logout}
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SystemTopBar;
