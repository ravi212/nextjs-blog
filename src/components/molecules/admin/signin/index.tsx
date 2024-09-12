"use client"

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Spinner from '@/components/atoms/common/Spinner';

// Validation schema with Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
});


export default function LoginForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Initialize Formik with useFormik hook
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const result = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.replace('/admin');
      }

      setIsLoading(false);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        {error && <p className="text-red-500 text-center mb-4">Invalid Credentials</p>}
        <form onSubmit={formik.handleSubmit} className="h-full gap-4 flex flex-col">
        <div className="flex flex-col gap-1">
        <label className="text-base font-normal" htmlFor="username">
          Username
        </label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            size="large"
            placeholder="Enter username..."
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="text-red-500 text-base font-normal">
              {formik.errors.username}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
        <label className="text-base font-normal" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          size="large"
          placeholder="Enter password..."
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-500 text-base font-normal">
            {formik.errors.password}
          </p>
        ) : null}
      </div>
          <button
            type="submit"
            className="w-full bg-red-500 flex justify-center items-center text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-400 "
          >
                     {isLoading &&  <Spinner  />}

                    {!isLoading && <p>Sign In</p>}
          </button>
        </form>
      </div>
    </div>
  );
}