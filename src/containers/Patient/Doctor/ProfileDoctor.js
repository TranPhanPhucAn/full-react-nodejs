import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import localization from "moment/locale/vi";
import { getProfileDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: "",
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      this.setState({
        doctorId: this.props.doctorId,
      });
    }
  }
  rederTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === languages.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === languages.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      // console.log(date);
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };
  render() {
    // console.log("profile:", this.state.doctorId);
    // console.log("profile: ", this.state.dataProfile.Doctor_Infor);

    let { dataProfile } = this.state;
    let { language, dataTime } = this.props;
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === languages.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {this.props.idShowDescriptionDoctor === true ? (
                <>
                  {dataProfile.Markdown && dataProfile.Markdown.description && (
                    <span>{dataProfile.Markdown.description}</span>
                  )}
                </>
              ) : (
                <>{this.rederTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          <FormattedMessage id="patient.booking-modal.price" />:{" "}
          {dataProfile &&
            dataProfile.Doctor_Infor &&
            dataProfile.Doctor_Infor.priceTypeData &&
            language === languages.VI && (
              <NumberFormat
                className="currency"
                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"VND"}
              />
            )}
          {dataProfile &&
            dataProfile.Doctor_Infor &&
            dataProfile.Doctor_Infor.priceTypeData &&
            language === languages.EN && (
              <NumberFormat
                className="currency"
                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
              />
            )}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
