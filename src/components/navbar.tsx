import Link from "next/link";

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          ChatSnap
        </Link>
        <nav className="flex gap-6">
          <Link href="/login" className="hover:text-primary transition-colors">
            Login
          </Link>
          <Link
            href="/register"
            className="hover:text-primary transition-colors"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
