import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { FormikInput } from "../../components/formik";
import { Button } from "../../components/ui";
import { useAuthContext } from "../../context/AuthContext";
import type { IRegisterPayload } from "../../interface";

const Register = () => {
  const navigate = useNavigate();
  const { loading, register } = useAuthContext();

  const initialValues: IRegisterPayload = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  const handleSubmit = async (values: IRegisterPayload) => {
    const success = await register(values);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">Register here!!!</h1>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <FormikInput name="name" label="Name" placeholder="Your name" />

                <FormikInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                />

                <FormikInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />

                <Button type="submit" disabled={isSubmitting || loading}>
                  Register
                </Button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm text-gray-500 mt-6">
            Have an account?{" "}
            <a
              className="text-indigo-600 hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
