import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./UserManage.scss";
import { createNewUser } from "../../services/userService";
// import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditUser extends Component {
  //   state = {};
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    // this.listenToEmitter();
  }
  //   listenToEmitter = () => {
  //     emitter.on("EVENT_MODAL_EDIT_DATA", () => {
  //       this.setState({
  //         email: this.props.user.email,
  //         password: "123456",
  //         firstName: this.props.user.firstName,
  //         lastName: this.props.user.lastName,
  //         address: this.props.user.address,
  //       });
  //     });
  //   };
  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "123456",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }
  toggle = () => {
    this.props.handleCloseEditUser();
  };
  checkValidInput = () => {
    let isValid = true;
    let arrInput = ["firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleEditUser = async () => {
    if (this.checkValidInput() === true) {
      console.log("edit ok");
      this.props.editUser(this.state);
      // let data = await createNewUser(this.state);
      // console.log("check data", data);
      // this.toggle();
    }
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        // console.log(this.state);
      }
    );
  };
  // handleChangePassword = (event) => {
  //   this.setState({
  //     password: event.target.password,
  //   });
  // };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        size="lg"
        className="modal-user-container"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          {/* <div className="container"> */}
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                value={this.state.email}
                disabled
                // onChange={(event) => this.handleOnChangeInput(event, "email")}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                value={this.state.password}
                type="password"
                disabled
                // onChange={(event) =>
                //   this.handleOnChangeInput(event, "password")
                // }
              />
            </div>
            <div className="input-container">
              <label>First name:</label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
              />
            </div>
            <div className="input-container">
              <label>Last name:</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
              />
            </div>
            <div className="input-container max-width-input">
              <label>Adress</label>
              <input
                type="text"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div>
          </div>
          {/* </div> */}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            // onClick={() => this.toggle()}
            className="px-2"
            onClick={() => this.handleEditUser()}
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => this.toggle()}
            className="px-2"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
