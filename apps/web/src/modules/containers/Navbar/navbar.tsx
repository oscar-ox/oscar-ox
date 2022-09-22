import Link from "next/link";

import { useToggle } from "../../../common/hooks";
import { useUser } from "../../../common/hooks/user";
import { JoinClassNames } from "../../../common/utils/style";

type NavbarLinkProps = {
  title: string;
  url: string;
  active: boolean;
}

const NavbarLink = ({ title, url, active }: NavbarLinkProps) => (
  <Link href={url}>
    <a className={JoinClassNames("rounded-md  border-2 border-slate-200 px-3 py-2 text-lg font-medium", (active ? "bg-blue-500 text-slate-600 hover:border-slate-600 hover:bg-blue-900" : "text-slate-900 hover:border-slate-900"))}>
      {title}
    </a>
  </Link>
)

type NavbarLoginLinkProps = {
  title: string;
  url: string;
}

const NavbarLoginLink = ({ title, url }: NavbarLoginLinkProps) => (
  <Link href={url}>
    <a className="rounded-md border-2 border-transparent bg-slate-100 px-3 py-2 text-lg font-medium text-slate-900 hover:border-slate-900">
      {title}
    </a>
  </Link>
)

type NavbarProps = {
  active_url?: string;
}

export function Navbar({ active_url }: NavbarProps) {
  const { user } = useUser();
  const [menu, toggleMenu] = useToggle(false);

  return (
    <div className="fixed top-0 left-0 right-0 border-b-2 border-slate-200 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 sm:py-2 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md bg-gray-200 p-2 text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none dark:bg-gray-600 dark:text-white dark:hover:bg-white dark:hover:text-gray-700"
              aria-expanded="false"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="right-0 flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="text-4xl font-bold text-slate-900">Oscar Ox</div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">

                <NavbarLink title="Calender" url="/calendar" active={"/calendar" == active_url} />

                <NavbarLink title="Productions" url="/productions" active={"/productions" == active_url} />

                {user.loggedIn ? (
                  <NavbarLoginLink title="Account" url="/account" />
                ) : (
                  <NavbarLoginLink title="Login" url="/login" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
