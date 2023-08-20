import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MedicalFacilityImg from "../../../assets/medical-facility/benh-vien-cho-ray.jpg";
// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }
class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medial-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="img-customize">
                <img src={MedicalFacilityImg} />
                <div>Bệnh viện chợ rẫy 1</div>
              </div>
              <div className="img-customize">
                <img src={MedicalFacilityImg} />
                <div>Bệnh viện chợ rẫy 2</div>
              </div>
              <div className="img-customize">
                <img src={MedicalFacilityImg} />
                <div>Bệnh viện chợ rẫy 3</div>
              </div>
              <div className="img-customize">
                <img src={MedicalFacilityImg} />
                <div>Bệnh viện chợ rẫy 4</div>
              </div>
              <div className="img-customize">
                <img src={MedicalFacilityImg} />
                <div>Bệnh viện chợ rẫy 5</div>
              </div>
              <div className="img-customize">
                <img src={MedicalFacilityImg} />
                <div>Bệnh viện chợ rẫy 6</div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
