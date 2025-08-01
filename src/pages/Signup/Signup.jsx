import React, { useState } from "react";
import posters from "../../assets/imgs/posters.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";

export default function Signup() {
  const navigate = useNavigate();
  const [ExistError, setExistError] = useState(null);

  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name must be more than 3 characters")
      .max(25, "Name must be less than 25 characters"),
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passRegex,
        "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    rePassword: string()
      .required("Confirm password is required")
      .oneOf([ref("password")], "Password and confirm password should match"),
  });

  async function signupWithFirebase(values) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: values.name,
      });

      const token = await user.getIdToken();
      console.log("Token:", token);

      navigate("/login");
    } catch (error) {
      setExistError("This email is already in use");
      console.error("Signup error:", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: signupWithFirebase,
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${posters})` }}
    >
      <form
        className=" bg-zinc-900 bg-opacity-60 shadow-2xl rounded-2xl w-1/3 overflow-hidden"
        onSubmit={formik.handleSubmit}
      >
        <div className="px-8 py-10 md:px-10">
          <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            Create Account
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            It only takes a minute to join the fun!
          </p>
          <div className="mt-5">

            <div className="relative">
              <label
                className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                htmlFor="name"
              >
                User Name
              </label>
              <input
                placeholder="Enter Your Name"
                autoComplete="off"
                className="form-control w-full px-4 py-2 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                name="name"
                id="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-sm mt-2 ps-2">
                  *{formik.errors.name}
                </p>
              )}
            </div>

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
              {ExistError && (
                <p className="text-red-500 text-sm mt-2 ps-2">
                  *{ExistError}
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
            </div>

            <div className="mt-4">
              <label
                className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                htmlFor="rePassword"
              >
                Confirm Password
              </label>
              <input
                placeholder="••••••••"
                className="form-control w-full px-4 py-2 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                name="rePassword"
                id="rePassword"
                type="password"
                value={formik.values.rePassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="text-red-500 text-sm mt-2 ps-2">
                  *{formik.errors.rePassword}
                </p>
              )}
            </div>

            <div className="mt-10">
              <button
                className="w-full px-4 py-3 tracking-wide text-white bg-primary-600 hover:bg-primary-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-400 dark:focus:ring-primary-800"
                type="submit"
              >
                Let's Go
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-3">
          <div className="text-sm  text-slate-500 text-center">
            Already have an account?
            <Link to="/login" className="font-medium text-blue-700 ml-1">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
