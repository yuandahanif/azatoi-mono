import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import Loading from "~/components/loading/loading";
import quicksand from "~/fonts/quicksand";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ className, children }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.replace("/admin/signIn");
    },
  });

  if (status == "loading") {
    return (
      <main
        className={twMerge(
          `mx-auto h-auto w-full max-w-screen-xl grow bg-white py-6 px-2 text-slate-800 ${quicksand.className}`,
          className
        )}
      >
        <Loading />
      </main>
    );
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
