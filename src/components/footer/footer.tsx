const Footer = () => {
  return (
    <footer className="mt-auto bg-black p-8 text-white">
      <div className="mx-auto flex max-w-screen-xl justify-center">
        <span>Copyright Azatoi {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
