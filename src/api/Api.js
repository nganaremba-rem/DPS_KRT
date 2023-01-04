import axios from "axios";
import { endpoints } from "../endpoints";

// MAIN FETCH API
export const getAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// ! BASE URL
// const postURL = "https://krt-node-server-production-695a.up.railway.app";
// const baseURL =
//   "https://krt-backend-json-server-production-5cc1.up.railway.app";
const postURL = "http://burn.pagekite.me";
const baseURL = "http://burn.pagekite.me";
// const baseURL = "http://localhost:4000";

//  ? GET REQUEST

export const fetchData = (url, options) => {
  return axios.get(url, {
    baseURL: baseURL,
    ...options,
  });
};

//  ? POST REQUEST

export const postData = (data, url) => {
  return axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: postURL,
    })
    .then((res) => res)
    .catch((err) => err);
};

// DELETE Request

const deleteRequest = (url) => {
  return axios.delete(url, {
    baseURL: postURL,
  });
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
  });
export const fetchRoles = (userId) =>
  fetchData(endpoints.roles, {
    headers: {
      userId: userId,
    },
  });
export const fetchBranchList = (userId) =>
  fetchData(endpoints.branchList, {
    headers: {
      userId,
    },
  });
export const fetchPointsEarnedByDrivers = (userId) =>
  fetchData(endpoints.pointsEarnedByDriver, {
    headers: {
      userId,
    },
  });
export const fetchPointsReqHistory = (userId) =>
  fetchData(endpoints.pointReqHistory, {
    headers: {
      userId,
    },
  });
export const fetchPointsRequested = (userId) =>
  fetchData(endpoints.pointsRequested, {
    params: {
      ctryCode: 123,
      langCode: 12,
      brachCode: "B123",
      requestState: 0,
    },
    headers: {
      userId,
    },
  });

// FETCH DATA FOR CREATION
export const createEmployee = (userId) =>
  fetchData(endpoints.createEmp, {
    userId,
  });
export const createBranch = (userId) =>
  fetchData(endpoints.createBranch, {
    headers: {
      userId,
    },
  });
export const createRole = (userId) =>
  fetchData(endpoints.createRole, {
    headers: {
      userId,
    },
  });
export const givePoint = (userId) =>
  fetchData(endpoints.givePoint, {
    headers: {
      userId,
    },
  });
export const creditPoint = (userId) =>
  fetchData(endpoints.creditPoint, {
    userId,
  });
export const pointRequestFromBM = (userId) =>
  fetchData(endpoints.pointRequestFromBM, {
    headers: {
      userId,
    },
  });

// ! POST request functions

export const LoginFn = (data) => postData(data, endpoints.login);

// ! DELETE request functions

export const LogoutFn = () => deleteRequest(endpoints.logout);
