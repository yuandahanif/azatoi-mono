import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ className, children }) => (
  <main className={twMerge("", className)}>{children}</main>
);
export default MainLayout;
