import { useEffect, useRef } from "react";

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
      className="relative flex h-[50vh] w-auto flex-col items-center justify-center overflow-hidden bg-[url('/assets/header.png')] bg-contain bg-top bg-right bg-no-repeat md:h-screen md:bg-cover md:bg-center"
    ></div>
  );
};

export default Hero;
