import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader.js";
import Specialty from "./Section/Specialty.js";
import MedicalFacility from "./Section/MedicalFacility.js";
import OutStandingDoctor from "./Section/OutStandingDoctor.js";
import HandBook from "./Section/HandBook.js";
import About from "./Section/About.js";
import HomeFooter from "./HomeFooter.js";
import "./HomePage.scss";

class HomePage extends Component {
  render() {
    // const { isLoggedIn } = this.props;
    // let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/login";

    // return <Redirect to={linkToRedirect} />;
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <About />
        <HomeFooter />
        {/* <div style={{ height: "300px" }}></div> */}
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
