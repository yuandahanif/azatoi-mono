import { type NextPage } from "next";
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
import SearchSection from "~/components/search/search";

const MoreButton = styled.button``;

const Home: NextPage = () => {
  const posts = api.post.getAll.useQuery({ count: 12 });

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />
      <Header />
      <Hero />

      <MainLayout>
        <div
          className={`mb-6 mt-10 flex w-full flex-col items-center justify-center text-slate-800 `}
        >
          {/* <span className="text-4xl font-semibold">Rilis Terbaru</span>
          <span>12 Rilis Terbaru</span> */}
        </div>

        {posts.isLoading && <Loading />}

        {posts.isSuccess && (
          <>
            <div className="grid grid-flow-row grid-cols-1 gap-10 text-slate-600 md:grid-cols-3">
              <>
                {posts.data.map((p) => (
                  <ContentCard post={p} key={p.id} />
                ))}
              </>
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/all">
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

      <SearchSection />

      <Footer />
    </>
  );
};

export default Home;
