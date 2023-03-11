import { type NextPage } from "next";
import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";

import AdminLayout from "~/layouts/admin";
import { type FormEventHandler } from "react";
import { useRouter } from "next/router";

const AdminTagTambah: NextPage = () => {
  const router = useRouter();
  const postMutation = api.tag.create.useMutation();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as typeof e.target & {
      kategori: { value: string };
    };

    const data = {
      name: String(form["kategori"]?.value),
    };

    void postMutation
      .mutateAsync(data)
      .then(() => {
        alert("Berhasil");
        void router.replace("/admin/tag");
      })
      .catch((e: unknown) => {
        console.error(e);
        alert("error");
      });
  };

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />

      <AdminLayout className="w-full">
        <h1 className="text-4xl font-semibold text-slate-700">Buat Kategori</h1>

        <form onSubmit={onSubmit} className="mt-4 flex w-full flex-col gap-4">
          <label className="flex w-full flex-col ">
            <span>Kategori:</span>
            <input
              required
              type="text"
              name={`kategori`}
              autoComplete="category"
              className="rounded-md border-none p-2 outline-none"
            />
          </label>

          <div className="mt-4 flex justify-center border-t border-slate-700 pt-5">
            <button className="text-xl font-medium">Tambah</button>
          </div>
        </form>
      </AdminLayout>
    </>
  );
};

export default AdminTagTambah;
