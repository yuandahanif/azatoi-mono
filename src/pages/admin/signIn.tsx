import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import SEOHead from "~/components/header/seoHeader";
import MainLayout from "~/layouts/main";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";

const AdminSignIn: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "authenticated") {
      void router.replace("/admin/");
    }
  }, [router, status]);

  return (
    <>
      <SEOHead   />

      <MainLayout className="h-screen w-full bg-slate-300">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <div className="relative h-96 w-96">
            <Image
              aria-label="Ssstt . . . ! ini tempat admin, kalian gaboleh kesini."
              className="object-contain"
              src={
                "https://media.tenor.com/T29yqKmoy14AAAAd/bocchi-trash-bocchi-the-rock.gif"
              }
              alt=""
              fill
            />
          </div>
          <button
            className="rounded-full bg-red-300/50 px-10 py-3 font-semibold text-white no-underline transition duration-300 hover:bg-red-300"
            onClick={() => void signIn()}
          >
            Masuk?
          </button>
        </div>
      </MainLayout>
    </>
  );
};

export default AdminSignIn;
