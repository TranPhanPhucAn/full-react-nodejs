// import actionTypes from "./actionTypes";

// export const adminLoginSuccess = (adminInfo) => ({
//   type: actionTypes.ADMIN_LOGIN_SUCCESS,
//   adminInfo: adminInfo,
// });

// export const adminLoginFail = () => ({
//   type: actionTypes.ADMIN_LOGIN_FAIL,
// });

// export const processLogout = () => ({
//   type: actionTypes.PROCESS_LOGOUT,
// });
import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUser,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
} from "../../services/userService";
import { toast } from "react-toastify";
import { assign } from "lodash";
// import { dispatch } from "../../redux";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSucess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart err:", e);
    }
  };
};
export const fetchGenderSucess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      // console.log("check res:", res);
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("Check position err:", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      console.log("role error:", e);
      dispatch(fetchRoleFailed());
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
});
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("check create: ", res);
      if (res && res.errCode === 0) {
        toast.success("Create a new user succeed");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      console.log("role error:", e);
      dispatch(fetchRoleFailed());
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      // console.log("check res: ", res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.user.reverse()));
      } else {
        toast.error("Fetch all users error!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch all users error!");
      // console.log("role error:", e);
      dispatch(fetchAllUsersFailed());
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});
export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user succeed");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete the user error!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Edit user success");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Edit the user error!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Edit the user error!");
      dispatch(editUserFailed());
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService(10);
      // console.log("check res: ", res);
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorsSuccess(res.data));
      } else {
        toast.error("Fetch top doctors error!");
        dispatch(fetchTopDoctorsFailed());
      }
    } catch (e) {
      toast.error("Fetch top doctors error!");
      // console.log("role error:", e);
      dispatch(fetchTopDoctorsFailed());
    }
  };
};
export const fetchTopDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  doctors: data,
});
export const fetchTopDoctorsFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
});
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      // console.log("check res: ", res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        toast.error("Fetch top doctors error!");
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      toast.error("Fetch all doctors error!");
      // console.log("role error:", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};
export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  doctors: data,
});

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save infor detail doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save infor detail doctor error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save infor detail doctor error!");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      // console.log("check res: ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        toast.error("Fetch all code schedule time error!");
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      toast.error("Fetch all code schedule time error!");
      // console.log("role error:", e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};
export const fetchAllPrice = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("PRICE");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_PRICE_SUCCESS,
          dataPrice: res.data,
        });
      } else {
        // toast.error("Fetch allcode price failed");
        dispatch({
          type: actionTypes.FETCH_ALLCODE_PRICE_FAILED,
        });
      }
    } catch (e) {
      console.log("price lost: ", e);
      // toast.error("Fetch all code price failed");
      dispatch({
        type: actionTypes.FETCH_ALLCODE_PRICE_FAILED,
      });
    }
  };
};
export const fetchAllPayment = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("PAYMENT");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_PAYMENT_SUCCESS,
          dataPayment: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_PAYMENT_FAILED,
          dataPayment: res.data,
        });
      }
    } catch (e) {
      console.log(e);
      // toast('Fetch all ')
      dispatch({
        type: actionTypes.FETCH_ALLCODE_PAYMENT_FAILED,
      });
    }
  };
};
export const fetchAllProvince = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("PROVINCE");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_PROVINCE_SUCCESS,
          dataProvince: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_PROVINCE_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_PROVINCE_FAILED,
      });
    }
  };
};
