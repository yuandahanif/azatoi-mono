/* eslint-disable react/jsx-key */
import { type NextPage } from "next";
import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";
import Link from "next/link";
import AdminLayout from "~/layouts/admin";
import { type Column } from "react-table";
import { useMemo } from "react";
import { type Tag } from "@prisma/client";
import Table from "~/components/table/table";

const AdminTabIndex: NextPage = () => {
  const posts = api.tag.getAllWithCount.useQuery();

  const data = useMemo(() => {
    if (!posts.data) return [];
    return posts.data;
  }, [posts.data]);

  const columns = useMemo<
    Column<
      Tag & {
        _count: {
          Posts: number;
        };
      }
    >[]
  >(
    () => [
      {
        Header: "Nama Kategori",
        accessor: "name",
      },
      {
        Header: "Jumlah Postingan",
        id: "count",
        accessor: "id",
        Cell: (prop) => <span>{prop.row.original._count.Posts}</span>,
      },
      {
        Header: "Aksi",
        accessor: "id",
        Cell: (prop) => <Link href={`/admin/post/${prop.value}`}>Hapus</Link>,
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
            <Link href={`/admin/tag/tambah`}>Tambah</Link>
          </div>
        </div>

        <div className="mt-5 flex flex-col">
          <Table columns={columns} data={data} />
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminTabIndex;
