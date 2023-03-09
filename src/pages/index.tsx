import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";

import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";
import MainLayout from "~/layouts/main";
import Header from "~/components/header/header";
import Hero from "~/components/hero/hero";
import Footer from "~/components/footer/footer";
import Link from "next/link";
import Loading from "~/components/loading/loading";
import ContentCard from "~/components/card/content";

const MoreButton = styled.button``;

const Home: NextPage = () => {
  const posts = api.post.getAll.useQuery();

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />
      <Header />
      <Hero />

      <MainLayout>
        <div
          className={`mb-6 mt-10 flex w-full flex-col items-center justify-center `}
        >
          <span className="text-2xl font-semibold">Rilis Terbaru</span>
          <span>12 Rilis Terbaru</span>
        </div>

        {posts.isLoading && <Loading />}

        {posts.isSuccess && (
          <>
            <div className="grid grid-flow-row grid-cols-3 gap-4 text-slate-600">
              <>
                {posts.data.map((p) => (
                  <ContentCard post={p} key={p.id} />
                ))}
              </>
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/#">
                <MoreButton
                  type="button"
                  className="rounded-md border border-slate-500 bg-white p-3"
                >
                  Tampilkan lainnya
                </MoreButton>
              </Link>
            </div>
          </>
        )}
      </MainLayout>

      <Footer />
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
