import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import Form from "./components/Form";
// import ProjectsList from "./components/ProjectsList";
// import { CardDemo } from "./pages/auth/Login"

// import PrivateNavbar from "./components/ui/PrivateNavbar";
// import UserProfile from "./components/ui/UserProfile"
// import { AppSidebar } from "./components/sidebar"


import Dashboard from "./components/ui/Dashboard";
import Layout from "./components/ui/Layout";

import PrivateRoute from "./Routes/PrivateRoute";







//! Login

import Login from "./pages/auth/Login";

//! Edit Profile
import Edit from "./pages/Profile/Edit";



//! List Projects
import List from "./pages/Project/List";

//! Create Projects
import Create from "./pages/Project/Create";















function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />

            <Route index element={<PrivateRoute element={<Dashboard />} />} />


               {/* <Route
              path="profile/edit"
              element={<PrivateRoute element={<Pages.Profile.Edit />} />}
            />
            <Route
              path="profile/password"
              element={<PrivateRoute element={<Pages.Profile.Password />} />}
            /> */}

            {/* <Route path="profile" element={<PrivateRoute element={<Outlet/>}  />}
              
            </Route> */}

            {/* Profile Route */}

            <Route
              path="profile"
              element={<PrivateRoute element={<Edit />} />}
            />


            <Route path="project" element={<PrivateRoute element={<Outlet/>} />}>
                <Route index element={<List/>} />
                <Route path="create" element={<Create/>}/> 
            </Route>
          
      
          </Route>

          {/* <Route path="/dashboard" element={<PrivateNavbar/>}/> */}
          {/* <Route path="/register" element={<Register/>}/>
            <Route path="/projects/create" element={<Form/>}/> */}
          {/* <Route path="/profile" element={<UserProfile />} /> */}
          {/* <Route path="/dashboard" element={<AppSidebar/>}/> */}

          {/* <Route path="/dashboard/cr"/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
