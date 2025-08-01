import React, { useState } from "react";
import posters from "../../assets/imgs/posters.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { auth } from "../../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../context/User.context";

export default function Login() {
  let { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passRegex,
        "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const login = async (values) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/");
    } catch (error) {
      setErrorMsg("Incorrect Email or Password");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${posters})` }}
      >
        <form
          className="mt-20 bg-zinc-900 bg-opacity-60 shadow-2xl rounded-2xl w-1/3 overflow-hidden"
          onSubmit={formik.handleSubmit}
        >
          <div className="px-8 py-10 md:px-10">
            <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
              Welcome Back!
            </h2>
            <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
              We missed you, sign in to continue.
            </p>

            <div className="mt-2">
              <label
                className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                htmlFor="email"
              >
                Email
              </label>
              <input
                placeholder="abc@example.com"
                className="form-control w-full px-4 py-2 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                name="email"
                id="email"
                type="email"
                autoComplete="off"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm mt-2 ps-2">
                  *{formik.errors.email}
                </p>
              )}
              {errorMsg && (
                  <p className="text-red-500 text-sm mt-2 ps-2">
                    *{errorMsg}
                  </p>
                )}
            </div>

            <div className="mt-2">
              <label
                className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                placeholder="••••••••"
                className="form-control w-full px-4 py-2 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                name="password"
                id="password"
                type="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-sm mt-2 ps-2">
                  *{formik.errors.password}
                </p>
              )}
               {errorMsg && (
                  <p className="text-red-500 text-sm mt-2 ps-2">
                    *{errorMsg}
                  </p>
                )}
            </div>

            <div className="mt-10">
              <button
                className="w-full px-4 py-3 tracking-wide text-white bg-primary-600 hover:bg-primary-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-400 dark:focus:ring-primary-800"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>

          <div className="px-8 py-4">
            <div className="text-sm text-slate-500 text-center">
              Don't have an account?
              <Link to="/signup" className="font-medium text-blue-700">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
