import type { NextPage } from "next";

import { useApi, useAxios } from "../common/hooks";

import DefaultLayout from "../modules/layouts/default";

const EmailStartForm = () => {
  const axios = useAxios();

  const { loading, data, error } = useApi(axios, "/productions");

  if (data) {
    const FormedList = data.map((item: any) => (
      <div key={item.id}>{item.name}</div>
    ));

    return <>{FormedList}</>;
  } else {
    return <>Loading</>;
  }
};

const Page: NextPage = () => {
  return (
    <DefaultLayout title="Oscar Ox - Productions">
      <EmailStartForm />
    </DefaultLayout>
  );
};

export default Page;
