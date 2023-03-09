import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Loading from "~/components/loading/loading";
import quicksand from "~/fonts/quicksand";

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
    <main
      className={twMerge(
        `mx-auto h-auto w-full max-w-screen-xl grow bg-white py-6 px-2 text-slate-800 ${quicksand.className}`,
        className
      )}
    >
      {children}
    </main>
  );
};
export default AdminLayout;
