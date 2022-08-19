import { ReactNode } from "react";
import Header from "../containers/Header";

type Props = {
  children?: ReactNode;
  title: string;
};

const BaiscLayout = ({ children, title }: Props) => (
  <div className="h-screen">
    <Header title={title} />

    {children}
  </div>
);

export default BaiscLayout;
