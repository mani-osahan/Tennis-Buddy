import { Link } from "@nextui-org/react";

export default function Header() {
  return (
    <header className="b-base-100 mx-auto">
      <nav className="flex-none container flex items-center justify-between px-30 py-4 mx-auto">
        <div className="flex lg:flex-1">
            <a className="flex lg:flex-1" href="">

          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            height="55px"
            viewBox="0 0 350 290 "
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,280.000000) scale(0.0500000,-0.050000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M3000 4984 c-452 -52 -749 -153 -1090 -372 -504 -324 -880 -893 -980
-1482 -22 -128 -31 -463 -16 -614 71 -730 546 -1412 1217 -1750 163 -82 315
-139 404 -151 24 -4 48 -8 51 -11 15 -9 161 -36 269 -50 138 -17 397 -19 535
-4 143 16 416 74 521 110 431 150 840 474 1100 870 130 199 229 416 289 637
47 171 64 271 75 451 28 449 -77 876 -312 1276 -91 154 -190 279 -343 432
-266 268 -550 442 -910 557 -244 78 -609 124 -810 101z m395 -429 c253 -36
519 -138 743 -286 91 -60 94 -49 -40 -156 -248 -197 -526 -335 -893 -442 -58
-17 -238 -62 -400 -101 -341 -81 -495 -129 -672 -210 -200 -91 -377 -208 -531
-350 -71 -65 -219 -247 -256 -315 l-23 -40 5 160 c21 718 479 1368 1152 1635
129 51 334 102 460 113 109 10 359 5 455 -8z m1173 -691 c61 -75 147 -202 147
-217 0 -7 -53 -38 -118 -69 -213 -103 -386 -231 -565 -418 -293 -305 -522
-704 -750 -1305 -170 -447 -341 -722 -515 -829 l-43 -27 -92 27 c-301 88 -557
235 -763 439 -122 120 -218 247 -314 415 -82 143 -83 150 -34 295 72 216 217
430 393 581 233 201 508 329 896 419 532 123 696 170 930 270 253 108 548 291
715 443 25 23 50 40 55 38 6 -1 32 -29 58 -62z m336 -651 c29 -133 42 -237 47
-383 32 -786 -428 -1478 -1171 -1765 -161 -62 -385 -114 -493 -115 l-33 0 44
58 c118 152 197 304 307 582 242 615 360 853 542 1092 196 258 384 418 630
539 56 27 104 49 108 49 3 0 12 -26 19 -57z"
              />
            </g>
          </svg>
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
              key = {title}
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
        <Link href="/login">
          <a className="whitespace-nowrap text-md text-gray-500 font-medium hover:text-gray-900">
            Sign in
          </a>
        </Link>
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
