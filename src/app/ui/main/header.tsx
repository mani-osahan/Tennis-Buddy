import { Link } from "@nextui-org/react";
import {TennisLogo} from "../../lib/images/tennis_logo"
export default function Header() {
  return (
    <header className="b-base-100 mx-auto">
      <nav className="flex-none container flex items-center justify-between px-30 py-4 mx-auto">
        <div className="flex lg:flex-1">
          <a className="flex lg:flex-1" >
          
          <TennisLogo/>

            <h1 className="py-2 px-3 whitespace-nowrap text-md text-black font-medium">
              Tennis Buddy
            </h1>
          </a>
        </div>
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {[
            ["Pricing", "/pricing"],
            ["FAQ", "/faq"],
          ].map(([title, url]) => (
            <a
              key={title}
              href={url}
              className="flex py-2 px-3 whitespace-nowrap text-md text-gray-500 font-medium hover:text-gray-900"
            >
              {title}
            </a>
          ))}
        </div>
        <div
          className="flex-none hidden sm:flex items-center gap-5 justify-end md:flex-1 lg:w-0 lg:justify-end lg:flex-3"
          aria-label=""
        >
            <a className="whitespace-nowrap text-md text-gray-500 font-medium hover:text-gray-900" href="/login">
              Sign in
            </a>
          <a
            className="whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-white bg-black"
            href="/signup"
          >
            <strong className="font-semibold">Get Started-free</strong>
          </a>
        </div>
      </nav>
    </header>
  );
}
