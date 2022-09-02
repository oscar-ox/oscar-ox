import type { NextPage } from "next";
import Link from "next/link";

import BaiscLayout from "../../modules/layouts/basic";

const Page: NextPage = () => (
  <BaiscLayout title="Register">
    <div className="flex h-full flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        <div className="mb-10 text-5xl font-bold text-slate-900 ">Oscar Ox</div>
        <div className="h-64 w-full max-w-sm text-center text-2xl">
          Check your email for register link
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="text-lg font-medium ">
          No Email?{" "}
          <Link href="/help">
            <a className="underline hover:text-slate-700">Help</a>
          </Link>
        </div>
      </div>
    </div>
  </BaiscLayout>
);

export default Page;
