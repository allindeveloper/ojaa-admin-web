import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { withStyles } from "@material-ui/core";
import Scrollbar from "react-perfect-scrollbar";
import { isMdScreen, classList } from "utils";
import { renderRoutes } from "react-router-config";
import Layout1Topbar from "./Layout1Topbar";
import Layout1Sidenav from "./Layout1Sidenav";
import Footer from "../SharedCompoents/Footer";
import AppContext from "app/appContext";


const styles = theme => {
  return {
    layout: {
      backgroundColor: theme.palette.background.default
    }
  };
};

class Layout1 extends Component {

  constructor(props){
    super(props);
    this.state={
      sending:true
    }
  }
  componentWillMount() {
    if (isMdScreen()) {
      this.updateSidebarMode({ mode: "close" });
    }
  }


  componentDidMount() {
    // let user = mockUser;
    // console.log("calling didmount")
    // let tkEncrypt = JSON.parse(localStorage.getItem("OJAA_"))
    // let userEncrypt = JSON.parse(localStorage.getItem("OJAA_USER"));
    // //  let userDTO = JSON.parse(localStorage.getItem("TRACKITUSER"))
    // console.log("tkEncrypt", tkEncrypt)
    //  const AUTH_TOKEN = `Bearer ${tkEncrypt}`;
    // // the token in LocalStorage was set on Login
    //  const ServiceApi = this.props.Service(AUTH_TOKEN)

    //  this.setState({ ServiceBase: ServiceApi },()=>{
    //   this.setState({ sending: false })
    //  });
     
    // api call would be made to get detailed user information then the user state would be set and cascaded to all wrapper.
  }
  componentWillUnmount() {
  }

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;
    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  render() {
    let { settings, classes, theme } = this.props;

    let { layout1Settings } = settings;
    let layoutClasses = {
      [classes.layout]: true,
      [`${settings.activeLayout} sidenav-${layout1Settings.leftSidebar.mode} theme-${theme.palette.type} flex`]: true,
      "topbar-fixed": layout1Settings.topbar.fixed
    };
    const extraProps ={
      ...this.props,
      ...this.state
    }
    return (
      <AppContext.Consumer>
        {({ routes }) => (
          <>
          {/* { (!this.state.sending) && */}
          <div className={classList(layoutClasses)}>
            {layout1Settings.leftSidebar.show && <Layout1Sidenav />}

            <div className="content-wrap position-relative">
              {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                <Layout1Topbar className="elevation-z8"/>
              )}

              {settings.perfectScrollbar && (
                <Scrollbar className="scrollable-content">
                  {layout1Settings.topbar.show &&
                    !layout1Settings.topbar.fixed && <Layout1Topbar style={{height: '80px'}} />}
                  <div className="content">{renderRoutes(routes,extraProps)}</div>
                  <div className="my-auto" />
                  {/* {settings.footer.show && !settings.footer.fixed && <Footer />} */}
                </Scrollbar>
              )}

              {!settings.perfectScrollbar && (
                <div className="scrollable-content">
                  {layout1Settings.topbar.show &&
                    !layout1Settings.topbar.fixed && <Layout1Topbar />}
                  <div className="content">{renderRoutes(routes,extraProps)}</div>
                  <div className="my-auto" />
                  {/* {settings.footer.show && !settings.footer.fixed && <Footer />} */}
                </div>
              )}

              {/* {settings.footer.show && settings.footer.fixed && <Footer />} */}
            </div>
          </div>
  {/* } */}
  </>
        )}
      </AppContext.Consumer>
    );
  }
}

Layout1.propTypes = {
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { setLayoutSettings }
  )(Layout1)
);
