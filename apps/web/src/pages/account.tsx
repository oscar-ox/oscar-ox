import type { NextPage } from "next";

import { useApi, useAxios, useUser } from "../common/hooks";
import {
  Configuration,
  AuthApi,
  SessionEntity,
} from "../common/utils/api-client";

import DefaultLayout from "../modules/layouts/default";

const configuration = new Configuration({});

const Sessions = () => {
  const axios = useAxios();

  const authApi = new AuthApi(configuration, "", axios);

  const { data, error } = useApi<SessionEntity[]>(
    authApi.authControllerGetSessions.bind(authApi)
  );

  if (data) {
    const FormedList = data.map((item: SessionEntity) => (
      <div key={item.id}>
        <b>{item.id} </b>
        <div>Started - {item.createdAt}</div>
        <div>Last Used - {item.updatedAt}</div>
        <div>Revoked - {item.revoked ? "True" : "False"}</div>
        <div>Started - {item.started ? "True" : "False"}</div>
      </div>
    ));

    return <>{FormedList}</>;
  } else {
    if (error) {
      return <>{error.message}</>;
    } else {
      return <>Loading</>;
    }
  }
};

const Page: NextPage = () => {
  const { user } = useUser();

  return (
    <DefaultLayout title="Oscar Ox - Account">
      {user.loggedIn && user.firstName}
      <br /> <br />
      <Sessions />
    </DefaultLayout>
  );
};

export default Page;
