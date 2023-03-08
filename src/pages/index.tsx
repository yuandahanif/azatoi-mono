import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { Quicksand } from "next/font/google";

import { api } from "~/utils/api";
import SEOHead from "~/components/seoHeader";
import MainLayout from "~/layouts/main";
import Link from "next/link";

const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const Home: NextPage = () => {
  const posts = api.post.getAll.useQuery();

  return (
    <>
      <SEOHead />
      <header className="fixed top-0 left-0 right-0 z-50  bg-black p-8 text-white">
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

      <div className="h-screen bg-[url('https://blogger.googleusercontent.com/img/a/AVvXsEjpejYXmamsABBcLX25LG4YT2PBM1z7z3TdkkRUzx_uTOg5V7REWWDHjdBM7JrkZ4vKvFjc4fyiWqH1GRXu_Ba7THMVeDBBvtBIVOThcs_ANGtHH-I16rxYFSJzoUqCVvWrXnrxtSnOVtmYgbm3hBqOiil8KEFIZJ6e7ffXGIKGs2uO28k3FeBuYEhdhg=s1408')] bg-cover bg-center bg-no-repeat blur-[1px]">
        AZATOI
      </div>

      <MainLayout>
        <div
          className={`mb-4 flex w-full flex-col items-center justify-center ${quicksand.className}`}
        >
          <span className="text-2xl font-semibold">Rilis Terbaru</span>
          <span>12 Rilis Terbaru</span>
        </div>

        <div className="grid grid-flow-row grid-cols-3 gap-4">
          {posts.isSuccess && (
            <>
              {posts.data.map((p) => (
                <div
                  key={p.id}
                  className="rounded-md border border-slate-500 p-4"
                >
                  <div>
                    <img
                      className="object-cover object-center aspect-w-1 aspect-h-1"
                      src={p.thumbnail}
                      alt={p.title}
                      loading="lazy"
                    />
                  </div>
                  <span className="line-clamp-3">{p.title}</span>
                  <div>
                    <p className="line-clamp-3">{p.content}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
