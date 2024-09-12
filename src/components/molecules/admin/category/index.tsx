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
const { Option } = Select;

// Validation schema with Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  slug: Yup.string()
    .required("Slug is required")
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and can only contain letters, numbers, and hyphens"
    ),
});

const CategoryEdit = ({ categoryId, closeModal }: { categoryId?: string, closeModal: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryError, setcategoryError] = useState("");
  const [categorySuccess, setcategorySuccess] = useState("");
  // Initialize Formik with useFormik hook
  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setcategorySuccess("");
      setcategoryError("");
      setIsLoading(true);
      let res;
      if (categoryId) {
        res = await editCategory(categoryId, values);
        if (res?.success) {
          setIsLoading(false);
          setcategorySuccess("Category Updated SucccessFully!");
          setTimeout(() => {
            setcategorySuccess("");
            setcategoryError("");
            formik.resetForm()
            closeModal()
          }, 200)
        } else {
          setIsLoading(false);
          setcategoryError(res?.error);
        }
      } else {
        res = await createCategory(values);
        if (res?.success) {
          setIsLoading(false);
          setcategorySuccess("Category Added SucccessFully!");
          setTimeout(() => {
            setcategorySuccess("");
            setcategoryError("");
            formik.resetForm()
            closeModal()
          }, 200)
        } else {
          setIsLoading(false);
          setcategoryError(res?.error);
        }
      }
    },
  });

  //generate slug
  useEffect(() => {
    const title = formik.values.title;
    formik.setFieldValue("slug", generateSlug(title));
  }, [formik.values]);

  useEffect(() => {
    if (categoryId) {
      getcategoryToEdit();
    }
  }, [categoryId]);

  //get category by id when in edit mode
  const getcategoryToEdit = async () => {
    const result = await getCategoryById(categoryId);
    if (result?.success) {
      const category = result?.category;
      formik.setValues(category);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="h-full gap-4 py-4 flex flex-col">
      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="title">
          Title
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          size="large"
          placeholder="Enter title..."
        />
        {formik.touched.title && formik.errors.title ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.title}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="title">
          Slug
        </label>
        <Input
          placeholder="Enter Slug..."
          size="large"
          id="slug"
          name="slug"
          type="text"
          value={formik.values.slug}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.slug && formik.errors.slug ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.slug}
          </p>
        ) : null}
      </div>

      <div className="flex justify-end items-center gap-4 py-3">
        {categoryError && <p className="text-red-500 text-base">{categoryError}</p>}
        {categorySuccess && <p className="text-green-500 text-lg">{categorySuccess}</p>}
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

export default CategoryEdit;
