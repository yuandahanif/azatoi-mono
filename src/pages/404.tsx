import Image from "next/image";
import Link from "next/link";

const Custom404 = () => (
  <div className="flex h-screen flex-col items-center justify-center bg-red-300">
    <span className="text-9xl">404</span>

    <div className="relative my-8 h-96 w-full">
      <Image
        src={"https://media.tenor.com/AfMj1IQE0pMAAAAC/bocchi-the-rock.gif"}
        alt={"Bochi kejang-kejang"}
        className="object-contain"
        fill
      />
    </div>
    <span className="text-xl">
      &quot;Bochi ga nemu halaman yang kamu cari!&quot;
    </span>

    <Link className="hover:underline" href={"/"}>
      <span>kembali ke Beranda!</span>
    </Link>
  </div>
);

export default Custom404;
