import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../components/containers/Login';
import Home from '../components/containers/Home';
import '../styles/App.scss';
import { paths } from '../untils/constant';
import { userIsAuthenticated, userIsNotAuthenticated } from '../components/hoc/authentication'
import System from '../components/routes/System';
import { updateToken } from './../untils/authenticate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TestApi from '../components/until_components/TestApi';
import SocketConnector from '../components/until_components/SocketConnector';
import MessageLoader from '../components/until_components/MessageLoader';
import DeviceUpdater from '../components/until_components/DeviceUpdater';
import Modal from '../components/until_components/Modal'
import ResourceLoader from '../components/until_components/ResourceLoader';

const App = () => {
  useEffect(async () => {
    const token = await updateToken()
  }, [])


  return (
    <Fragment>
      {/* Here some until Component for system */}
      {/* <TestApi /> */}
      <SocketConnector />
      <MessageLoader />
      <DeviceUpdater />
      <ResourceLoader />
      <Modal.Background />
      {/*  */}
      <BrowserRouter>
        <Switch>
          <Route exact path={paths.HOME} component={Home} />
          <Route path={paths.LOGIN} component={userIsNotAuthenticated(Login)} />
          <Route path={paths.SYSTEM} component={userIsAuthenticated(System)} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
