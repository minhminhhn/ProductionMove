import React from "react";
import { Navigate, Route, Switch, useHistory, NavLink } from "react-router-dom";
import ToastUtil from "../../untils/toastUtil";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { paths } from "../../untils/constant";
import SystemNagivator from "./SystemNavigator";
import SystemTopBar from "../sub_components/SystemTopBar";
import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";
import AccountInfo from "../containers/AccountInfo";
import SystemHome from "../containers/SystemHome";
import ModelDisplay from "../display/ModelDisplay";
import AdminAccounts from "../containers/AdminAccounts";
import AdminModels from "../containers/AdminModels";
import AdminProducts from "../containers/AdminProducts";
import AdminCustomers from "../containers/AdminCustomers";
import FactoryModels from "../containers/FactoryModels";
import FactoryProducts from "../containers/FactoryProducts";
import AgencyModels from "../containers/AgencyModels";
import AgencyProducts from "../containers/AgencyProducts";
import AgencyCustomers from "../containers/AgencyCustomers";
import MaintenanceModels from "../containers/MaintenanceModels";
import MaintenanceProducts from "../containers/MaintenanceProducts";

const System = (probs) => {
  return (
    <div id="page-top">
      <div id="wrapper">
        {/* Nagivator here */}
        <SystemNagivator />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/* TopBar here */}
            <SystemTopBar />
            {/* Redirect depend on path */}
            <Switch>
              <Route exact path={paths.SYSTEM} component={SystemHome} />
              <Route path={paths.ACCOUNT} component={AccountInfo} />
              <Route path={paths.ADMIN_ACCOUNTS} component={AdminAccounts} />
              <Route path={paths.ADMIN_PRODUCTS} component={AdminProducts} />
              <Route path={paths.ADMIN_MODELS} >
                <Route path={paths.ADMIN_MODELS_SHOW_ONE} component={ModelDisplay} />
                <Route exact path={paths.ADMIN_MODELS} component={AdminModels} />
              </Route>
              <Route path={paths.ADMIN_CUSTOMERS} component={AdminCustomers} />
              <Route path={paths.FACTORY_MODELS} component={FactoryModels} />
              <Route path={paths.FACTORY_PRODUCTS} component={FactoryProducts} />
              <Route path={paths.AGENCY_MODELS} component={AgencyModels} />
              <Route path={paths.AGENCY_PRODUCTS} component={AgencyProducts} />
              <Route path={paths.AGENCY_CUSTOMERS} component={AgencyCustomers} />
              <Route path={paths.MAINTENANCE_MODELS} component={MaintenanceModels} />
              <Route path={paths.MAINTENANCE_PRODUCTS} component={MaintenanceProducts} />
            </Switch>
          </div>
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; BigCorp 2023 - Design by UET Team </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default System;
