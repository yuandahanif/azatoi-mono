import { twMerge } from "tailwind-merge";
import quicksand from "~/fonts/quicksand";

interface Props {
  className?: string;
  children: React.ReactNode;
}

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
