import type { NextPage } from "next";

import Head from "next/head";

import { useApi } from "../common/hooks";
import Navbar from "../modules/containers/Navbar";

const Page: NextPage = () => {
  const { data } = useApi("test");

  return (
    <div>
      <Head>
        <title>OscarOx Ui</title>
      </Head>

      <Navbar />
    </div>
  );
};

export default Page;
