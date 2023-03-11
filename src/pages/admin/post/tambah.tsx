import { type NextPage } from "next";
import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

import AdminLayout from "~/layouts/admin";
import dynamic from "next/dynamic";
import { type FormEventHandler, useMemo, useState } from "react";
import { useRouter } from "next/router";

const Editor = dynamic(() => import("~/components/editor/editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const AdminPostTambah: NextPage = () => {
  const router = useRouter();
  const tags = api.tag.getAll.useQuery();
  const postMutation = api.post.create.useMutation();
  const [links, setLinks] = useState(["dontdelete"]);
  const [editorValue, setEditorValue] = useState<string | null>(null);

  const tagsOptionMemo = useMemo(() => {
    if (tags.data == null) return [];
    return tags.data.map((t) => ({ label: t.name, value: t.id }));
  }, [tags.data]);

  const addLinks = () => {
    setLinks((s) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const id: string = uuidv4();
      return [...s, id];
    });
  };

  const removeLinks = (id: string) => {
    setLinks((s) => {
      return [...s.filter((l) => l != id)];
    });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as typeof e.target & {
      title: { value: string };
      thumbanil: { value: string };
      tags: { value: string }[] | HTMLInputElement;
      [key: string]: { value: string } | { value: string }[] | HTMLInputElement;
    };

    let tags: string[] = [];
    if (form.tags instanceof HTMLInputElement) {
      tags = [form.tags?.value];
    } else {
      form.tags.forEach((t) => tags.push(t.value));
    }

    if (tags.length == 0) {
      return alert("Kategori harus di isi.");
    }

    const linkdata: { label: string; link: string }[] = [];
    links.forEach((l) =>
      linkdata.push({
        label: (form[`label-${l}`] as { value: string }).value,
        link: (form[`link-${l}`] as { value: string }).value,
      })
    );

    const data = {
      title: String(form["title"]?.value),
      categories: tags,
      description: editorValue ?? "",
      links: linkdata,
      thumbnail: String(form["thumbanil"]?.value),
    };

    console.dir(form.tags);
    console.dir(data);

    postMutation
      .mutateAsync(data)
      .then(() => {
        alert("Berhasil");
        void router.replace("/admin/post");
      })
      .catch((e: unknown) => {
        console.error(e);

        alert("gagal");
      });
  };

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />

      <AdminLayout className="w-full">
        <h1 className="text-4xl font-semibold text-slate-700">
          Buat Postingan
        </h1>

        <div className="w-full">
          <span className="text-lg font-medium">Deskripsi</span>
          <Editor setValue={(e) => setEditorValue(e)} />
        </div>

        <form onSubmit={onSubmit} className="mt-4 flex w-full flex-col gap-4">
          <label className="flex w-full flex-col ">
            <span>Judul:</span>
            <input
              required
              type="text"
              name={`title`}
              autoComplete="link-label"
              className="rounded-md border-none p-2 outline-none"
            />
          </label>

          <label className="flex w-full flex-col ">
            <span>Thumbnail:</span>
            <input
              type="url"
              required
              name={`thumbanil`}
              autoComplete="link-label"
              className="rounded-md border-none p-2 outline-none"
            />
          </label>

          <label className="flex w-full flex-col">
            <span>Kategori:</span>
            <Select
              isMulti
              required
              name="tags"
              options={tagsOptionMemo}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </label>

          <div>
            <h2 className="text-lg font-medium">Tautan</h2>

            <div className="flex flex-col gap-2">
              {links.map((l, i) => (
                <div
                  key={l}
                  className="flex w-full items-center justify-center gap-4"
                >
                  <label className="flex w-1/3 flex-col ">
                    <span>Label:</span>
                    <input
                      type="text"
                      name={`label-${l}`}
                      autoComplete="link-label"
                      className="rounded-md border-none p-2 outline-none"
                    />
                  </label>

                  <label className="flex w-full flex-col">
                    <span>Tatutan:</span>
                    <input
                      type="url"
                      name={`link-${l}`}
                      autoComplete="link-linl"
                      className="rounded-md border-none p-2 outline-none"
                    />
                  </label>
                  {i > 0 && (
                    <button
                      type="button"
                      className="my-auto"
                      onClick={() => removeLinks(l)}
                    >
                      Hapus
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-1">
              {
                <button type="button" onClick={addLinks}>
                  + Tautan
                </button>
              }
            </div>
          </div>

          <div className="mt-4 flex justify-center border-t border-slate-700 pt-5">
            <button className="text-xl font-medium">Tambah</button>
          </div>
        </form>
      </AdminLayout>
    </>
  );
};

export default AdminPostTambah;
