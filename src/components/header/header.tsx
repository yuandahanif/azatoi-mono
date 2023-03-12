import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const HEADER_LINKS = [
  { id: 1, href: "/", label: "Home", props: {} },
  {
    id: 2,
    href: "https://trakteer.id/azatoionline",
    props: { target: "_blank" },
    label: "Project dan Donasi",
  },
  { id: 3, href: "/", label: "Team", props: {} },
  { id: 4, href: "/", label: "Lapor Link Rusak", props: {} },
];

const Header = () => {
  const mobileHeaderRef = useRef<HTMLUListElement | null>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const handleToggleNav = () => {
    setIsNavVisible((s) => {
      if (mobileHeaderRef.current) {
        if (s) {
          mobileHeaderRef.current.style.transform = "scaleY(100%)";
        } else {
          mobileHeaderRef.current.style.transform = "scaleY(0%)";
        }
      }

      return !s;
    });
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#332041]  px-4 text-white">
      <div className="mx-auto flex max-w-screen-xl justify-between">
        <div>
          <Link href="/">
            <div className="relative h-20 w-20">
              <Image
                className="object-contain object-center"
                src="/assets/logo.png"
                alt="logo"
                loading="lazy"
                fill
              />
            </div>
          </Link>
        </div>

        <nav className="flex items-center">
          <ul className="hidden gap-x-6 font-semibold md:flex">
            {HEADER_LINKS.map((l) => (
              <li key={l.id}>
                <Link href={l.href} className="inline-flex" {...l.props}>
                  <span>{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative flex md:hidden">
            <button
              className="text-white"
              type="button"
              onClick={handleToggleNav}
            >
              {isNavVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>

            <ul
              ref={mobileHeaderRef}
              className="fixed left-0 top-20 flex h-full w-full origin-top scale-y-0 flex-col items-center justify-start gap-y-8 bg-slate-700 bg-opacity-80 p-5 font-semibold duration-300"
            >
              {HEADER_LINKS.map((l) => (
                <li key={l.id}>
                  <Link href={l.href} {...l.props}>
                    <span className="text-xl">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
