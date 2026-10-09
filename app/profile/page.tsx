 "use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/app/lib/auth-client";

export default function ProfilePage() {
const router = useRouter();
const { data: session, isPending } = useSession();

const [name, setName] = useState<string | null>(null);
const [isSaving, setIsSaving] = useState(false);

useEffect(() => {
if (!isPending && !session?.user) {
router.replace("/sign-in");
}
}, [isPending, session, router]);

if (isPending || !session?.user) {
return ( <main className="mx-auto max-w-2xl px-4 py-16"> <div className="animate-pulse space-y-4"> <div className="h-8 w-48 rounded-lg bg-gray-200" /> <div className="h-40 rounded-2xl bg-gray-100" /> </div> </main>
);
}

const currentName = name ?? session.user.name ?? "";

async function handleUpdate(event: FormEvent<HTMLFormElement>) {
event.preventDefault();


const trimmedName = currentName.trim();

if (!trimmedName) {
  toast.error("Please enter your name.");
  return;
}

if (trimmedName === session?.user?.name) {
  toast("Your name is already up to date.");
  return;
}

setIsSaving(true);

try {
  const result = await authClient.updateUser({
    name: trimmedName,
  });

  if (result.error) {
    toast.error(
      result.error.message || "Failed to update your profile."
    );
    return;
  }

  setName(trimmedName);
  toast.success("Profile updated successfully!");
} catch {
  toast.error("Something went wrong. Please try again.");
} finally {
  setIsSaving(false);
}


}

return ( <main className="min-h-[70vh] bg-gray-50 px-4 py-12 sm:py-16"> <div className="mx-auto max-w-2xl"> <Link
       href="/"
       className="text-sm font-medium text-green-700 transition hover:text-green-800"
     >
Back to home </Link>


    <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your personal information.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Full name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={currentName}
            onChange={(event) => setName(event.target.value)}
            required
            maxLength={100}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={session.user.email}
            readOnly
            className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
          />

          <p className="mt-2 text-xs text-gray-500">
            Email editing is not available here.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving || !currentName.trim()}
          className="w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSaving ? "Updating..." : "Update Information"}
        </button>
      </form>
    </section>
  </div>
</main>


);
}
