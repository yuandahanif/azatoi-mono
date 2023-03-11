/* eslint-disable react/jsx-key */
import { type NextPage } from "next";
import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";
import Link from "next/link";
import AdminLayout from "~/layouts/admin";
import { type Column, useTable } from "react-table";
import { useMemo } from "react";
import { type Post, type User } from "@prisma/client";
import printToLocalDate from "~/libs/dateFormater";
import Table from "~/components/table/table";

const AdminPostIndex: NextPage = () => {
  const posts = api.post.getAll.useQuery();

  const data = useMemo(() => {
    if (!posts.data) return [];
    return posts.data;
  }, [posts.data]);

  const columns = useMemo<
    Column<
      Post & {
        Creator: User;
      }
    >[]
  >(
    () => [
      {
        Header: "Judul",
        accessor: "title",
      },
      {
        Header: "Pembuat",
        id: "creator",
        accessor: "Creator",
        Cell: (prop) => <span>{prop.value.name}</span>,
      },
      {
        Header: "Tanggal",
        accessor: "created_at",
        Cell: (prop) => <span>{printToLocalDate(prop.value)}</span>,
      },
      {
        Header: "Aksi",
        accessor: "id",
        Cell: (prop) => <Link href={`/admin/post/${prop.value}`}>Detail</Link>,
      },
    ],
    []
  );

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />

      <AdminLayout className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Posting</h1>
          <div>
            <Link href={`/admin/post/tambah`}>Tambah</Link>
          </div>
        </div>

        <div className="mt-5 flex flex-col">
          <Table columns={columns} data={data} />
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminPostIndex;
