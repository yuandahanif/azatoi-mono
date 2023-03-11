import { type NextPage } from "next";
import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";
import Link from "next/link";
import Loading from "~/components/loading/loading";
import Image from "next/image";
import AdminLayout from "~/layouts/admin";
import { useRouter } from "next/router";
import printToLocalDate from "~/libs/dateFormater";
import RichEditor from "~/components/editor/editor";

const AdminIndex: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const post = api.post.getbyId.useQuery(
    { id: String(id) },
    { enabled: id != null }
  );

  const postDeleteMutation = api.post.deleteById.useMutation();

  const deletePost = () => {
    if (id && confirm("hapus ?")) {
      console.log("delete");
      postDeleteMutation
        .mutateAsync({ id: String(id) })
        .then(() => {
          alert("berhasil");
          void router.replace("/admin/post");
        })
        .catch((e: unknown) => {
          console.error(e);
          alert("gagal");
        });
    }
  };

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />

      <AdminLayout className="w-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <article className="w-full">
            {post.isLoading && <Loading />}
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
                  <div className="relative my-8 flex h-96 w-full justify-center overflow-hidden rounded-md ">
                    <Image
                      className="object-contain object-center"
                      src={post.data.thumbnail}
                      alt={post.data.title}
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 100%,
                    24rem"
                    />
                  </div>

                  <div>
                    <RichEditor readonly defaultValue={post.data.content} />
                  </div>

                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">Tautan:</h2>

                    <div className="flex flex-col">
                      {post.data.Links.map((l) => (
                        <Link
                          key={l.id}
                          href={`/to/${l.id}`}
                          className="underline"
                          target="_blank"
                        >
                          {l.name}
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

            <div className="mt-4 flex items-center justify-center border-t border-slate-700 pt-5">
              <button className="text-xl font-medium" onClick={deletePost}>
                Hapus
              </button>
            </div>
          </article>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminIndex;
