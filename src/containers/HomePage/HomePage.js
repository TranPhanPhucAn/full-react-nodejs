import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader.js";
class HomePage extends Component {
  render() {
    // const { isLoggedIn } = this.props;
    // let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/login";

    // return <Redirect to={linkToRedirect} />;
    return (
      <div>
        <HomeHeader />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
