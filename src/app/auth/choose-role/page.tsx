"use client";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import ShellPage from "@/components/auth/shell";

export default function Onboarding() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Redirect if they already have a role
  useEffect(() => {
    if (!isPending && session?.user.role) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  // 2. The API Call
  const handleSelectRole = async (role: "renter" | "owner") => {
    setLoading(true);
    setError(null);

    try {
      // We use standard fetch here because this is a custom API route, not a Better Auth route
      const response = await fetch("http://localhost:3000/api/user/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Note: Credentials (cookies) are sent automatically by browsers
          // if your CORS is set up correctly with credentials: true
        },
        credentials: "include",
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      // 3. Force a session refresh so the new role appears immediately
      // This is a crucial step!
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (isPending) return <div className="p-10 text-center">Loading...</div>;

  return (
    <ShellPage>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-96 text-center space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">One last step!</h1>
            <p className="mt-2 text-lg text-gray-600">
              How do you plan to use UrState?
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mx-auto max-w-md">
              {error}
            </div>
          )}

          {/* Selection Cards */}
          <div className="flex flex-col gap-6 mt-8">
            {/* Renter Card */}
            <button
              onClick={() => handleSelectRole("renter")}
              disabled={loading}
              className="group relative border border-[#0C2C43] flex flex-col items-center p-8 bg-white rounded-2xl  hover:cursor-pointer hover:bg-input/50 transition-all  disabled:opacity-50"
            >
              <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                I want to Rent
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Find your next dream home.
              </p>
            </button>

            {/* Owner Card */}
            <button
              onClick={() => handleSelectRole("owner")}
              disabled={loading}
              className="group relative border border-[#0C2C43] flex flex-col items-center p-8 bg-white rounded-2xl  hover:cursor-pointer hover:bg-input/50 transition-all  disabled:opacity-50"
            >
              <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.536 9.636a1.003 1.003 0 00-.465-.465l-2.88-1.08a1.003 1.003 0 00-1.076 0l-2.88 1.08a1.003 1.003 0 00-.465.465L2.257 14.743A6 6 0 0110 5.071m0 0v1m0-1c.66 0 1.29.18 1.833.5"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                I am an Owner
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                List your properties and manage tenants.
              </p>
            </button>
          </div>
        </div>
      </div>
    </ShellPage>
  );
}
