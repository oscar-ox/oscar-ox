import type { NextPage } from "next";
import { useUser } from "../common/hooks";

import DefaultLayout from "../modules/layouts/default";

const Page: NextPage = () => {
  const { user } = useUser();

  return (
    <DefaultLayout title="Oscar Ox - Account">
      {user.loggedIn && user.firstName}
    </DefaultLayout>
  );
};

export default Page;
