import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
import firebaseAuthService from "../services/firebase/firebaseAuthService";
// import history from "history.js";
import {createBrowserHistory} from 'history'
import { withRouter } from "react-router-dom";

class Auth extends Component {
  state = {};
  
  constructor(props) {
    super(props);

    // Set user if exists in local storage
    // This is only for demo purpose
    // You should remove this
    this.props.setUserData(localStorageService.getItem("auth_user"));
    
    // Check current token is valid on page load/reload
    // this.checkJwtAuth();

    // this.checkFirebaseAuth();
  }

  componentWillMount(){
    const loc = window.location.pathname
    if( loc !== "/session/signin"){
      this.checkJwtAuth();
    }
  }

  checkJwtAuth = () => {
    // You need to send token to your server to check token is valid
    // modify loginWithToken method in jwtService
    const AUTH_TOKEN = localStorage.getItem("jwt_token")
    const loginService = this.props.Service (AUTH_TOKEN);
    jwtAuthService.loginWithToken(loginService,this.props.history).then(user => {

      // Valid token
      // Set user
      this.props.setUserData(user);

      // You should redirect user to Dashboard here
      // this.props.history.push({
      //   pathname: "/home/dashboard"
      // });
    }).catch(err => {
      // Invalid token
    //  debugger;
      // Ridirect user to sign in page here
      console.log(err);
      this.props.history.push({
        pathname: "/session/signin"
      });
    });
  };

  checkFirebaseAuth = () => {
    firebaseAuthService.checkAuthStatus(user => {
      if (user) {
        console.log(user.uid);
        console.log(user.email);
        console.log(user.emailVerified);
      } else {
        console.log("not logged in");
      }
    });
  };

  render() {
    const { children } = this.props;
    console.log("auth props",this.props)
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login
});

export default connect(
  mapStateToProps,
  { setUserData }
)(withRouter(Auth));
