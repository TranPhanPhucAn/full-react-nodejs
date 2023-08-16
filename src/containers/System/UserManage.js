import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUser,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayUser: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
      // email: "",
      // firstName: "",
      // lastName: "",
      // address: "",
      // actions: "",
    };
  }
  //   state = {};
  handleGetAllUser = async () => {
    // let data = await handleGetUsers();
    // this.setState({
    //   email: data.email,
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   address: data.address,
    //   actions: data.roleId,
    // });
    // console.log(">>>", data);
  };
  async componentDidMount() {
    // this.handleGetAllUser();
    await this.getAllUsersFromReact();
    // console.log(">>>", data);
  }
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrayUser: response.user,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  handleCloseModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  handleCloseEditUser = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
      // console.log("check", response);
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (userId) => {
    try {
      console.log("check id:", userId);

      let response = await deleteUser(userId);
      console.log("check response:", response);
      if (response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  editUser = async (data) => {
    try {
      // console.log("test");
      let response = await editUserService(data);
      console.log("check data", response);
      if (response && response.errCode === 0) {
        console.log("check mistake");
        await this.getAllUsersFromReact();
        console.log("ua alo");
        this.setState({
          isOpenModalEditUser: false,
        });
        emitter.emit("EVENT_MODAL_EDIT_DATA");
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let listUsers = this.state.arrayUser;
    console.log("list>>", listUsers);
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          handleCloseModal={this.handleCloseModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            handleCloseEditUser={this.handleCloseEditUser}
            currentUser={this.state.userEdit}
            editUser={this.editUser}
            // createNewUser={this.createNewUser}
          />
        )}
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-4 mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {listUsers &&
                listUsers.length > 0 &&
                listUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {/* <tr> */}
              {/* <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td> */}
              {/* </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
