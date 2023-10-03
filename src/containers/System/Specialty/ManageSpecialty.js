import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { languages, CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleEditorChange = ({ html, text }) => {
    // console.log("handleEditorChange", html, text);
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };
  handleOnChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log("base 64: ", base64);
      // const objectUrl = URL.createObjectURL(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };
  handleSaveSpecialty = async () => {
    // console.log("state spe: ", this.state);
    let res = await createNewSpecialty({
      name: this.state.name,
      image: this.state.imageBase64,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
    });
    if (res && res.errCode === 0) {
      toast.success("Create new specialty succeed!");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        image: "",
      });
    } else {
      toast.error("Create new specialty failed!");
    }
  };
  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quan ly chuyen khoa</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Ten chuyen khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeName(event)}
            />
          </div>
          <div className="col-6 form-group">
            <label>Anh chuyen khoa</label>
            <input
              className="form-control"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveSpecialty()}
            >
              Save
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
