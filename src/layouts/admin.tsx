import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Loading from "~/components/loading/loading";
import quicksand from "~/fonts/quicksand";

const NAV_MENU = [
  { id: "1", href: "/admin/", label: "Dashboard" },
  { id: "2", href: "/admin/post", label: "Posting" },
  { id: "3", href: "/admin/tag", label: "Kategori" },
  { id: "4", href: "/admin/setting", label: "Pengaturan" },
];

interface Props {
  className?: string;
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ className, children }) => {
  const router = useRouter();

  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.replace("/admin/signIn");
    },
  });

  const redirectNonAdmin = useCallback(() => {
    void router.replace("/admin/not");
  }, [router]);

  useEffect(() => {
    if (status == "authenticated") {
      const emailSplit = data.user.email?.split("@");
      if (!emailSplit) {
        return () => redirectNonAdmin();
      }

      if (emailSplit[1] != "admin.com") {
        return () => redirectNonAdmin();
      }
    }
  }, [data?.user.email, redirectNonAdmin, status]);

  if (status == "loading") {
    return <Loading />;
  }

  return (
    <>
      <header className="z-50 sticky top-0 mx-auto flex w-full max-w-screen-xl justify-between bg-white p-3 shadow-md">
        <div className="flex">
          <nav>
            <ul className="flex gap-2 h-full items-center justify-center">
              {NAV_MENU.map((m) => (
                <li key={m.id} className="h-full flex items-center p-2 pr-4">
                  <Link href={m.href}>{m.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex">
          <div className="relative h-14 w-14 overflow-hidden rounded-full">
            <Image
              className="object-contain"
              src={
                data.user.image ??
                "https://dafunda.com/wp-content/uploads/2022/12/Alasan-Kenapa-Bocchi-The-Rock-Jadi-Anime-Komedi-Terbaik.jpg"
              }
              alt="profile"
              fill
            />
          </div>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-slate-700 no-underline transition hover:bg-white/20"
            onClick={() => void signOut()}
          >
            keluar
          </button>
        </div>
      </header>

      <main
        className={twMerge(
          `mx-auto h-auto relative overflow-auto w-full max-w-screen-xl grow bg-white py-3 px-6 text-slate-800 ${quicksand.className}`,
          className
        )}
      >
        {children}
      </main>
    </>
  );
};
export default AdminLayout;
