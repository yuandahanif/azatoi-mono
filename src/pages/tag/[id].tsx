import { type NextPage } from "next";
import styled from "styled-components";
import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";
import MainLayout from "~/layouts/main";
import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";
import Link from "next/link";
import Loading from "~/components/loading/loading";
import ContentCard from "~/components/card/content";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchSection from "~/components/search/search";

const MoreButton = styled.button``;

const ITEM_COUNT = 12;

const All: NextPage = () => {
  const router = useRouter();
  const { page, id } = router.query;
  const [skipPage, setSkipPage] = useState<number | undefined>(undefined);

  const posts = api.tag.getPostsByTagId.useQuery(
    {
      id: String(id),
      take: 12,
      skip: skipPage ? skipPage * ITEM_COUNT : undefined,
    },
    { enabled: id != null }
  );

  const tag = api.tag.getById.useQuery(
    {
      id: String(id),
    },
    { enabled: id != null }
  );

  useEffect(() => {
    if (page) {
      try {
        setSkipPage(Number(page));
      } catch (error) {
        setSkipPage(0);
      }
    } else {
      setSkipPage(0);
    }
  }, [page]);

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />
      <Header />

      <MainLayout className="">
        <div
          className={`mb-6 mt-10 flex w-full flex-col items-center justify-center gap-y-2 text-slate-800`}
        >
          <span className="text-4xl font-semibold">Kategori</span>
          {tag.isSuccess && <span>{tag.data.name}</span>}
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

            {posts.data.length == ITEM_COUNT && (
              <div className="mt-8 flex justify-center">
                <Link href={`/all?page=${skipPage ? skipPage + 1 : 1}`}>
                  <MoreButton
                    type="button"
                    className="rounded-md border border-slate-500 bg-white p-3"
                  >
                    Tampilkan lainnya
                  </MoreButton>
                </Link>
              </div>
            )}
          </>
        )}
      </MainLayout>

      <SearchSection />
      <Footer />
    </>
  );
};

export default All;
