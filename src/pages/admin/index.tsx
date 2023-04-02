import { type NextPage } from "next";
import SEOHead from "~/components/header/seoHeader";
import AdminLayout from "~/layouts/admin";

const AdminIndex: NextPage = () => {
  return (
    <>
      <SEOHead   />

      <AdminLayout className="w-full">
        <div className="flex flex-col items-center justify-center gap-4"></div>
      </AdminLayout>
    </>
  );
};

export default AdminIndex;
