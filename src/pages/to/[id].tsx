import { link } from "fs/promises";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import SEOHead from "~/components/header/seoHeader";
import quicksand from "~/fonts/quicksand";
import { api } from "~/utils/api";

const AnimationContainer = styled.div`
  display: flex;
  align-items: center;

  & .text-animation {
    opacity: 0;
    transform: scale(0);
    transform-origin: bottom;
    animation-name: bounce;
    animation-duration: 2000ms;
    animation-delay: 1000ms;
    animation-direction: alternate-reverse;
  }

  & .image-animation {
    opacity: 0;
    transform: scale(0);
    transform-origin: center;
    animation-direction: alternate-reverse;
    animation-name: bounce;
    animation-duration: 3000ms;
  }

  @keyframes bounce {
    from {
      opacity: 0;
      transform: scale(0);
    }

    1% {
      opacity: 1;
    }

    80% {
      transform: scale(1);
      opacity: 1;
    }

    to {
    }
  }
`;

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
      const timeoout = setTimeout(() => {
        void router.replace(links.data.link);
      }, 2500);

      return () => clearTimeout(timeoout);
    }
  }, [links, router]);

  return (
    <>
      <SEOHead description="Tunggu bentar ya - Azatoi" />

      <div
        className={`relative flex h-screen w-full items-center justify-center bg-[#332041] text-4xl font-semibold text-white ${quicksand.className}`}
      >
        {/* <AnimationContainer>
          <div className="text-animation">
            <span className="text-xl">Tunggu bentar ya</span>
          </div>

          <div className="image-animation relative h-20 w-20">
          <Image
          src={"/assets/logo.png"}
              alt="logo"
              fill
              className="object-contain"
            />
            </div>
          </AnimationContainer> */}
        <div className="image-animation relative h-44 w-96">
          <Image
            src={"/assets/load.gif"}
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default Redirector;
