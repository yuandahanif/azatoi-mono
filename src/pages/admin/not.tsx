import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import SEOHead from "~/components/header/seoHeader";
import MainLayout from "~/layouts/main";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";

const AdminNot: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "authenticated") {
      void signOut();
    }
  }, [router, status]);

  return (
    <>
      <SEOHead description="Tujuan pertama buat nyari Fansub - Azatoi" />

      <MainLayout className="h-screen w-full bg-slate-300">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <div className="relative h-96 w-96">
            <Image
              aria-label="Ssstt . . . ! ini tempat admin, kalian gaboleh kesini."
              className="object-contain"
              src={
                "https://media.tenor.com/KVFqRA1S1NoAAAAd/bocchi-the-rock-bocchi.gif"
              }
              alt=""
              fill
            />
          </div>
          <span>halo admin?</span>
        </div>
      </MainLayout>
    </>
  );
};

export default AdminNot;
