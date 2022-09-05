import type { NextPage } from "next";

import { useApi, useAxios } from "../common/hooks";
import {
  Configuration,
  ProductionsApi,
  ProductionEntity,
} from "../common/utils/api-client";

import { AxiosInstance, AxiosResponse } from "axios";

import DefaultLayout from "../modules/layouts/default";

const configuration = new Configuration({});

const EmailStartForm = () => {
  const axios = useAxios();

  const productionsApi = new ProductionsApi(configuration, "", axios);

  const { data, error } = useApi<ProductionEntity[]>(
    productionsApi.productionsControllerFindAll.bind(productionsApi)
  );

  if (data) {
    const FormedList = data.map((item: any) => (
      <div key={item.id}>{item.name}</div>
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
  return (
    <DefaultLayout title="Oscar Ox - Productions">
      <EmailStartForm />
    </DefaultLayout>
  );
};

export default Page;
