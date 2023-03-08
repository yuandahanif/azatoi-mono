import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ className, children }) => (
  <main
    className={twMerge(
      "mx-auto h-auto w-full max-w-screen-xl grow bg-white py-6 px-2",
      className
    )}
  >
    {children}
  </main>
);
export default MainLayout;
