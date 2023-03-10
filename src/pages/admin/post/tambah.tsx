import { type NextPage } from "next";
import styled from "styled-components";
import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

import AdminLayout from "~/layouts/admin";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const Editor = dynamic(() => import("~/components/editor/editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const AdminIndex: NextPage = () => {
  const tags = api.tag.getAll.useQuery();
  const [links, setLinks] = useState([
    { id: "dontdelete", label: "", value: "" },
  ]);

  const tagsOptionMemo = useMemo(() => {
    if (tags.data == null) return [];
    return tags.data.map((t) => ({ label: t.name, value: t.id }));
  }, [tags.data]);

  const addLinks = () => {
    setLinks((s) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const id: string = uuidv4();
      return [...s, { id, label: "", value: "" }];
    });
  };

  const removeLinks = () => {
    setLinks((s) => {
      s.pop();
      return [...s];
    });
  };

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />

      <AdminLayout className="h-screen w-full bg-slate-300">
        <h1 className="text-4xl font-semibold text-slate-700">
          Buat Postingan
        </h1>

        <div className="w-full">
          <span className="text-lg font-medium">Deskripsi</span>
          <Editor />
        </div>

        <form className="mt-4 flex w-full flex-col gap-4">
          <label className="flex w-full flex-col">
            <span>Kategori:</span>
            <Select
              isMulti
              name="tags"
              options={tagsOptionMemo}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </label>

          <div>
            <h2 className="text-lg font-medium">Tautan</h2>

            <div className="flex w-full gap-4">
              <label className="flex w-1/3 flex-col ">
                <span>Label:</span>
                <input
                  type="text"
                  name="label"
                  autoComplete="link-label"
                  className="rounded-md border-none p-2 outline-none"
                />
              </label>

              <label className="flex w-2/3 flex-col">
                <span>Tatutan:</span>
                <input
                  type="text"
                  name="link"
                  autoComplete="link-linl"
                  className="rounded-md border-none p-2 outline-none"
                />
              </label>
            </div>
          </div>
        </form>
      </AdminLayout>
    </>
  );
};

export default AdminIndex;
