import "babel-polyfill";
// import cssVars from "css-vars-ponyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./_index.scss";
import "../src/styles//_app.scss";
import { Router } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
// import App from "./app/App";
import { Provider } from "react-redux";
import MatxTheme from "app/MatxLayout/MatxTheme/MatxTheme";
import AppContext from "app/appContext";
import Layout from "app/hoc/Layout";
import { Service } from "../src/Services";
import * as Constants  from "../src/Constants";
import Axios from "axios";
import Auth from "app/auth/Auth";
import { Store } from "app/redux/Store";
import routes from "./app/RootRoutes";
import history from "app/history";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import MatxLayout from "app/MatxLayout/MatxLayout";
import AuthGuard from "app/auth/AuthGuard";

// cssVars();

const instance = Axios.create({
    baseURL: '',
    headers: {}
});


instance.get('/config.json').then(res => {
    if (res.data && res.data.baseURL) {
        const config = res.data;

        sessionStorage.setItem('ApiBaseUrl', config.baseURL);

        ReactDOM.render(
            <AppContext.Provider value={{ routes }}>
            <Provider store={Store}>
              <MatxTheme>
                <Auth Service={Service.bind(null, config.baseURL, Axios)}>
                  <Router history={history}>
                    {/* <AuthGuard> */}
                    {/* <Layout 
                    
                    /> */}
                      <MatxLayout 
                    Constants={Constants}
                    Service={Service.bind(null, config.baseURL, Axios)} 
                    />
                    {/* </AuthGuard> */}
                    <ToastContainer />
                  </Router>
                </Auth>
              </MatxTheme>
            </Provider>
          </AppContext.Provider>
            , document.getElementById('root'));

        serviceWorker.unregister();
    } else {
        console.log('Error:', 'base API URL is missing..');

    }

})
    .catch(err => {

    })
