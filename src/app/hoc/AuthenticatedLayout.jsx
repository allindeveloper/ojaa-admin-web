import React from "react";
import { Switch } from "react-router-dom";
import IdleTimer from "react-idle-timer";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import MatxLayout from "app/MatxLayout/MatxLayout";
import Axios from "axios";

class AuthenticatedLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { userobj: {} },
      token: "",
      sending: true,
      page: {},
      showSideBar: false,
      permissions: [],
    };
    this.idleTimer = null;
    this.handleOnAction = this.handleOnAction.bind(this);
    this.handleOnActive = this.handleOnActive.bind(this);
    this.handleOnIdle = this.handleOnIdle.bind(this);
  }

  componentWillMount() {
    // check if the user is authenticated. e.g if the token exist in localStorage or any where else
    // if token doesn't exist, reroute to login
  }
  componentDidMount() {
    // let user = mockUser;
    console.log("calling didmount")
     let tk = localStorage.getItem("jwt_token")
    //  let userDTO = JSON.parse(localStorage.getItem("TRACKITUSER"))
     const AUTH_TOKEN = `${tk}`;
    // the token in LocalStorage was set on Login
     const ServiceBase = this.props.Service(AUTH_TOKEN)
     
     this.setState({ ServiceBase: ServiceBase },()=>{
      this.setState({ sending: false })
     });
     
    // api call would be made to get detailed user information then the user state would be set and cascaded to all wrapper.
  }

  handleOnAction(event) {
    console.log("user did something", event);
  }

  handleOnActive(event) {
    console.log("user is active", event);

    console.log("time remaining", this.idleTimer.getRemainingTime());
  }

  handleOnIdle(event) {
    console.log("idling", this.idleTimer);
    //alert("you're gonna be logged out")
    let timerInterval;
    Swal.fire({
      title: "Session Expired!",
      html: "Locking you out in <b></b> milliseconds.",
      timer: 5000,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      //   onClose: () => {
      //     clearInterval(timerInterval)
      //   }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
        // this.props.onSaveLastUrl(this.props.history.location.pathname);
        this.props.history.push("/");
      }
    });
    console.log("last active", this.idleTimer.getLastActiveTime());
  }

  logout = () => {
    this.setState({ sending: true }, () => {
      setTimeout(() => {
        localStorage.clear();
        this.props.history.push("/");
      }, 1000);
    });
  };

  render() {
    console.log("rendering--auth",this.props)
    const {sending} = this.state;
    return (
       <React.Fragment>
    { (!sending) && <MatxLayout  {...this.props}/>
  }</React.Fragment>
        
       
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
// export { AuthenticatedLayout }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedLayout);
