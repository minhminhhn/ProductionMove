import React from "react";
import { FaBell } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { TbNotification } from "react-icons/tb";

import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";
import { useHistory, withRouter } from "react-router";
import { paths } from "../../untils/constant";
import { useSelector } from "react-redux";

const Message = () => {
  const messages = useSelector((state) => state.message);
  const subLang = useSelector((state) => state.lang.Message);
  const account = useSelector((state) => state.user.account);

  const history = useHistory();
  const onClickProducts = () => {
    switch (account.role) {
      case 1:
        return history.push(paths.ADMIN_PRODUCTS);
      case 2:
        return history.push(paths.FACTORY_PRODUCTS);
      case 3:
        return history.push(paths.AGENCY_PRODUCTS);
      case 4:
        return history.push(paths.MAINTENANCE_PRODUCTS);
      default:
        return "#";
    }
  }

  const getRole = (roleId) => {
    switch (roleId) {
      case 1:
        return subLang.admin;
      case 2:
        return subLang.factory;
      case 3:
        return subLang.agency;
      case 4:
        return subLang.maintain_center;
      default:
        return subLang.unknown;
    }
  };
  const typeMessage = (message) => {
    if (message.content.type == "EXPORT_CONFIRM_NOTIFICATION") {
      return subLang.export_confirm(message.content.exports.length)
    }
    if (message.content.type == "EXPORT_NOTIFICATION") {
      return subLang.export(message.content.exports.length)

    }
  };

  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="alertsDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-fw fa-bell"></i>
        <span className="badge badge-danger badge-counter">
          {messages ? messages.list.length : ""}
        </span>
      </a>
      <div
        className=" dropdown-list dropdown-menu dropdown-menu-right shadow force-scroll"
        aria-labelledby="alertsDropdown"
        role="menu"
        style={{ height: "350px" }}
      >
        <h6 className="dropdown-header">{subLang.alerts}</h6>
        {messages.list.map((message) => {
          return (
            <div key={message.id}>
              <div
                className="dropdown-item d-flex align-items-center "
                style={{ cursor: "pointer" }}
              >
                <div>
                  <div className="small text-gray-500">
                    {message.date.substring(0, 10)}
                  </div>
                  <span className="font-weight-bold">
                    {`${getRole(message.content.from.role)}
                    ${message.content.from.name} ${typeMessage(message)}`}

                    <a href="#" onClick={() => {
                      onClickProducts()
                    }}>
                      {subLang.details}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <button className="dropdown-item text-center small text-gray-500">
          {subLang.show_all_alerts}
        </button>
      </div>
    </li>
  );
};

export default Message;
