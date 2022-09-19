import { ReactNode } from "react";
import { useEffect } from "react";

import { useUser, useAxios } from "../../common/hooks";
import { Configuration, AuthApi } from "../../common/utils/api-client";

import Header from "../containers/Header";
import Navbar from "../containers/Navbar";

type Props = {
  children?: ReactNode;
  title: string;
};

const configuration = new Configuration({});

const DefaultLayout = ({ children, title }: Props) => {
  const axios = useAxios();
  const { user, setUser } = useUser();

  useEffect(() => {
    const authApi = new AuthApi(configuration, "", axios);

    if (!user.email && user.loggedIn) {
      authApi.authControllerGetUser().then(({ data }) => {
        setUser({
          loggedIn: true,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      });
    }
  }, [axios, setUser, user.email, user.loggedIn]);

  return (
    <div className="h-screen">
      <Header title={title} />

      <Navbar />

      <div className="mt-20">{children}</div>
    </div>
  );
};

export default DefaultLayout;
