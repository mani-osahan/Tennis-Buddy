import { Link } from "@nextui-org/react";
import { TennisLogo } from "../../lib/images/tennis_logo";
export default function Header() {
  return (
    <header className="w-full mx-auto">
      <nav className="flex container items-center bg-primary text-white rounded-md justify-between px-4 py-4 mx-auto my-2">
        <div className="flex lg:flex-1">
          <a className="flex lg:flex-1">
            <TennisLogo />

            <h1 className="py-2 px-3 whitespace-nowrap text-md text-white font-medium">
              Tennis Buddy
            </h1>
          </a>
        </div>
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center ">
          {[
            ["Features", "/features"],
            ["Pricing", "/pricing"],
            ["Contact Us", "/contact-us"],
            ["FAQ", "/faq"],
          ].map(([title, url]) => (
            <a
              key={title}
              href={url}
              className="flex py-2 px-3 whitespace-nowrap text-normal text-white font-normal hover:text-text"
            >
              {title}
            </a>
          ))}
        </div>
        <div
          className="flex-none hidden sm:flex items-center gap-5 justify-end md:flex-1 lg:w-0 lg:justify-end lg:flex-3"
          aria-label=""
        >
          <a
            className="whitespace-nowrap text-md font-normal hover:text-gray-900"
            href="/login"
          >
            Sign in
          </a>
          <a
            className="px-4 py-2 border border-transparent hover:bg-secondary duration-150 ease-in-out  hover:text-white text-text rounded-md shadow-sm text-sm bg-white"
            href="/sign-up"
          >
            <strong className="font-semibold">Get Started-free</strong>
          </a>
        </div>
      </nav>
    </header>
  );
}
