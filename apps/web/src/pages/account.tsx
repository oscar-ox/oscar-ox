import type { NextPage } from "next";
import Card from "../common/components/Card";

import { useApi, useAxios, useUser } from "../common/hooks";
import {
  Configuration,
  SessionEntity,
  SessionsApi,
} from "../common/utils/api-client";

import DefaultLayout from "../modules/layouts/default";

const configuration = new Configuration({});

type SessionProps = {
  session: SessionEntity;
};

const Session = ({ session }: SessionProps) => {
  const date = new Date(session.createdAt);
  const dateString = date.toLocaleString();

  return (
    <Card padding={Card.padding.SMALL}>
      <div className="flex">
        <div>Started - {dateString} </div>
        <div>Last Used - {session.updatedAt.toLocaleString()} </div>
        <div>Revoked - {session.revoked ? "True" : "False"} </div>
        <div>Started - {session.started ? "True" : "False"} </div>
      </div>
    </Card>
  );
};

const Sessions = () => {
  const axios = useAxios();

  const authApi = new SessionsApi(configuration, "", axios);

  const { data, error } = useApi<SessionEntity[]>(
    authApi.sessionsControllerFindAll.bind(authApi)
  );

  if (data) {
    const FormedList = data.map((session: SessionEntity, index: number) => (
      <Session key={index} session={session} />
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

const User = () => {
  const { user } = useUser();

  return (
    <div>
      <div className="mb-10 text-2xl font-bold text-slate-900 ">
        {user.loggedIn && user.firstName + " " + user.lastName}
      </div>
    </div>
  );
};

const Page: NextPage = () => {
  return (
    <DefaultLayout title="Oscar Ox - Account">
      <User />
      <Sessions />
    </DefaultLayout>
  );
};

export default Page;
