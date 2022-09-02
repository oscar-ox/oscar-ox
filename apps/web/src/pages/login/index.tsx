import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

import * as Yup from "yup";
import { FormikProps, FormikHelpers, Formik, Field, Form } from "formik";

import { AxiosInstace1 } from "../../common/utils/axios";
import {
  Configuration,
  AuthApi,
  ErrorEntity,
} from "../../common/utils/api-client";

import BaiscLayout from "../../modules/layouts/basic";
import Button from "../../common/components/Button";

interface FormValues {
  email: string;
}

const configuration = new Configuration({});

type EmailLoginFormProps = {
  complete: () => void;
};

const EmailLoginForm = ({ complete }: EmailLoginFormProps) => {
  const [error, setError] = useState<ErrorEntity | null>();
  const authApi = new AuthApi(configuration, "", AxiosInstace1());

  const initialValues: FormValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const onSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    authApi
      .authControllerEmailLogin({
        email: values.email,
      })
      .then(() => {
        helpers.setSubmitting(false);
        complete();
      })
      .catch(({ data }: { data: ErrorEntity }) => {
        helpers.setSubmitting(false);
        setError(data);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, submitForm }: FormikProps<FormValues>) => (
        <Form className="h-64 w-full max-w-sm">
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="mb-6">
            <Field
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email Address"
              className="relative block w-full rounded-md border-2 border-slate-200 px-4 py-2 text-lg text-slate-900 placeholder-slate-500"
            />
          </div>

          <Button
            className="mb-8"
            display={Button.display.BLOCK}
            size={Button.size.LARGE}
            colour={Button.colour.DARK}
            handleClick={submitForm}
          >
            Login
          </Button>

          <div className="h-32 text-center">
            {touched.email && errors.email && <div>{errors.email}</div>}
            {error && <div>{error.message}</div>}
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Page: NextPage = () => {
  const [complete, setComplete] = useState<boolean>(false);

  const finalComplete = (): void => {
    setComplete(true);
  };

  const retryComplete = (): void => {
    setComplete(false);
  };

  return (
    <BaiscLayout title="Login">
      <div className="flex h-full flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 flex-col items-center justify-center pt-12 pb-16">
          <div className="mb-10 text-5xl font-bold text-slate-900 ">
            Oscar Ox
          </div>
          {!complete ? (
            <EmailLoginForm complete={finalComplete} />
          ) : (
            <div className="h-64 w-full max-w-sm text-center ">
              <div className="text-2xl">
                Check your email for registration link
              </div>
              <div className="mt-10 text-lg font-medium">
                No email?{" "}
                <div
                  className="inline cursor-pointer underline hover:text-slate-700"
                  onClick={retryComplete}
                >
                  Retry
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center">
          <div className="text-lg font-medium ">
            No Account?{" "}
            <Link href="/register">
              <a className="underline hover:text-slate-700">Register</a>
            </Link>
          </div>
        </div>
      </div>
    </BaiscLayout>
  );
};

export default Page;
