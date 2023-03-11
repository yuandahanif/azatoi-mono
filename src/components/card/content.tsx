import { type Post, type User } from "@prisma/client";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import quicksand from "~/fonts/quicksand";
import RichEditor from "../editor/editor";
import printToLocalDate from "~/libs/dateFormater";

const CardContainer = styled.div`
  position: relative;
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(0deg) scale(1);
    border: 2px solid rgb(252, 165, 165);
    /* background-color: ; */
    z-index: -1;
    border-radius: 0.375rem;
    transition-duration: 300ms;
  }

  &:hover::before {
    transform: rotate(3deg) scale(1.01);
  }
`;

interface Props {
  post: Post & {
    Creator: User;
  };
}

const ContentCard: React.FC<Props> = ({ post }) => {
  return (
    <CardContainer className="rounded-md border-2 border-red-300 bg-white p-3">
      <div className="relative mb-4 flex h-56 w-full justify-center">
        <Image
          className="object-cover object-center"
          src={post.thumbnail}
          alt={post.title}
          loading="lazy"
          fill
        />
      </div>

      <div className="flex justify-end">
        <span className="ml-auto text-sm">
          {post?.Creator.name ?? ""} | {printToLocalDate(post?.created_at)}
        </span>
      </div>

      <Link href={`/detail/${post.id}`}>
        <span
          className={` text-2xl font-semibold line-clamp-3 hover:underline ${quicksand.className}`}
        >
          {post.title}
        </span>
      </Link>
      <div></div>
    </CardContainer>
  );
};

export default ContentCard;
