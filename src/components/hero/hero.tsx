import { Quicksand } from "next/font/google";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const H1 = styled.h1`
  position: relative;

  &::before {
    z-index: -1;
    position: absolute;
    color: red;
    rotate: 4deg;
    content: attr(aria-label);
  }
`;

const Span = styled.h1`
  text-shadow: 1px 1px #ff0000;
`;

const Blob = styled.div`
  width: 300px;
  height: 300px;
  transform-origin: top left;
  animation: spin 5s infinite forwards;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @keyframes spin {
    from {
      scale: 1;
      rotate: 0deg;
    }
    50% {
      scale: 1.1;
    }
    to {
      scale: 1;
      rotate: 360deg;
    }
  }
`;

const Hero = () => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const blurRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const obj = blurRef.current as HTMLDivElement;
    const mouseMoveHandler = (event: MouseEvent) => {
      if (obj) {
        obj.animate(
          [{ top: `${event.clientY}px`, left: `${event.clientX}px` }],
          { duration: 3000, fill: "forwards" }
        );
      }
    };

    container?.addEventListener("mousemove", mouseMoveHandler, true);
    return () => {
      container?.removeEventListener("mousemove", mouseMoveHandler, true);
      console.log("event released");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative flex h-screen w-auto flex-col items-center justify-center bg-[url('https://blogger.googleusercontent.com/img/a/AVvXsEjpejYXmamsABBcLX25LG4YT2PBM1z7z3TdkkRUzx_uTOg5V7REWWDHjdBM7JrkZ4vKvFjc4fyiWqH1GRXu_Ba7THMVeDBBvtBIVOThcs_ANGtHH-I16rxYFSJzoUqCVvWrXnrxtSnOVtmYgbm3hBqOiil8KEFIZJ6e7ffXGIKGs2uO28k3FeBuYEhdhg=s1408')] bg-cover bg-center bg-no-repeat"
    >
      <Blob
        ref={blurRef}
        className="rounded-full bg-gradient-to-r from-red-300 to-sky-300 blur-xl"
      />
      <div className="absolute top-0 left-0 z-20 h-full w-full backdrop-blur-md" />

      <div
        className={`z-20 flex flex-col items-center justify-center text-white ${quicksand.className}`}
      >
        <H1 className=" text-7xl font-bold md:text-9xl" aria-label="AZATOI">
          AZATOI
        </H1>
        <Span className="text-xl md:text-2xl ">Fansub Tanjakan 48</Span>
      </div>
    </div>
  );
};

export default Hero;
