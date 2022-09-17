import type { NextPage } from "next";

import { useApi, useAxios } from "../common/hooks";
import {
  Configuration,
  ProductionsApi,
  ProductionEntity,
} from "../common/utils/api-client";

import DefaultLayout from "../modules/layouts/default";

const configuration = new Configuration({});

const Productions = () => {
  const axios = useAxios();

  const productionsApi = new ProductionsApi(configuration, "", axios);

  const { data, error } = useApi<ProductionEntity[]>(
    productionsApi.productionsControllerFindAll.bind(productionsApi)
  );

  if (data) {
    const FormedList = data.map((item: ProductionEntity) => (
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
      <Productions />
    </DefaultLayout>
  );
};

export default Page;
