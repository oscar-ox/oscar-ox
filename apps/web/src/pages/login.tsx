import type { NextPage } from 'next'

import { Formik, Field, Form, FormikHelpers } from 'formik';
import Card from '../common/components/Card';
import BaiscLayout from '../modules/layouts/basic';
import Button from '../common/components/Button';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const Page: NextPage = () => {
  return (

    <BaiscLayout title="Login">

      <div className="h-full flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">


        <div className="flex flex-1 flex-col items-center justify-center pt-12 pb-16">

          <div className='text-5xl text-gray-900 font-bold mb-10 '>Oscar Ox</div>

          <form className="w-full max-w-sm">

            <div className='mb-6'>

              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>

              <input
                id="email-address"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className="text-lg relative block w-full px-4 py-2 text-gray-900 placeholder-gray-500 rounded-md border-2 border-gray-200 "
              />

            </div>

            <Button className='mb-16' display={Button.display.BLOCK} size={Button.size.LARGE} colour={Button.colour.LIGHT}>
              Sign in
            </Button>

          </form>

        </div>

        <div className="flex items-center justify-center">
          <div className='text-sm'>Register Account</div>
        </div>

      </div>
    </BaiscLayout>
  );
};

export default Page