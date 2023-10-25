import React from 'react';
// import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './app/App';
import './styles/index.css';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
// const root = createRoot(container);

const renderApp = () => {
  ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
    container
    // {/* </React.StrictMode> */ }
  );
}

renderApp()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();