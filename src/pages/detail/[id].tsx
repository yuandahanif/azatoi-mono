import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import SEOHead from "~/components/header/seoHeader";
import Loading from "~/components/loading/loading";
import MainLayout from "~/layouts/main";
import { api } from "~/utils/api";
import styled from "styled-components";
import React from "react";
import Link from "next/link";

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="w-full rounded-sm bg-slate-300 p-3 text-center font-semibold text-slate-600">
    {children}
  </div>
);

const Detail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const post = api.post.getbyId.useQuery(
    { id: String(id) },
    { enabled: id != null }
  );
  const popularPost = api.post.getPopular.useQuery();
  const tagsWithCount = api.tag.getAllWithCount.useQuery();

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />
      <Header />

      <MainLayout className="flex min-h-screen flex-col md:flex-row">
        <article className="w-full">
          {post.isLoading && <Loading />}
          {post.isSuccess && (
            <>
              <h1 className="text-3xl font-semibold">{post.data?.title}</h1>
              <div className="mt-2 flex gap-x-8">
                <span>
                  Diposting oleh - {post.data.Creator.name} | pada{" "}
                  {post.data.created_at.toLocaleString("id-id", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span></span>
              </div>
              <div>
                <div className="relative my-8 flex h-96 w-full justify-center overflow-hidden rounded-md bg-red-300">
                  <Image
                    className="object-cover object-center"
                    src={post.data.thumbnail}
                    alt={post.data.title}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 24rem,
                    24rem"
                  />
                </div>

                <div>
                  <p>{post.data.content}</p>
                </div>

                <div className="mt-4">
                  <span>Kategori</span>
                  <ul className="flex flex-wrap gap-2">
                    {post.data.Tags.map((t) => (
                      <li key={t.tag_id}>
                        <Link href={`/tag/${t.tag_id}`}>
                          <button
                            type="button"
                            className="rounded-sm bg-slate-200 p-1 px-2 duration-300 hover:bg-sky-600 hover:text-white"
                          >
                            {t.Tag.name}
                          </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </article>

        <aside className="w-full space-y-6 pt-8 md:sticky md:top-24 md:h-fit md:max-w-md md:p-3">
          <div>
            <SectionTitle>
              <h2>Popular Posts</h2>
            </SectionTitle>

            {popularPost.isLoading && <Loading />}
            {popularPost.isError && <div>error</div>}

            {popularPost.isSuccess && (
              <>
                <article className="flex flex-col gap-y-4 pt-4">
                  {popularPost.data.map((p) => (
                    <div key={p.id} className="flex gap-x-3">
                      <div className="relative h-20 w-20 min-w-[5rem] overflow-hidden rounded-sm">
                        <Image
                          src={p.thumbnail}
                          alt={p.title}
                          loading="lazy"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <Link href={`/detail/${p.id}`}>
                          <span className="w-fit font-semibold line-clamp-3 hover:underline">
                            {p.title}
                          </span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </article>
              </>
            )}
          </div>

          <div>
            <SectionTitle>
              <h2>Donasi</h2>
            </SectionTitle>

            <div>Nanti di isi pake iframe dari Trakteer</div>
          </div>

          <div>
            <SectionTitle>
              <h2>Kategori</h2>
            </SectionTitle>

            <div className="flex flex-wrap gap-3 pt-4">
              {tagsWithCount.isSuccess && (
                <>
                  {tagsWithCount.data.map((t) => (
                    <Link key={t.id} href={`/tag/${t.id}`}>
                      <button
                        type="button"
                        className="group rounded-sm bg-slate-200 p-1 px-2 duration-300 hover:bg-sky-600 hover:text-white"
                        key={t.id}
                      >
                        <span>{t.name}</span>

                        <span className="ml-2 flex-initial bg-slate-300 px-1 group-hover:bg-sky-800">
                          {t._count.Posts}
                        </span>
                      </button>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </aside>
      </MainLayout>

      <Footer />
    </>
  );
};

export default Detail;
