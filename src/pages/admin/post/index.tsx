/* eslint-disable react/jsx-key */
import { type NextPage } from "next";
import styled from "styled-components";
import { api } from "~/utils/api";
import SEOHead from "~/components/header/seoHeader";
import MainLayout from "~/layouts/main";
import Header from "~/components/header/header";
import Hero from "~/components/hero/hero";
import Footer from "~/components/footer/footer";
import Link from "next/link";
import Loading from "~/components/loading/loading";
import ContentCard from "~/components/card/content";
import Image from "next/image";
import quicksand from "~/fonts/quicksand";
import AdminLayout from "~/layouts/admin";
import { type Column, useTable } from "react-table";
import { useMemo } from "react";
import { type Post, type User } from "@prisma/client";
import printToLocalDate from "~/libs/dateFormater";

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />

      <AdminLayout className="h-screen w-full bg-slate-300">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Posting</h1>
          <div>
            <Link href={`/admin/post/tambah`}>Tambah</Link>
          </div>
        </div>

        <div className="mt-5 flex flex-col">
          <table {...getTableProps()} className="">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 3px red",
                        background: "aliceblue",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "10px",
                            border: "solid 1px gray",
                            background: "papayawhip",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminPostIndex;
