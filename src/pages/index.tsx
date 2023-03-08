import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { Quicksand } from "next/font/google";

import { api } from "~/utils/api";
import SEOHead from "~/components/seoHeader";
import MainLayout from "~/layouts/main";
import Image from "next/image";
import Header from "~/components/header/header";
import Hero from "~/components/hero/hero";

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

      <Header />

      <Hero />

      <MainLayout>
        <div
          className={`mb-6 mt-10 flex w-full flex-col items-center justify-center ${quicksand.className}`}
        >
          <span className="text-2xl font-semibold">Rilis Terbaru</span>
          <span>12 Rilis Terbaru</span>
        </div>

        <div className="grid grid-flow-row grid-cols-3 gap-4 text-slate-600">
          {posts.isSuccess && (
            <>
              {posts.data.map((p) => (
                <div
                  key={p.id}
                  className="rounded-md border border-slate-500 p-3"
                >
                  <div className="relative mb-4 flex h-56 w-full justify-center bg-red-300">
                    <Image
                      className="object-cover object-center"
                      src={p.thumbnail}
                      alt={p.title}
                      loading="lazy"
                      fill
                    />
                  </div>

                  <div className="flex justify-end">
                    <span className="ml-auto text-sm">
                      oleh {p?.Creator.name ?? ""}
                    </span>
                  </div>

                  <span
                    className={`text-2xl font-semibold line-clamp-3 ${quicksand.className}`}
                  >
                    {p.title}
                  </span>
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
