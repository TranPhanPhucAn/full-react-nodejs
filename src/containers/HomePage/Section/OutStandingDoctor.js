import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctorImg from "../../../assets/outstanding-doctor/anh-dai-dien-bs.jpg";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router";
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
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorArr: [],
    };
  }
  async componentDidMount() {
    await this.props.loadTopDoctor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
      this.setState(
        {
          doctorArr: this.props.doctorsRedux,
        }
        // () => {
        //   console.log("doctor: ", this.state.doctorArr);
        // }
      );
    }
  }
  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let doctors = this.state.doctorArr;
    // console.log("doctorArr: ", doctors[0]);
    // if (doctors && doctors.length > 0 && doctors[0]) {
    //   console.log("fdsafd", doctors[0].positionData.valueVi);
    // }
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {doctors &&
                doctors.length > 0 &&
                doctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="img-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                          {/* <img src={OutStandingDoctorImg} /> */}
                        </div>
                        <div className="position text-center">
                          {/* <div>Giáo sư, tiến sĩ BAC</div> */}
                          <div>
                            {this.props.language === languages.VI
                              ? nameVi
                              : nameEn}
                          </div>
                          <div>Cơ xương khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* <div className="img-customize ">
                <div className="customize-border">
                  <div className="outer-bg">
                    <img src={OutStandingDoctorImg} />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ BAC</div>
                    <div>
                      {doctors &&
                      doctors.length > 0 &&
                      this.props.language === languages.VI
                        ? doctors[0].positionData.valueVi
                        : doctors[0].positionData.valueEn}
                    </div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <img src={OutStandingDoctorImg} />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ BAC</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <img src={OutStandingDoctorImg} />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ BAC</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <img src={OutStandingDoctorImg} />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ BAC</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <img src={OutStandingDoctorImg} />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ BAC</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <img src={OutStandingDoctorImg} />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ BAC</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div> */}
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
    doctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
