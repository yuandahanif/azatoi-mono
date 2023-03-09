import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
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
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />

      <AdminLayout>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
            {secretMessage && <span> - {secretMessage}</span>}
          </p>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </AdminLayout>

      <Footer />
    </>
  );
};

export default AdminIndex;
