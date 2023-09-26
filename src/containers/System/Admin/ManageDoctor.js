import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { languages, CRUD_ACTIONS } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import actionTypes from "../../../store/actions/actionTypes";
import {
  getDetailInforDoctor,
  editDetailDoctorByIdService,
} from "../../../services/userService";
import { toast } from "react-toastify";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      action: CRUD_ACTIONS.CREATE,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllPrice();
    this.props.fetchAllPayment();
    this.props.fetchAllProvince();
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === languages.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  buildDataInput = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      // console.log("hello", inputData);
      inputData.map((item, index) => {
        let object = {};
        object.value = item.keyMap;
        if (item.type === "PRICE") {
          object.label =
            language === languages.VI
              ? `${item.valueVi} VND`
              : `${item.valueEn} USD`;
        } else {
          object.label =
            language === languages.VI ? item.valueVi : item.valueEn;
        }
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      let dataSelectPrice = this.buildDataInput(this.props.allPrice);
      let dataSelectPayment = this.buildDataInput(this.props.allPayment);
      let dataSelectProvince = this.buildDataInput(this.props.allProvince);
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.allPrice !== this.props.allPrice) {
      // console.log("price: ", this.props.allPrice);
      let dataSelectPrice = this.buildDataInput(this.props.allPrice);
      // console.log("price select: ", dataSelectPrice);
      this.setState({
        listPrice: dataSelectPrice,
      });
    }
    if (prevProps.allPayment !== this.props.allPayment) {
      let dataSelectPayment = this.buildDataInput(this.props.allPayment);
      this.setState({
        listPayment: dataSelectPayment,
      });
    }
    if (prevProps.allProvince !== this.props.allProvince) {
      // console.log("pro: ", this.props.allProvince);
      let dataSelectProvince = this.buildDataInput(this.props.allProvince);
      this.setState({
        listProvince: dataSelectProvince,
      });
    }
  }
  // Finish!
  handleEditorChange = ({ html, text }) => {
    // console.log("handleEditorChange", html, text);
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = async () => {
    console.log("doctor: ", this.selectedDoctor);
    if (this.state.action === CRUD_ACTIONS.CREATE) {
      this.props.saveDetailDoctor({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorId: this.state.selectedDoctor.value,
        selectedPrice: this.state.selectedPrice.value,
        selectedPayment: this.state.selectedPayment.value,
        selectedProvince: this.state.selectedProvince.value,
        nameClinic: this.state.nameClinic,
        addressClinic: this.state.addressClinic,
        note: this.state.note,
      });
    } else {
      let response = await editDetailDoctorByIdService({
        id: this.state.selectedDoctor.value,
        description: this.state.description,
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        doctorId: this.state.selectedDoctor.value,
        selectedPrice: this.state.selectedPrice.value,
        selectedPayment: this.state.selectedPayment.value,
        selectedProvince: this.state.selectedProvince.value,
        nameClinic: this.state.nameClinic,
        addressClinic: this.state.addressClinic,
        note: this.state.note,
      });
      // console.log("edit: ", response);
      if (response && response.errCode === 0) {
        toast.success("Edit detail doctor success");
      } else {
        toast.error("Edit detail doctor failed");
      }
    }
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      action: CRUD_ACTIONS.CREATE,
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    });
  };
  handleChange = async (selectedDoctor) => {
    await this.setState(
      { selectedDoctor }
      // , () =>
      // console.log(`Option selected:`, this.state.selectedDoctor)
    );
    let res = await getDetailInforDoctor(selectedDoctor.value);
    let doctor = {};
    let { listPayment, listPrice, listProvince } = this.state;
    if (res && res.errCode === 0) {
      doctor = res.data;
    }
    // console.log("doctor detail: ", doctor);
    if (doctor.Markdown !== null) {
      // console.log("null 12345");
      let addressClinic = "",
        nameClinic = "",
        note = "",
        priceId = "",
        provinceId = "",
        paymentId = "";
      let selectedPrice = "",
        selectedPayment = "",
        selectedProvince = "";
      if (doctor.Doctor_Infor) {
        addressClinic = doctor.Doctor_Infor.addressClinic;
        nameClinic = doctor.Doctor_Infor.nameClinic;
        note = doctor.Doctor_Infor.note;
        paymentId = doctor.Doctor_Infor.paymentId;
        priceId = doctor.Doctor_Infor.priceId;
        provinceId = doctor.Doctor_Infor.provinceId;
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
      }
      this.setState(
        {
          action: CRUD_ACTIONS.EDIT,
          description: doctor.Markdown.description,
          contentMarkdown: doctor.Markdown.contentMarkdown,
          contentHTML: doctor.Markdown.contentHTML,
          addressClinic: addressClinic,
          nameClinic: nameClinic,
          note: note,
          selectedPrice: selectedPrice,
          selectedPayment: selectedPayment,
          selectedProvince: selectedProvince,
        }
        // ,
        // () => {
        //   console.log("state: ", this.state);
        // }
      );
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        action: CRUD_ACTIONS.CREATE,
        addressClinic: "",
        nameClinic: "",
        note: "",
      });
    }
  };
  // handleChangePrice = async (selectedPrice) => {
  //   await this.setState({
  //     selectedPrice,
  //   });
  // };
  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateCopy = { ...this.state };
    let stateName = name.name;
    stateCopy[stateName] = selectedOption;
    console.log("sds:", selectedOption, stateName);

    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeText = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    // console.log("dsfdsa: ", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              // rows="4"
              value={this.state.description}
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              name="selectedPrice"
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              name="selectedPayment"
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              name="selectedProvince"
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            this.state.action === CRUD_ACTIONS.CREATE
              ? "save-content-doctor"
              : "edit-content-doctor"
          }
        >
          {this.state.action === CRUD_ACTIONS.CREATE ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allPrice: state.admin.allPrice,
    allPayment: state.admin.allPayment,
    allProvince: state.admin.allProvince,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    fetchAllPrice: () => dispatch(actions.fetchAllPrice()),
    fetchAllPayment: () => dispatch(actions.fetchAllPayment()),
    fetchAllProvince: () => dispatch(actions.fetchAllProvince()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
