import { type Post, type User } from "@prisma/client";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";

const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const CardContainer = styled.div``;

interface Props {
  post: Post & {
    Creator: User;
  };
}

const ContentCard: React.FC<Props> = ({ post }) => {
  const imgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const img = imgRef.current;

    const mouseOverHandler = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLDivElement;
      //   if (target) {
      //     target.animate([{ rotate: `9deg` }], {
      //       duration: 400,
      //       fill: "both",
      //     });
      //   }
    };

    img?.addEventListener("mouseover", mouseOverHandler, true);
    return () => {
      img?.removeEventListener("mouseover", mouseOverHandler, true);
    };
  }, []);

  return (
    <CardContainer className="rounded-md border-2 border-slate-500 p-3 border-red-300">
      <div
        ref={imgRef}
        className="relative mb-4 flex h-56 w-full justify-center bg-red-300"
      >
        <Image
          className="object-cover object-center"
          src={post.thumbnail}
          alt={post.title}
          loading="lazy"
          fill
        />
      </div>

      <div className="flex justify-end">
        <span className="ml-auto text-sm">oleh {post?.Creator.name ?? ""}</span>
      </div>

      <Link href={`/detail/${post.id}`}>
        <span
          className={` text-2xl font-semibold line-clamp-3 hover:underline ${quicksand.className}`}
        >
          {post.title}
        </span>
      </Link>
      <div>
        <p className="line-clamp-3">{post.content}</p>
      </div>
    </CardContainer>
  );
};

export default ContentCard;
