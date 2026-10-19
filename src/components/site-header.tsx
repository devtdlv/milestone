import Link from "next/link";

import { getCurrentUser } from "@/lib/session";

import { BrandLink } from "./brand-mark";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <BrandLink
          href="/"
          className="flex items-center gap-2.5 text-xl font-semibold text-ink"
          markClassName="size-7"
        />

        {user ? (
          <nav aria-label="Account" className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              Dashboard
            </Link>

            <form action="/api/auth/logout" method="post">
              <button type="submit" className="tk-btn tk-btn-secondary">
                Log out
              </button>
            </form>
          </nav>
        ) : (
          <nav aria-label="Account" className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              Log in
            </Link>

            <Link href="/signup" className="tk-btn tk-btn-primary">
              Get started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
