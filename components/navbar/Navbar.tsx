import Link from "next/link";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Logo
      </Link>
      <NavLinks />
    </nav>
  );
};

export default Navbar;
