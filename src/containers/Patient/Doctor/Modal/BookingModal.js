import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { languages } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import Select from "react-select";
import * as actions from "../../../../store/actions";
import DatePicker from "../../../../components/Input/DatePicker";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: "",
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      gender: "",
      timeType: "",
      listGenders: [],
    };
  }
  async componentDidMount() {
    this.props.fetchGenderStart();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.genders !== prevProps.genders) {
      let listGenders = this.buildDataSelect(this.props.genders);
      this.setState({
        listGenders: listGenders,
      });
    }
    if (this.props.language !== prevProps.language) {
      this.setState({
        listGenders: this.buildDataSelect(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        this.setState({
          doctorId: this.props.dataTime.doctorId,
          timeType: this.props.dataTime.timeType,
        });
      }
    }
  }
  buildDataSelect = (data) => {
    let { language } = this.props;
    let result = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        object.value = item.keyMap;
        object.label = language === languages.VI ? item.valueVi : item.valueEn;
        result.push(object);
      });
      return result;
    }
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleChangeSelect = (selectedOption, name) => {
    let copyState = { ...this.state };
    let stateName = name.name;
    copyState[stateName] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorNameBooking(this.props.dataTime);
    let res = await postPatientBookAppointment({
      doctorId: this.state.doctorId,
      fullName: this.state.name,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      gender: this.state.gender.value,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed!");
      this.props.closeBookingModal();
    } else {
      toast.error("Booking a new appointment failed");
    }
  };
  buildTimeBooking = (dataTime) => {
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
      return `${time} - ${date}`;
    }
    return "";
  };
  buildDoctorNameBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === languages.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };
  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) doctorId = dataTime.doctorId;
    let { language } = this.props;
    let {
      name,
      phoneNumber,
      email,
      address,
      reason,
      birthday,
      gender,
      listGenders,
    } = this.state;
    // console.log("option: ", this.state);

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span className="right">
              <i class="fas fa-times" onClick={closeBookingModal}></i>
            </span>
          </div>
          <div className="booking-modal-body">
            {/* { JSON.stringify(dataTime) } */}
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
                isShowPrice={true}
              />
            </div>
            {/* <div className="price">Giá khám</div> */}
            <div className="row">
              <div className="col-6 form group">
                <label>
                  <FormattedMessage id="patient.booking-modal.fullName" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => this.handleOnChangeInput(event, "name")}
                  value={name}
                />
              </div>
              <div className="col-6 form group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phoneNumber")
                  }
                  value={phoneNumber}
                />
              </div>
              <div className="col-6 form group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                  value={email}
                />
              </div>
              <div className="col-6 form group">
                <label>
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                  value={address}
                />
              </div>
              <div className="col-12 form group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "reason")
                  }
                  value={reason}
                />
              </div>
              <div className="col-6 form group">
                <label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={birthday}
                />
              </div>
              <div className="col-6 form group">
                <label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select
                  name="gender"
                  value={gender}
                  onChange={this.handleChangeSelect}
                  options={listGenders}
                  // placeholder={
                  //   <FormattedMessage id="admin.manage-doctor.price" />
                  // }
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking-modal.btnConfirm" />
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              <FormattedMessage id="patient.booking-modal.btnCancel" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
