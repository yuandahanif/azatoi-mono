import { link } from "fs/promises";
import { useRouter } from "next/router";
import { useEffect } from "react";
import quicksand from "~/fonts/quicksand";
import { api } from "~/utils/api";

const Redirector = () => {
  const router = useRouter();
  const { id } = router.query;

  const postMutation = api.post.addViewCount.useMutation();
  const links = api.link.getbyId.useQuery(
    { id: String(id) },
    {
      enabled: id != null,
      onSuccess(data) {
        postMutation.mutate({ id: data.post_id, amount: 1 });
      },
    }
  );

  useEffect(() => {
    if (links.isSuccess) {
      setTimeout(() => {
        void router.replace(links.data.link);
      }, 3000);
    }
  }, [links, router]);

  return (
    <div
      className={`flex h-screen w-full items-center justify-center bg-[#332041] text-4xl font-semibold text-white ${quicksand.className}`}
    >
      Mohon tunggu
    </div>
  );
};

export default Redirector;
