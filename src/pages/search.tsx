import { type NextPage } from "next";
import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";
import MainLayout from "~/layouts/main";
import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";
import Loading from "~/components/loading/loading";
import ContentCard from "~/components/card/content";

import { useRouter } from "next/router";
import SearchSection from "~/components/search/search";

const All: NextPage = () => {
  const router = useRouter();
  const { title } = router.query;
  const posts = api.post.gdtByTitle.useQuery(
    {
      title: String(title),
    },
    {
      enabled: title != null,
    }
  );

  return (
    <>
      <SEOHead   />
      <Header />

      <SearchSection />

      <MainLayout className="flex flex-col min-h-[50vh]">
        <div
          className={`mb-6 mt-10 flex w-full flex-col items-center justify-center text-slate-800`}
        >
          <span className="text-4xl font-semibold">Yang kamu cari</span>
        </div>

        {posts.isLoading && <Loading />}

        {posts.isSuccess && (
          <>
            <div className="h-auto grid grid-flow-row grid-cols-1 gap-10 text-slate-600 md:grid-cols-3">
              <>
                {posts.data.map((p) => (
                  <ContentCard post={p} key={p.id} />
                ))}
              </>
            </div>
          </>
        )}
      </MainLayout>

      <Footer />
    </>
  );
};

export default All;
