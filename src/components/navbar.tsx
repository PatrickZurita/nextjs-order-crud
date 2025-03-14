import Link from "next/link";
import { ModeToggle } from "./theme-toggle-button";

function Navbar() {
  return (
    <nav className="flex justify-between py-5">
      <Link href="/">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Orders App
        </h1>
      </Link>

      <div className="flex gap-x-2 items-center">
        
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
