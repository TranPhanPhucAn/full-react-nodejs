import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    if (this.props.user) {
      await this.getDataPatient();
    }
  }
  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };
  sendRemedy = async (dataChildFromModal) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      ...dataChildFromModal,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,
      language: this.props.language,
    });
    this.setState({
      isShowLoading: false,
    });
    if (res && res.errCode === 0) {
      toast.success("Send remedy succeed!");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      toast.error("Something wrongs ...");
    }
  };
  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-4 form group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Actions</th>
                    </tr>
                    {dataPatient &&
                      dataPatient.length > 0 &&
                      dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {language === languages.VI
                                ? item.timeTypeDataPatient.valueVi
                                : item.timeTypeDataPatient.valueEn}
                            </td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>
                              {language === languages.VI
                                ? item.patientData.genderData.valueVi
                                : item.patientData.genderData.valueEn}
                            </td>
                            <td>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác nhận
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
