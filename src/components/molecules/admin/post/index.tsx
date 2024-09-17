"use client";
import { createPost, editPost, getPostById } from "@/lib/actions/post.action";
import { generateSlug, htmlToPlainText } from "@/utils/common";
import { Input, Select } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "@/components/atoms/common/Spinner";
import { upload } from "@/lib/actions/common.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Editor from "@/components/atoms/admin/editor";
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
  textContent: Yup.string()
    .required("Contents are required")
    .min(10, "Contents must be at least 10 characters long"),
  htmlContent: Yup.string()
    .required("Contents are required")
    .min(10, "Contents must be at least 10 characters long"),
  imageUrl: Yup.string().required("Image is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.array().of(Yup.string()).required("Tags are required"),
});

const PostEdit = ({ post, categories, authors }: { post?: any; categories: CategoryType[], authors: UserType[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [imageSuccess, setImageSuccess] = useState("");
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState("");
  const router= useRouter();

  // Initialize Formik with useFormik hook
  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      imageUrl: "",
      textContent: "",
      htmlContent: "",
      featured: false,
      pinned: false,
      category: '',
      tags: [],
      author: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setPostSuccess("");
      setPostError("");
      setIsLoading(true);
      let res;
      if (post) {
        res = await editPost(post._id, values);
        if (res?.success) {
          setIsLoading(false);
          setPostSuccess("Post Updated SucccessFully!");
          setTimeout(() => {
            router.push(`/admin/post/list`);
          }, 200)
          
        } else {
          setIsLoading(false);
          setPostError(res?.error);
        }
      } else {
        res = await createPost(values);
        if (res?.success) {
          setIsLoading(false);
          setPostSuccess("Post Added SucccessFully!");
          setTimeout(() => {
            router.push(`/admin/post/list`);
          }, 200)
        } else {
          setIsLoading(false);
          setPostError(res?.error);
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
    if (post) {
      formik.setValues(post);
    }
  }, [post]);


  const handleFileUpload = async (event) => {
    setImageError("");
    setImageSuccess("");

    const file = event.currentTarget.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await upload(formData);

      if (response.success) {
        formik.setFieldValue("imageUrl", response?.imageUrl);
        setImageSuccess("Image Uploaded SuccessFully!");
      } else {
        setImageError("Error Uploading Image!");
      }
    }
  };

  // Handle change of tags select
  const handleSelectChange = (value) => {
    formik.setFieldValue("tags", value);
  };

  // Handle change of Select component
  const handleCategoryChange = (value) => {
    formik.setFieldValue("category", value);
  };

  // Handle change of Select component
  const handleAuthorChange = (value) => {
    formik.setFieldValue("author", value);
  };

  const handleEditorChange = (value) => {
    formik.setFieldValue("htmlContent", value);
    const plainText = htmlToPlainText(value).substring(0, 300);
    formik.setFieldValue("textContent", plainText);
  }


  return (
    <form onSubmit={formik.handleSubmit} className="h-full gap-4 flex flex-col">
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


      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="author">
          Author
        </label>

        <Select
          id="author"
          placeholder="Select Author"
          value={formik.values.author}
          onChange={handleAuthorChange}
          onBlur={formik.handleBlur}
          size="large"
        >
          {authors?.map((item, index) => (
            <Option key={index} value={item._id}>
              {`${item.firstName} ${item.lastName}`}
            </Option>
          ))}
        </Select>

        {formik.touched.author && formik.errors.author ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.author}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="title">
          Category
        </label>

        <Select
          id="category"
          placeholder="Select Category"
          value={formik.values.category}
          onChange={handleCategoryChange}
          onBlur={formik.handleBlur}
          size="large"
        >
          {categories?.map((item, index) => (
            <Option key={index} value={item._id}>
              {item.title}
            </Option>
          ))}
        </Select>

        {formik.touched.tags && formik.errors.tags ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.tags}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="title">
          Tags
        </label>

        <Select
          id="tags"
          mode="tags"
          placeholder="Add Tags"
          value={formik.values.tags}
          onChange={handleSelectChange}
          onBlur={formik.handleBlur}
          size="large"
        >
          {formik.values?.tags?.map((tag, index) => (
            <Option key={index} value={tag}>
              {tag}
            </Option>
          ))}
        </Select>

        {formik.touched.tags && formik.errors.tags ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.tags}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="content">
          Content
        </label>
        <Suspense>
          <Editor onChange={handleEditorChange} content={formik.values.htmlContent}/>
        </Suspense>
        {/* <SunEditor
          name="htmlContent"
          onChange={handleEditorChange}
          // onBlur={formik.handleBlur}
          setContents={formik.values.htmlContent}
          setOptions={{
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["bold", "underline", "italic"],
              ["fontColor", "hiliteColor"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["align", "horizontalRule", "list"],
              ["table", "link", "image"],
              ["fullScreen", "preview", "codeView"],
            ],
            height: "300px",
          }}
          height="100%"
          placeholder="Enter post content here..."
        /> */}
        {formik.touched.htmlContent && formik.errors.htmlContent ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.htmlContent}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-normal" htmlFor="title">
          Cover Image
        </label>
        <Input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        {formik.errors.imageUrl && formik.touched.imageUrl ? (
          <div>{formik.errors.imageUrl}</div>
        ) : null}
        {imageError && <p className="text-red-500">{imageError}</p>}
        {imageSuccess && <p className="text-green-500">{imageSuccess}</p>}
      </div>

      {formik.values.imageUrl && (
        <div className="relative w-[100%] md:w-[100%] h-[auto] overflow-hidden">
          <Image
            width={900}
            height={900}
            src={formik.values.imageUrl}
            alt="Image preview"
            className="w-[100%] object-cover"
          />
        </div>
      )}

      <div className="flex justify-end items-center gap-4">
        {postError && <p className="text-red-500 text-base">{postError}</p>}
        {postSuccess && <p className="text-green-500 text-lg">{postSuccess}</p>}
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

export default PostEdit;
