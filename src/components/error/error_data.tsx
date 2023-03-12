import Image from "next/image";

const ErrorData = () => (
  <div className="flex flex-col items-center justify-center gap-3">
    <div className="relative h-52 w-full">
      <Image
        className="object-contain"
        src={"/assets/sad_bochi.jpg"}
        alt={"sad bocchi"}
        fill
      />
    </div>
    <span>yah data yang kamu cari ga ada T_T</span>
  </div>
);

export default ErrorData;
