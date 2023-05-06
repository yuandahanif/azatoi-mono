const SearchSection = () => {
  return (
    <div
      className={`flex h-96 items-center justify-center gap-8 bg-[#332041]  bg-[url('/assets/search.png')] bg-cover `}
    >
      <div>
        <form
          className="flex flex-col items-center gap-y-3"
          method="'GET"
          action="/search"
        >
          <label
            htmlFor="search-input"
            className="text-xl font-semibold text-[#fff]"
          >
            Nyari siapa ya?
          </label>

          <input
            type={"text"}
            name="title"
            id="search-input"
            className="rounded-md border-none p-3 outline-none md:w-96"
            autoComplete="series"
            placeholder="Masukkan Judul disini"
          />

          <button
            type="submit"
            className="w-fit rounded-md bg-[#E98EAD] p-2 px-8 text-white"
          >
            cari
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchSection;
