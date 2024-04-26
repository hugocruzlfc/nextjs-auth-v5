// import { auth, signIn } from "@/auth";
// import Link from "next/link";
// import UserButton from "./UserButton";
// import { Button } from "./ui/button";
// import { getSession } from "@/lib";

// export default async function NavBar() {
//   //const session = await auth();
//   const session = await getSession();
//   const user = session?.user;

//   return (
//     <header className="sticky top-0 bg-background px-3 shadow-sm">
//       <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
//         <Link
//           href="/"
//           className="font-bold"
//         >
//           Next-Auth v5 Tutorial
//         </Link>
//         {user ? <UserButton user={user} /> : <SignInButton />}
//       </nav>
//     </header>
//   );
// }

// function SignInButton() {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signIn();
//       }}
//     >
//       <Button type="submit">Sign in</Button>
//     </form>
//   );
// }

/// server  component instable yet ☝🏻

"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import UserButton from "./UserButton";
import { Button } from "./ui/button";

export default function NavBar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link
          href="/"
          className="font-bold"
        >
          Next-Auth v5 Tutorial
        </Link>
        {user && <UserButton user={user} />}
        {!user && session.status !== "loading" && <SignInButton />}
      </nav>
    </header>
  );
}

function SignInButton() {
  return <Button onClick={() => signIn()}>Sign in</Button>;
}
