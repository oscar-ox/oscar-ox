import { ReactNode } from "react";

import Header from "../containers/Header";
import Navbar from "../containers/Navbar";

type Props = {
  children?: ReactNode;
  title: string;
};

const DefaultLayout = ({ children, title }: Props) => (
  <div className="h-screen">
    <Header title={title} />

    <Navbar />

    <div className="mt-20">{children}</div>
  </div>
);

export default DefaultLayout;
