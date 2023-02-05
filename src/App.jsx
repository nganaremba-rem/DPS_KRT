import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import IsNotLogin from "./components/IsNotLogin";
import RequireAuth from "./components/RequireAuth";
// import { lazyLoad } from "./lazyLoad";

// const Branch = lazyLoad("./pages", "Branch");
// const CreateBranch = lazyLoad("./pages", "CreateBranch");
// const CreateEmployee = lazyLoad("./pages", "CreateEmployee");
// const CreateRole = lazyLoad("./pages", "CreateRole");
// const Dashboard = lazyLoad("./pages", "Dashboard");
// const DashboardLayout = lazyLoad("./pages", "DashboardLayout");
// const EditPoint = lazyLoad("./pages", "EditPoint");
// const Employee = lazyLoad("./pages", "Employee");
// const GivePoint = lazyLoad("./pages", "GivePoint");
// const Login = lazyLoad("./pages", "Login");
// const PointEarnedByDriver = lazyLoad("./pages", "PointEarnedByDriver");
// const PointRequest = lazyLoad("./pages", "PointRequest");
// const PointRequestHistory = lazyLoad("./pages", "PointRequestHistory");
// const Role = lazyLoad("./pages", "Role");
// const EditBranch = lazyLoad("./pages", "EditBranch");
// const EditEmployee = lazyLoad("./pages", "EditEmployee");
// const EditPage = lazyLoad("./pages", "EditPage");
// const EditRole = lazyLoad("./pages", "EditRole");
// const Points = lazyLoad("./pages", "Points");
// const CreditPoint = lazyLoad("./pages", "CreditPoint");
// const ConfirmPoints = lazyLoad("./pages", "ConfirmPoints");
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
  EditBranch,
  EditEmployee,
  EditPage,
  EditRole,
  Points,
  CreditPoint,
  ConfirmPoints,
} from "./pages";
import AcceptGivePoint from "./pages/Dashboard/AcceptGivePoint";
import DeleteBranch from "./pages/Dashboard/DeleteBranch";
import DeleteEmployee from "./pages/Dashboard/DeleteEmployee";
import DeleteRole from "./pages/Dashboard/DeleteRole";
import DriversPointDisplay from "./pages/Dashboard/DriversPointDisplay";
import DriversWithDetails from "./pages/Dashboard/DriversPointDisplay";
import EditBranchForm from "./pages/Dashboard/EditBranchForm";
import EditEmployeeForm from "./pages/Dashboard/EditEmployeeForm";
import EditRoleForm from "./pages/Dashboard/EditRoleForm";
import SendMessage from "./pages/Dashboard/SendMessage";
// import EditBranch from "./pages/Dashboard/EditBranch";
// import EditEmployee from "./pages/Dashboard/EditEmployee";
// import EditPage from "./pages/Dashboard/EditPage";
// import EditRole from "./pages/Dashboard/EditRole";
// import Points from "./pages/Dashboard/Points";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<IsNotLogin />}>
            <Route index element={<Login />}></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="editPage/:id" element={<EditPage />} />
              <Route path="sendMessage" element={<SendMessage />} />
              <Route path="employee">
                <Route path="display" index element={<Employee />} />
                <Route path="create" element={<CreateEmployee />} />
                <Route path="edit">
                  <Route index element={<EditEmployee />} />
                  <Route path=":id" element={<EditEmployeeForm />} />
                </Route>
                <Route path="delete" element={<DeleteEmployee />} />
              </Route>
              <Route path="branch">
                <Route path="display" index element={<Branch />} />
                <Route path="create" element={<CreateBranch />} />
                <Route path="edit">
                  <Route index element={<EditBranch />} />
                  <Route path=":id" element={<EditBranchForm />} />
                </Route>
                <Route path="delete" element={<DeleteBranch />} />
              </Route>
              <Route path="role">
                <Route path="display" index element={<Role />} />
                <Route path="create" element={<CreateRole />} />
                <Route path="edit">
                  <Route index element={<EditRole />} />
                  <Route path=":id" element={<EditRoleForm />} />
                </Route>
                <Route path="delete" element={<DeleteRole />} />
              </Route>
              <Route path="point">
                <Route path="display" index element={<Points />} />
                <Route
                  path="confirmpointreqfrombm"
                  element={<ConfirmPoints />}
                />
                <Route path="creditPoint" element={<CreditPoint />} />
                <Route
                  path="driverspointsdisplay"
                  element={<DriversPointDisplay />}
                />
                <Route path="acceptgivepoint" element={<AcceptGivePoint />} />
                <Route path="edit" element={<EditPoint />} />
                <Route path="givePoint" element={<GivePoint />} />
                <Route path="pointsEarned" element={<PointEarnedByDriver />} />
                <Route path="pointRequest" element={<PointRequest />} />
                <Route
                  path="pointRequestHistory"
                  element={<PointRequestHistory />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
