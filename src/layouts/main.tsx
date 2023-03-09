import { Quicksand } from "next/font/google";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const MainLayout: React.FC<Props> = ({ className, children }) => (
  <main
    className={twMerge(
      `mx-auto h-auto w-full max-w-screen-xl grow bg-white py-6 px-2 text-slate-800 ${quicksand.className}`,
      className
    )}
  >
    {children}
  </main>
);
export default MainLayout;
