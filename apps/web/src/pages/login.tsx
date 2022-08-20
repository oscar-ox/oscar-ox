import type { NextPage } from "next";

import * as Yup from "yup";
import { withFormik, FormikProps, Form, Field } from "formik";

import BaiscLayout from "../modules/layouts/basic";
import Button from "../common/components/Button";

interface FormValues {
  email: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, submitForm } = props;
  return (
    <Form className="w-full max-w-sm">
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
        Sign in
      </Button>

      <div className="h-32">
        {touched.email && errors.email && <div>{errors.email}</div>}
      </div>
    </Form>
  );
};

interface EmailLoginFormProps {
  initialEmail?: string;
}

const EmailLoginForm = withFormik<EmailLoginFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || "",
    };
  },

  validationSchema: Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  }),

  handleSubmit: (values) => {
    alert(values.email);
  },
})(InnerForm);

const Page: NextPage = () => (
  <BaiscLayout title="Login">
    <div className="flex h-full flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        <div className="mb-10 text-5xl font-bold text-slate-900 ">Oscar Ox</div>
        <EmailLoginForm />
      </div>

      <div className="flex items-center justify-center">
        <div className="text-sm">Register Account</div>
      </div>
    </div>
  </BaiscLayout>
);

export default Page;
