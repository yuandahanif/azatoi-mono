import { GetStaticProps, type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import SEOHead from "~/components/header/seoHeader";
import Loading from "~/components/loading/loading";
import MainLayout from "~/layouts/main";
import { api } from "~/utils/api";
import React from "react";
import Link from "next/link";
import printToLocalDate from "~/libs/dateFormater";
import RichEditor from "~/components/editor/editor";
import ErrorData from "~/components/error/error_data";

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
          {post.isError && <ErrorData />}
          {post.isSuccess && (
            <>
              <h1 className="text-3xl font-semibold">{post.data?.title}</h1>
              <div className="mt-2 flex gap-x-8">
                <span>
                  Diposting oleh - {post.data.Creator.name} | pada{" "}
                  {printToLocalDate(post.data.created_at)}
                </span>
              </div>
              <div>
                <div className="relative my-8 flex h-96 w-full justify-center overflow-hidden rounded-md">
                  <Image
                    className="object-contain object-center"
                    src={post.data.thumbnail}
                    alt={post.data.title}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 24rem,
                    24rem"
                  />
                </div>

                <div>
                  <RichEditor readonly defaultValue={post.data.content} />
                </div>

                <div className="mt-4">
                  <h2 className="text-lg font-semibold">Tautan:</h2>

                  <div className="flex gap-2">
                    {post.data.Links.map((l) => (
                      <Link
                        key={l.id}
                        href={`/to/${l.id}`}
                        className="flex items-center gap-2 rounded-md bg-[#E98EAD] px-3 py-1 text-white duration-200 hover:bg-opacity-90"
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>
                        <span>{l.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <span>Kategori</span>
                  <ul className="flex flex-wrap gap-2">
                    {post.data.Tags.map((t) => (
                      <li key={t.tag_id}>
                        <Link href={`/tag/${t.tag_id}`}>
                          <button
                            type="button"
                            className="rounded-sm bg-slate-200 p-1 px-2 duration-300 hover:bg-[#E98EAD] hover:text-white"
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
              <h2>Donasi</h2>
            </SectionTitle>

            <div className="flex flex-col items-center justify-center gap-y-1 pt-4">
              <a
                href="https://trakteer.id/azatoionline"
                target="_blank"
                className="relative inline-block h-10 w-40"
              >
                <Image
                  fill
                  id="wse-buttons-preview"
                  src="https://cdn.trakteer.id/images/embed/trbtn-red-1.png"
                  alt="Trakteer Saya"
                  className="object-contain"
                />
              </a>

              <iframe
                src="https://stream.trakteer.id/top-supporter-default.html?ts_font=Play&ts_count=10&ts_theme=default&ts_1_clr2=rgba%28255%2C+137%2C+214%2C+1%29&ts_1_clr3=rgba%28255%2C+221%2C+240%2C+1%29&ts_1_clr4=rgba%28255%2C+241%2C+249%2C+1%29&ts_sortby=unit&ts_interval=30&ts_customtitle=Top+Azatoi+Supporter&ts_customsubtitle=-&key=trstream-qQUWOUmRp37cRZgBng6q"
                className="w-full min-h-[20em]"
              ></iframe>
            </div>
          </div>

          <div>
            <SectionTitle>
              <h2>Populer</h2>
            </SectionTitle>

            {popularPost.isLoading && <Loading />}

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
              <h2>Kategori</h2>
            </SectionTitle>

            <div className="flex flex-wrap gap-3 pt-4">
              {tagsWithCount.isSuccess && (
                <>
                  {tagsWithCount.data.map((t) => (
                    <Link key={t.id} href={`/tag/${t.id}`}>
                      <button
                        type="button"
                        className="group rounded-sm bg-slate-200 p-1 px-2 duration-300 hover:bg-[#E98EAD] hover:text-white"
                        key={t.id}
                      >
                        <span>{t.name}</span>

                        <span className="ml-2 flex-initial bg-slate-300 px-1 hover:bg-opacity-60 group-hover:bg-[#E98EAD]">
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
