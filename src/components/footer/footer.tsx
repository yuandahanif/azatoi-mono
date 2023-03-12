const Footer = () => {
  return (
    <footer className="mt-auto bg-[#332041] p-8 text-white">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center">
        <span className="">Copyright Azatoi {new Date().getFullYear()}</span>
        <span className="text-xs">
          Dibuat oleh{" "}
          <a href="http://discordapp.com/users/378907976267726859" target={'_blank'} className="underline">
            yu me
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
