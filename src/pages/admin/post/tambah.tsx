import { type NextPage } from "next";
import styled from "styled-components";
import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";

import AdminLayout from "~/layouts/admin";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("~/components/editor/editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const AdminIndex: NextPage = () => {
  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />

      <AdminLayout className="h-screen w-full bg-slate-300">
        <div className="flex flex-col items-center justify-center gap-4 pt-6">
          <h1 className="text-4xl font-semibold text-slate-700">
            Buat Postingan
          </h1>
          <div className="w-full">
            <span className="text-lg font-medium">Deskripsi</span>
            <Editor />
          </div>
          <form className="w-full">
            <h2 className="text-lg font-medium">Tautan</h2>
            <div>
              <label>
                <input type="text" name="label" id="la" />
              </label>
            </div>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminIndex;
