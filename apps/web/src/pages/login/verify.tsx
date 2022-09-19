import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { AxiosInstace1 } from "../../common/utils/axios";
import {
  Configuration,
  AuthApi,
  ErrorEntity,
} from "../../common/utils/api-client";
import { useUser, useToken } from "../../common/hooks";

import BaiscLayout from "../../modules/layouts/basic";

const configuration = new Configuration({});

const EmailVerify = () => {
  const router = useRouter();

  const { setUser } = useUser();
  const { setToken } = useToken();

  const [error, setError] = useState<ErrorEntity | null>();

  useEffect(() => {
    console.log("call");
    if (router.query.token) {
      if (typeof router.query.token === "string") {
        console.log("oo");
        const emailLoginToken = router.query.token;

        const authApi = new AuthApi(
          configuration,
          "",
          AxiosInstace1(undefined, emailLoginToken)
        );

        // now make the request to generate the tokens
        authApi
          .authControllerEmailVerify()
          .then((response) => {
            setUser({
              loggedIn: true,
            });
            setToken(response.data.accessToken);
            router.push("/");
          })
          .catch(({ data }: { data: ErrorEntity }) => {
            setUser({
              loggedIn: false,
            });
            setError(data);
          });
      }
    }
  }, [router, router.query, setToken, setUser]);

  return <>{!error ? "Verifying..." : error.message}</>;
};

const Page: NextPage = () => (
  <BaiscLayout title="Login">
    <div className="flex h-full flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        <div className="mb-10 text-5xl font-bold text-slate-900 ">Oscar Ox</div>
        <div className="h-64 w-full max-w-sm text-center text-2xl">
          <EmailVerify />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="text-sm">Register Account</div>
      </div>
    </div>
  </BaiscLayout>
);

export default Page;
