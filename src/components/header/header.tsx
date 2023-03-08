import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50  bg-black p-8 text-white">
      <div className="mx-auto flex max-w-screen-xl justify-between">
        <div>Logo</div>

        <nav>
          <ul className="flex gap-x-6 font-semibold">
            <li>
              <Link href="/">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>Project dan Donasi</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>Blog Member</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>Lapor Link Rusak</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
