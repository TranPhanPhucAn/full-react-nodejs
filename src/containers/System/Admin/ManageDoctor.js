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
      action: CRUD_ACTIONS.CREATE,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
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
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
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
      });
    } else {
      let response = await editDetailDoctorByIdService({
        id: this.state.selectedDoctor.value,
        description: this.state.description,
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
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
    if (res && res.errCode === 0) {
      doctor = res.data;
    }
    console.log("doctor detail: ", doctor);
    if (doctor.Markdown !== null) {
      // console.log("null 12345");
      this.setState(
        {
          action: CRUD_ACTIONS.EDIT,
          description: doctor.Markdown.description,
          contentMarkdown: doctor.Markdown.contentMarkdown,
          contentHTML: doctor.Markdown.contentHTML,
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
      });
    }
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    // console.log("dsfdsa: ", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thông tin bác sĩ</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              value={this.state.description}
              onChange={(event) => this.handleOnChangeDesc(event)}
            ></textarea>
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
            <span>Tạo thông tin</span>
          ) : (
            <span>Lưu thông tin</span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
