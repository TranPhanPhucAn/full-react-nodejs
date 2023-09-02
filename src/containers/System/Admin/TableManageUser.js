import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userRedux !== this.props.userRedux) {
      this.setState({
        userArr: this.props.userRedux,
      });
    }
  }
  handleDeleteUser = (user) => {
    // console.log("user:", user);
    this.props.deleteAUserRedux(user.id);
  };
  handleEditUser = (user) => {
    console.log("user edit: ", user);
    this.props.handleEditUserFromParent(user);
  };
  render() {
    let users = this.state.userArr;
    // console.log("check user:", users);
    return (
      <table id="customers">
        <tbody>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
          {users &&
            users.length > 0 &&
            users.map((item, index) => {
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
                      onClick={() => this.handleDeleteUser(item)}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
