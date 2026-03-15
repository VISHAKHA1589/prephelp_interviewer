import { checkUser } from "@/lib/checkUser";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-10 py-3 border-b border-white/7 backdrop-blur-xl">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Prept Logo"
          width={100}
          height={100}
          className="h-11 w-auto"
        />
      </Link>

      {/* <ul className="hidden md:flex items-center gap-8 list-none text-sm text-stone-400">
        {["Features", "Pricing"].map((l) => (
          <li key={l}>
            <a
              href={`#${l}`}
              className="hover:text-stone-100 transition-colors"
            >
              {l}
            </a>
          </li>
        ))}
      </ul> */}

      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost">Sign in</Button>
          </SignInButton>
          <SignInButton mode="modal">
            <Button variant="gold">Get started →</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
