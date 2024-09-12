"use client";
import { generateSlug } from "@/utils/common";
import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "suneditor/dist/css/suneditor.min.css";
import Spinner from "@/components/atoms/common/Spinner";
import { upload } from "@/lib/actions/common.action";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createCategory, editCategory, getCategoryById } from "@/lib/actions/category.action";
import { UserRole } from "@/enum/enum";
const { Option } = Select;
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createUser, editUser, getUserById } from "@/lib/actions/user.action";

// Validation schema with Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters long"),
    lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters long"),
    username: Yup.string()
    .required("Username is required")
    .transform((value) => value.toLowerCase()) 
    .matches(/^[a-z0-9_]+$/, 'Username must be lowercase and can only contain letters, numbers, and underscores'),
    email: Yup.string()
    .email("Invalid Email")
    .required("Email is required"),
    password: Yup.string()
    .required("Password is required"),
    role: Yup.string()
    .required("Role is required"),
});


const roles = [UserRole.AUTHOR, UserRole.GUEST]

const UserEdit = ({ userId, closeModal }: { userId?: string, closeModal: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userError, setuserError] = useState("");
  const [userSuccess, setuserSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Initialize Formik with useFormik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      role: UserRole.GUEST
    },
    validationSchema,
    onSubmit: async (values) => {
      setuserSuccess("");
      setuserError("");
      setIsLoading(true);
      let res;
      if (userId) {
        res = await editUser(userId, values);
        if (res?.success) {
          setIsLoading(false);
          setuserSuccess("User Updated SucccessFully!");
          setTimeout(() => {
            setuserSuccess("");
            setuserError("");
            formik.resetForm()
            closeModal()
          }, 200)
        } else {
          setIsLoading(false);
          setuserError(res?.error);
        }
      } else {
        res = await createUser(values);
        if (res?.success) {
          setIsLoading(false);
          setuserSuccess("User Added SucccessFully!");
          setTimeout(() => {
            setuserSuccess("");
            setuserError("");
            formik.resetForm()
            closeModal()
          }, 200)
        } else {
          setIsLoading(false);
          setuserError(res?.error);
        }
      }
    },
  });

  useEffect(() => {
    if (userId) {
      getcategoryToEdit();
    }
  }, [userId]);

  //get category by id when in edit mode
  const getcategoryToEdit = async () => {
    const result = await getUserById(userId);
    if (result?.success) {
      const user = result?.user;
      formik.setValues(user);
    }
  };

  const handleRoleChange = (value) => {
    formik.setFieldValue("role", value);
  }

  return (
    <form onSubmit={formik.handleSubmit} className="h-full gap-4 py-4 flex flex-col">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="firstName">
          First Name
        </label>
            <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            size="large"
            placeholder="Enter First name..."
            />
            {formik.touched.firstName && formik.errors.firstName ? (
            <p className="text-red-500 text-base font-normal">
                {formik.errors.firstName}
            </p>
            ) : null}
        </div>

        <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="lastName">
          Last Name
        </label>
            <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            size="large"
            placeholder="Enter Last name..."
            />
            {formik.touched.lastName && formik.errors.lastName ? (
            <p className="text-red-500 text-base font-normal">
                {formik.errors.lastName}
            </p>
            ) : null}
        </div>

      </div>


      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="role">
          Role
        </label>

        <Select
          id="category"
          placeholder="Select Category"
          value={formik.values.role}
          onChange={handleRoleChange}
          onBlur={formik.handleBlur}
          size="large"
        >
          {roles?.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>

        {formik.touched.role && formik.errors.role ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.role}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="username">
          Username
        </label>
        <Input
          placeholder="Enter Username..."
          size="large"
          id="username"
          name="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.username}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="email">
          Email
        </label>
        <Input
          placeholder="Enter Email..."
          size="large"
          id="email"
          name="email"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="password">
          Password
        </label>
        <Input
          placeholder="Enter Password..."
          size="large"
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          addonAfter={
          <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
           {
            !showPassword ? <RemoveRedEyeIcon /> :<VisibilityOffIcon className="cursor-pointer"/>
           } 
          </span>}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.password}
          </p>
        ) : null}
      </div>

      <div className="flex justify-end items-center gap-4 py-3">
        {userError && <p className="text-red-500 text-base">{userError}</p>}
        {userSuccess && <p className="text-green-500 text-lg">{userSuccess}</p>}
        <button
          type="submit"
          className="bg-red-500 rounded-lg px-6 py-3 cursor-pointer text-base font-medium text-white shadow-lg"
        >
          {isLoading && <Spinner />}

          {!isLoading && <p>Save</p>}
        </button>
      </div>
    </form>
  );
};

export default UserEdit;
