import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

// import { KeyCodeUtils, LanguageUtils } from "../utils";

import "./Login.scss";
// import { FormattedMessage } from "react-intl";

// import adminService from "../services/adminService";
// import { divide } from "lodash";
import handleLoginApi from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
  }
  state = {
    username: "",
    password: "",
    isShowPassword: false,
  };
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    console.log("check>>", this.state.username);
    console.log("check pass>>", this.state.password);
    await handleLoginApi(this.state.username, this.state.password);
  };
  handleisShowPasswordHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-center text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your user name"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password</label>
              <div className="custom-input-password">
                <input
                  type={
                    this.state.isShowPassword === false ? "password" : "text"
                  }
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                />
                <span onClick={() => this.handleisShowPasswordHidePassword()}>
                  {this.state.isShowPassword === false ? (
                    <i class="fas fa-eye-slash"></i>
                  ) : (
                    <i class="far fa-eye "></i>
                  )}
                </span>
              </div>
            </div>

            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span>Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or login with</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              {/* <i className="fab fa-facebook facebook"></i> */}
              <i class="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
