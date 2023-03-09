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

const MoreButton = styled.button``;

const AdminIndex: NextPage = () => {

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />

      <AdminLayout className="h-screen w-full bg-slate-300">
        <div className="flex flex-col items-center justify-center gap-4"></div>
      </AdminLayout>
    </>
  );
};

export default AdminIndex;
