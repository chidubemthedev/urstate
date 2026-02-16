"use client";
import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        // Call the verifyEmail function from better-auth client
        const { data, error } = await authClient.verifyEmail({
          query: {
            token: token, // Pass the token from the URL
          },
        });

        if (error) {
          console.error("Verification failed", error);
          setStatus("error");
        } else {
          setStatus("success");
          // Optional: Redirect after 3 seconds
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        }
      } catch (err) {
        setStatus("error");
      }
    }

    verify();
  }, [token, router]);

  if (status === "loading") {
    return <div>Verifying your email...</div>;
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-green-600">Email Verified!</h1>
        <p>Redirecting you to the dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
      <p>The link may be invalid or expired.</p>
    </div>
  );
};

export default VerifyEmailPage;
