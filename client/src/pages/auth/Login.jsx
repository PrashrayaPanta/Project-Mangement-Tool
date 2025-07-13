import { FiMail, FiLock } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import SubmitButton from "../../components/ui/SubmitButton";
import http from "../../http";

import { useDispatch } from "react-redux";
import { setUser } from "../../store";

import { ToStorage } from "../../library";
import { useState } from "react";

//! Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {

  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const { data } = await http.post("/auth/login", values);

        console.log(data);
        

        console.log(data.token);

        dispatch(setUser(data));

        ToStorage("adminToken", data.token, remember);

        

        formik.resetForm();


        navigate("/")
      } catch (error) {
        console.log(error);

        console.error("Login failed:", error.response.data.message);


        

        // If error.response.data.message contains field-specific errors
        if (error?.response?.data?.message) {
          // If `errors` is a general error message
          setFieldError("email", error.response.data.message); // Example: Set error for the email field
        }
      } finally {
        setSubmitting(false);
      }
    },
  });



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            New here?
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>

        <form className="mt-8  space-y-5" onSubmit={formik.handleSubmit}>
          <InputField
            formik={formik}
            name="email"
            label="Email"
            iconComponent={<FiMail className="h-5 w-5 text-gray-400" />}
          />

          <InputField
            formik={formik}
            name="password"
            label="Password"
            iconComponent={<FiLock className="h-5 w-5 text-gray-400" />}
          />

          <SubmitButton formik={formik} label="Log In" />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="mr-2"
              onChange={() => setRemember(!remember)}
              checked={remember}
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember Me
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
