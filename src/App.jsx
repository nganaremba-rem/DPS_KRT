import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Branch,
  CreateBranch,
  CreateEmployee,
  CreateRole,
  Dashboard,
  DashboardLayout,
  EditPoint,
  Employee,
  GivePoint,
  Login,
  PointEarnedByDriver,
  PointRequest,
  PointRequestHistory,
  Role,
} from "./pages";
import EditBranch from "./pages/Dashboard/EditBranch";
import EditEmployee from "./pages/Dashboard/EditEmployee";
import EditPage from "./pages/Dashboard/EditPage";
import EditRole from "./pages/Dashboard/EditRole";
import Points from "./pages/Dashboard/Points";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="editPage/:id" element={<EditPage />} />
            <Route path="employee">
              <Route path="display" element={<Employee />} />
              <Route path="create" element={<CreateEmployee />} />
              <Route path="editDelete" element={<EditEmployee />} />
            </Route>
            <Route path="branch">
              <Route path="display" element={<Branch />} />
              <Route path="create" element={<CreateBranch />} />
              <Route path="editDelete" element={<EditBranch />} />
            </Route>
            <Route path="role">
              <Route path="display" element={<Role />} />
              <Route path="create" element={<CreateRole />} />
              <Route path="editDelete" element={<EditRole />} />
            </Route>
            <Route path="point">
              <Route path="display" element={<Points />} />
              <Route path="edit" element={<EditPoint />} />
              <Route path="givePoint" element={<GivePoint />} />
              <Route
                path="pointEarnedByEmp"
                element={<PointEarnedByDriver />}
              />
              <Route path="pointRequest" element={<PointRequest />} />
              <Route path="pointReqHistory" element={<PointRequestHistory />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
