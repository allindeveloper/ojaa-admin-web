import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import clsx from "clsx";
import { toast } from "react-toastify";
import jwtAuthService from "app/services/jwtAuthService";
import { setUserData } from "../../redux/actions/UserActions";

const styles = (theme) => ({
  wrapper: {
    position: "relative",
  },
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#B45303",
    },
    // "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "red" //hover
    // },
    // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "purple" //focused
    // }
  },
  loginButton: {
    backgroundColor: "#B45303",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: 10,
    marginLeft: -12,
  },
});

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    agreement: "",
    loading: false
  };
  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFormSubmit = (event) => {
    const loginService = this.props.Service (null,null);
    this.setState({loading:true});
    const {LOGIN} = this.props.Constants;
    const payload ={
      user : this.state.email,
      password: this.state.password
    }
    loginService.userLogin(payload,LOGIN)
      .then((response)=>{
        if(response.data.status === "ok"){
        const user = {
          token:response.data.token,
          ...response.data.user
        }
        console.log("user after login", user)
        localStorage.setItem("OJAA_", JSON.stringify(user.token));
        localStorage.setItem("OJAA_USER", JSON.stringify(user));
        jwtAuthService.setAuth(user.token);
        this.props.setUserData(user);
        toast.success( `Welcome ${user.firstName}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose:5000
        });
        this.props.history.push("/home/dashboard");
        
        
      }
      })
      .catch((err)=>{
        if(err){
        this.setState({loading:false})
        if(err.response === undefined){
          this.setState({loading:false})
          toast.error( "Check your network or try again", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose:5000
          });
          return;
        }
        if(err.response.data){
          this.setState({loading:false})
          const {error} = err.response.data;
          toast.error( error, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose:5000
          });
          return
        }
        }
        
       
      })
  };
  render() {
    let { email, password , loading} = this.state;
    let { classes } = this.props;
    return (
      <section className="sessionSignin" style={{
        backgroundImage: `url(${"/assets/images/ojaaCart.png"})`,
        height: "100%",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain"
      }}>
        <div style={{background: "white",opacity: 0.6}}>
      <div className="signup flex flex-center w-100 h-100vh">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container spacing={1}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="flex flex-middle mb-8">
                  <Grid container justify="center">
                    <PersonIcon style={{ fontSize: 100, color: "grey" }} />
                  </Grid>
                </div>
                <div className="flex flex-middle mb-8">
                  <Grid container justify="center">
                    <label style={{color:"#B45303"}}>Administrator/Staff Login</label>
                  </Grid>
                </div>
                <div className="p-36 h-100 position-relative">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className={classes.root.concat(" mb-24 w-100")}
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      fullWidth={true}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "Email is required",
                        "email is not valid",
                      ]}
                      autoComplete={"false"}
                    />
                    <TextValidator
                      className={classes.root.concat(" mb-16 w-100")}
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      fullWidth={true}
                      validators={["required"]}
                      errorMessages={["Password is required"]}
                    />

                    <div className="flex flex-middle mb-8">
                      <Grid container justify="center">
                        <Button
                          className="text-primary"
                          // onClick={() =>
                          //   this.props.history.push("/session/forgot-password")
                          // }
                        >
                          Forgot password?
                        </Button>
                      </Grid>
                    </div>
                    <div className="flex flex-middle mb-8">
                      <Grid container justify="center">
                        <Button
                          variant="contained"
                          className={clsx(classes.loginButton)}
                          disabled={this.state.loading}
                          type="submit"
                          disableRipple
                          style={{width:150}}
                        >
                          Login
                        </Button>
                      </Grid>

                      {this.state.loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
      </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login,
});
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps,   { setUserData })(SignIn))
);
