import type { NextPage } from "next";

import BaiscLayout from "../../modules/layouts/basic";

const Page: NextPage = () => (
  <BaiscLayout title="Login">
    <div className="flex h-full flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        <div className="mb-10 text-5xl font-bold text-slate-900 ">Oscar Ox</div>
        <div className="h-64 w-full max-w-sm text-center text-2xl">
          Check your email for login link
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="text-sm">Register Account</div>
      </div>
    </div>
  </BaiscLayout>
);

export default Page;
