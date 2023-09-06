import axios from "../axios";
const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-user?id=${inputId}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUser = (id) => {
  return axios.delete("/api/delete-user", { data: { id: id } });
};
const editUserService = (data) => {
  return axios.put("/api/edit-user", data);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get("/api/get-all-doctors");
};
const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUser,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
};
