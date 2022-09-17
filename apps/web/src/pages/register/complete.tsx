import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import * as Yup from "yup";
import { FormikProps, FormikHelpers, Formik, Field, Form } from "formik";

import { AxiosInstace1 } from "../../common/utils/axios";
import {
  Configuration,
  AuthApi,
  ErrorEntity,
} from "../../common/utils/api-client";
import { useUser, useToken } from "../../common/hooks";

import BaiscLayout from "../../modules/layouts/basic";
import Button from "../../common/components/Button";

interface FormValues {
  firstName: string;
  lastName: string;
}

const configuration = new Configuration({});

const EmailRegisterForm = () => {
  const router = useRouter();

  const { setUser } = useUser();
  const { setToken } = useToken();

  const [emailRegisterToken, setEmailRegisterToken] = useState<string>("x");

  useEffect(() => {
    if (router.query.token) {
      if (typeof router.query.token === "string")
        setEmailRegisterToken(router.query.token);
    }
  }, [router.query]);

  const [error, setError] = useState<ErrorEntity | null>();
  const authApi = new AuthApi(
    configuration,
    "",
    AxiosInstace1(undefined, emailRegisterToken)
  );

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
  });

  const onSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    authApi
      .authControllerEmailRegister({
        firstName: values.firstName,
        lastName: values.lastName,
      })
      .then((response) => {
        helpers.setSubmitting(false);
        setUser({
          loggedIn: true,
        });
        setToken(response.data.accessToken);
        router.push("/");
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
          <label htmlFor="firstName" className="sr-only">
            First Name
          </label>

          <div className="mb-6">
            <Field
              id="firstName"
              type="text"
              name="firstName"
              autoComplete="given-name"
              placeholder="First Name"
              className="relative block w-full rounded-md border-2 border-slate-200 px-4 py-2 text-lg text-slate-900 placeholder-slate-500"
            />
          </div>

          <label htmlFor="lastName" className="sr-only">
            Last Name
          </label>

          <div className="mb-6">
            <Field
              id="lastName"
              type="text"
              name="lastName"
              autoComplete="family-name"
              placeholder="Last Name"
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
            Complete Registration
          </Button>

          <div className="h-32 text-center">
            {touched.firstName && errors.firstName && (
              <div>{errors.firstName}</div>
            )}
            {touched.lastName && errors.lastName && (
              <div>{errors.lastName}</div>
            )}
            {error && error.message}
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Page: NextPage = () => (
  <BaiscLayout title="Register">
    <div className="flex h-full flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        <div className="mb-10 text-5xl font-bold text-slate-900 ">Oscar Ox</div>
        <EmailRegisterForm />
      </div>

      <div className="flex items-center justify-center">
        <div className="text-lg font-medium ">
          Already have an account?{" "}
          <Link href="/login">
            <a className="underline hover:text-slate-700">Login</a>
          </Link>
        </div>
      </div>
    </div>
  </BaiscLayout>
);

export default Page;
