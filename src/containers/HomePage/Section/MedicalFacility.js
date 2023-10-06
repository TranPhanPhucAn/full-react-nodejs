import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import MedicalFacilityImg from "../../../assets/medical-facility/benh-vien-cho-ray.jpg";
import { getAllClinic } from "../../../services/userService";
import _ from "lodash";
import { withRouter } from "react-router";
import "./MedicalFacility.scss";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    // console.log("res: ", res.data);
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : "",
      });
    }
  }
  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };
  render() {
    let { dataClinic } = this.state;
    // console.log("state clinic:", dataClinic);
    return (
      <div className="section-share section-medial-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinic &&
                dataClinic.length > 0 &&
                dataClinic.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div
                      className="img-customize clinic-child"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className="bg-image section-medical-facility"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <div className="clinic-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
