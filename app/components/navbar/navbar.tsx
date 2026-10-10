 
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";

import { Category } from "@/app/types/bazardor";
import logo from "@/public/assets/logo-icon.png";
import { authClient, useSession } from "@/app/lib/auth-client";

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("You have logged out successfully!");
            setIsOpen(false);
            router.push("/sign-in");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Logout failed.");
          },
        },
      });
    } catch {
      toast.error("Something went wrong while logging out.");
    }
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex min-h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Bazar Dor Logo"
              width={40}
              height={40}
            />

            <div>
              <h1 className="text-xl font-bold text-green-700 sm:text-2xl">
                BazarHub
              </h1>

              <p className="text-xs font-semibold text-gray-500">
                Saturday, October 10, 2026
              </p>
            </div>
          </Link>

          {/* Desktop Auth */}
          <div className="hidden items-center gap-3 sm:flex">
            {isPending ? (
              <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
            ) : session?.user ? (
              <>
                <span className="text-sm font-medium text-gray-700">
                  Hi, {session.user.name}
                </span>

                <Link
                  href="/profile"
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                >
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 sm:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Categories */}
        <div className="hidden border-t border-gray-100 sm:block">
          <div className="flex gap-2 overflow-x-auto py-2">
            {categories.map((category: Category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-700"
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-gray-100 py-4 sm:hidden">
            {/* Mobile Categories */}
            <div className="flex flex-col gap-1">
              {categories.map((category: Category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Auth */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              {isPending ? (
                <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
              ) : session?.user ? (
                <div className="space-y-2">
                  {/* User */}
                  <div className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    Hi, {session.user.name}
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                  >
                    Profile
                  </Link>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-medium text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}