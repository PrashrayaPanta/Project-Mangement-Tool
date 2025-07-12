import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { ClearStorage, FromStorage } from "../../library";
import { setUser } from "../../store";
import http from "../../http";
import { useDispatch, useSelector } from "react-redux";
import  LoadingComponent  from "./LoadingComponent";
import PrivateNavbar from "./PrivateNavbar";

const Layout = () => {
  const user = useSelector((state) => state.user.value);

  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (!user) {
      const token = FromStorage("adminToken");

      if (token) {
        http
          .get("/profile", {
            headers:{
                Authorization: `Bearer ${token}`
            }
          })
          .then(( {data}) => dispatch(setUser(data.user)))
          .catch(() => {})
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  return Loading ? (
    <LoadingComponent />
  ) : (
    <>
      <PrivateNavbar />
      <Outlet />
    </>
  );
};

export default Layout;
