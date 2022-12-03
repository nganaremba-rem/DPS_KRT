import axios from "axios";
import { endpoints } from "../endpoints";

export const getAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// MAIN FETCH API

export const fetchData = (url) => {
  return axios.get(url);
};

// user login response
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

// Creation
export const createEmployee = () => fetchData(endpoints.createEmp);
export const createBranch = () => fetchData(endpoints.createBranch);
export const createRole = () => fetchData(endpoints.createRole);
export const givePoint = () => fetchData(endpoints.givePoint);

//  POST REQUEST

export const postData = (data, url) => {
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer token_aifjkk^Kjekasdf",
    },
  });
};

export const LoginFn = (data) => postData(data, endpoints.login);
