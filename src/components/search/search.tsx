import Image from "next/image";
import quicksand from "~/fonts/quicksand";

const SearchSection = () => {
  return (
    <div
      className={`flex h-96 items-center justify-center gap-8 bg-[#332041] ${quicksand.className}`}
    >
      <div>
        <form className="flex flex-col items-center gap-y-3">
          <label
            htmlFor="search-input"
            className="text-xl font-semibold text-[#fff]"
          >
            Nyari rilisan ya?
          </label>

          <input
            type={"text"}
            id="search-input"
            className="rounded-md border-none p-3 outline-none md:w-96"
            autoComplete="series"
            placeholder="Masukkan Judul disini"
          />

          <button
            type="submit"
            className="w-fit rounded-md bg-sky-500 p-2 px-8 text-white"
          >
            cari
          </button>
        </form>
      </div>

      <div className="relative h-72 w-72">
        <Image
          src={"/assets/asukalayer1.png"}
          alt="figure cari"
          className="object-contain"
          fill
        />
      </div>
    </div>
  );
};

export default SearchSection;
