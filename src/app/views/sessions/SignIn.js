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
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
import clsx from "clsx";

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
    email: "watson@example.com",
    password: "testpass",
    agreement: "",
  };
  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFormSubmit = (event) => {
    this.props.loginWithEmailAndPassword({ ...this.state });
  };
  render() {
    let { email, password } = this.state;
    let { classes } = this.props;
    return (
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
                        "this field is required",
                        "email is not valid",
                      ]}
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
                      errorMessages={["this field is required"]}
                    />

                    <div className="flex flex-middle mb-8">
                      <Grid container justify="center">
                        <Button
                          className="text-primary"
                          onClick={() =>
                            this.props.history.push("/session/forgot-password")
                          }
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
                          disabled={this.props.login.loading}
                          type="submit"
                          disableRipple
                        >
                          Login
                        </Button>
                      </Grid>

                      {this.props.login.loading && (
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
    );
  }
}

const mapStateToProps = (state) => ({
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login,
});
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn))
);
