import axios from "axios";
import { endpoints } from "../endpoints";

// MAIN FETCH API
export const getAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// ! BASE URL
// const baseURL = "http://localhost:4001";
// const baseURL = "http://burn.pagekite.me";
const postURL = "https://krt-node-server-production-695a.up.railway.app";
const baseURL =
  "https://krt-backend-json-server-production-5cc1.up.railway.app";

//  ? GET REQUEST

export const fetchData = (url) => {
  return axios.get(url, {
    baseURL: baseURL,
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
export const fetchUserOptions = () => fetchData(endpoints.userOptions);
export const fetchEmployees = () => fetchData(endpoints.employees);
export const fetchMenus = () => fetchData(endpoints.menu);
export const fetchPoints = () => fetchData(endpoints.points);
export const fetchBranches = () => fetchData(endpoints.branches);
export const fetchRoles = () => fetchData(endpoints.roles);
export const fetchBranchList = () => fetchData(endpoints.branchList);
export const fetchPointsEarnedByDrivers = () =>
  fetchData(endpoints.pointsEarnedByDriver);
export const fetchPointsReqHistory = () => fetchData(endpoints.pointReqHistory);
export const fetchPointsRequested = () => fetchData(endpoints.pointsRequested);

// FETCH DATA FOR CREATION
export const createEmployee = () => fetchData(endpoints.createEmp);
export const createBranch = () => fetchData(endpoints.createBranch);
export const createRole = () => fetchData(endpoints.createRole);
export const givePoint = () => fetchData(endpoints.givePoint);
export const creditPoint = () => fetchData(endpoints.creditPoint);
export const pointRequestFromBM = () => fetchData(endpoints.pointRequestFromBM);

// ! POST request functions

export const LoginFn = (data) => postData(data, endpoints.login);

// ! DELETE request functions

export const LogoutFn = () => deleteRequest(endpoints.logout);
