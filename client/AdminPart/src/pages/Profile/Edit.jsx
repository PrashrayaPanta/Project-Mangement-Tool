import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputField from "../../components/ui/InputField";
import SubmitButton from "../../components/ui/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import http from "../../http";
import { FromStorage } from "../../library";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";



//! Validation schemas
const profileValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
});

const passwordValidationSchema = Yup.object({
  OldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("New Password is required"),
});

const EditProfileAndChangePassword = () => {
  const token = FromStorage("adminToken");
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // Formik for profile update
  const profileFormik = useFormik({
    initialValues: {
      username: user?.username,
      email: user?.email,
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await http.put("/profile/edit", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { data } = await http.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setUser(data?.user));
      } catch (error) {
        if (error?.response?.data?.message) {
          setFieldError("username", error.response.data.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const navigate = useNavigate();

  // Formik for password change
  const passwordFormik = useFormik({

    initialValues: {
      OldPassword: "",
      newPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {

        console.log(values);
        
      try {
        await http.put("/profile/change-password", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        navigate("/profile");
        console.log("Password updated successfully");
  
      } catch (error) {
        if (error?.response?.data?.message) {
          setFieldError("oldPassword", error.response.data.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-xl">
        <Tabs defaultValue="account">
          <TabsList className="flex justify-center">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re done.
                </CardDescription>
              </CardHeader>
              <form onSubmit={profileFormik.handleSubmit}>
                <CardContent className="grid">
                  <div className="grid">
                    <InputField type="text" formik={profileFormik} name="username" label="Username" />
                  </div>
                  <div className="grid">
                    <InputField type="email" formik={profileFormik} name="email" label="Email" />
                  </div>
                </CardContent>
                <CardFooter>
                  <SubmitButton formik={profileFormik} label="Save Changes" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged out.
                </CardDescription>
              </CardHeader>
              <form onSubmit={passwordFormik.handleSubmit}>
                <CardContent className="grid">
                  <div className="grid">
                    <InputField type="password" formik={passwordFormik} name="OldPassword" label="Old Password" />
                  </div>
                  <div className="grid">
                    <InputField type="password" formik={passwordFormik} name="newPassword" label="New Password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <SubmitButton formik={passwordFormik} label="Change Password" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditProfileAndChangePassword;
