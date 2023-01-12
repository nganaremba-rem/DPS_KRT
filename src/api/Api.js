import axios from "axios";
import { endpoints } from "../endpoints";

// MAIN FETCH API
export const getAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// ! BASE URL
// const baseURL = "https://krt-node-server-production-695a.up.railway.app";
// const baseURL =
//   "https://krt-backend-json-server-production-5cc1.up.railway.app";
const baseURL = "http://burn.pagekite.me";
// const baseURL = "http://localhost:4000";

export const Axios = axios.create({
  baseURL,
});

//  ? GET REQUEST

export const fetchData = (url, options) => {
  return axios.get(url, {
    baseURL: baseURL,
    ...options,
  });
};

//  ? POST REQUEST

export const postData = (data, url, options = {}) => {
  return axios
    .post(url, data, {
      ...options,
      baseURL: baseURL,
    })
    .then((res) => res)
    .catch((err) => err);
};

// ? DELETE Request

export const deleteData = (url, data = {}, options = {}) => {
  return axios
    .delete(url, data, {
      ...options,
      baseURL: baseURL,
    })
    .then((res) => res)
    .catch((err) => err);
};
// ? PUT Request

export const putData = (data, url, options = {}) => {
  return axios
    .put(url, data, {
      ...options,
      baseURL: baseURL,
    })
    .then((res) => res)
    .catch((err) => err);
};

//  Request functions

// ! GET REQUEST
// user menu
export const fetchUserOptions = (userId) =>
  fetchData(endpoints.userOptions, {
    headers: {
      userId,
    },
  });

export const fetchEmployees = (userId) =>
  fetchData(endpoints.employees, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: userId,
    },
  });
export const getAllDrivers = (userId) =>
  fetchData(endpoints.allDrivers, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: userId,
    },
  });

export const getDriversFromBranch = (userId) =>
  fetchData(endpoints.allDrivers, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: userId,
    },
  });

export const getdriversPointDisplay = (userId) =>
  fetchData(endpoints.driversPointDisplay, {
    params: {
      ctryCode: "123",
      langCode: "12",
      brachCode: "B123",
    },
    headers: {
      userId: userId,
    },
  });
export const acceptGivePoint = (userId) =>
  fetchData(endpoints.getAllGivePoint, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: userId,
    },
  });

export const fetchMenus = (userId) =>
  fetchData(endpoints.menu, {
    params: {
      ctryCode: "IN",
      langCode: "EN",
    },
    headers: {
      userId: userId,
    },
  });
export const fetchPoints = ({ userId, branchCode }) => {
  return fetchData(endpoints.points, {
    params: {
      ctryCode: "123",
      langCode: "12",
      brachCode: branchCode,
    },
    headers: {
      userId,
    },
  });
};
export const fetchBranches = (userId) =>
  fetchData(endpoints.branches, {
    headers: {
      userId: userId,
    },
    params: {
      ctryCode: "123",
      langCode: "12",
    },
  });
export const fetchRoles = (userId) =>
  fetchData(endpoints.roles, {
    headers: {
      userId: userId,
    },
    params: {
      ctryCode: "123",
      langCode: "12",
    },
  });

export const fetchBranchManagers = (userId) =>
  fetchData(endpoints.branchManagers, {
    headers: {
      userId,
    },
    params: {
      ctryCode: "123",
      langCode: "12",
      role: "BM",
    },
  });

export const fetchDrivers = (userId) =>
  fetchData(endpoints.branchManagers, {
    headers: {
      userId,
    },
    params: {
      ctryCode: "123",
      langCode: "12",
      role: "DR",
    },
  });

export const fetchPointsEarnedByDrivers = (userId) =>
  fetchData(endpoints.pointsEarnedByDriver, {
    params: {
      ctryCode: "123",
      langCode: "12",
      brachCode: "B123",
    },
    headers: {
      userId,
    },
  });
export const fetchPointsReqHistory = (userId) =>
  fetchData(endpoints.pointReqHistory, {
    params: {
      ctryCode: "123",
      langCode: "12",
      brachCode: "591",
    },
    headers: {
      userId,
    },
  });
export const fetchPointsRequested = (userId) =>
  fetchData(endpoints.pointsRequested, {
    params: {
      ctryCode: "123",
      langCode: "12",
      brachCode: "B123",
      requestState: 0,
    },
    headers: {
      userId,
    },
  });

// FETCH DATA FOR CREATION
const axiosLocalInstance = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:${window.location.port}`,
});

export const createEmployee = (userId) =>
  axiosLocalInstance.get(endpoints.createEmp);

export const createBranch = (userId) =>
  axiosLocalInstance.get(endpoints.createBranch);

export const createRole = (userId) =>
  axiosLocalInstance.get(endpoints.createRole);

export const givePoint = (userId) =>
  axiosLocalInstance.get(endpoints.givePoint);

export const creditPoint = (userId) =>
  axiosLocalInstance.get(endpoints.creditPoint);

export const pointRequestFromBM = (userId) =>
  fetchData(endpoints.pointRequestFromBM, {
    headers: {
      userId,
    },
  });

// ! POST request functions

export const LoginFn = (data) =>
  postData(data, endpoints.login, {
    headers: { "Content-Type": "application/json" },
  });

export const createEmployeeApi = (data, userId) =>
  postData(data, endpoints.createEmployeePOST, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: { "Content-Type": "application/json", userId },
  });

export const createBranchPost = (data, userId) =>
  postData(data, endpoints.createBranchPOST, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: { "Content-Type": "application/json", userId },
  });

export const createRolePost = (data, userId) =>
  postData(data, endpoints.createRolePOST, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: { "Content-Type": "application/json", userId },
  });

export const assignCreditPoint = (data, userId) =>
  postData(data, endpoints.assignCreditPoint, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: { "Content-Type": "application/json", userId },
  });

export const acceptPointRequest = (data, userId) =>
  postData(data, endpoints.acceptPointRequest, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId,
      "Content-Type": "application/json",
    },
  });

export const postGivePoint = (data, userId) =>
  postData(data, endpoints.postGivePoint, {
    params: {
      ctryCode: "IN",
      langCode: "EN",
    },
    headers: {
      userId,
      "Content-Type": "application/json",
    },
  });

export const postAcceptGivePoint = (data, userId) => {
  return postData(data, endpoints.postAcceptGivePoint, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: "p1234",
      "Content-Type": "application/json",
    },
  });
};

// ! PUT Request

export const updateUser = (data, userId) => {
  return putData(data, endpoints.updateUserPUT, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: userId,
      "Content-Type": "application/json",
    },
  });
};

export const updateBranch = (data, userId) => {
  return putData(data, endpoints.updateBranchPUT, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: userId,
      "Content-Type": "application/json",
    },
  });
};

export const updateRole = (data, userId) => {
  return putData(data, endpoints.updateRolePUT, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: userId,
      "Content-Type": "application/json",
    },
  });
};

// ! DELETE request functions

export const LogoutFn = () => deleteData(endpoints.logout);

export const deleteUser = (userId, data) => {
  return deleteData(endpoints.deleteUserDel, data, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: userId,
      "Content-Type": "application/json",
    },
  });
};

export const deleteBranch = (userId, data) => {
  return deleteData(endpoints.deleteBranchDel, data, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: userId,
      "Content-Type": "application/json",
    },
  });
};

export const deleteRole = (userId, data) => {
  return deleteData(endpoints.deleteRoleDel, data, {
    params: {
      ctryCode: "123",
      langCode: "12",
    },
    headers: {
      userId: userId,
      "Content-Type": "application/json",
    },
  });
};
