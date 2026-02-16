import React, { Suspense } from "react";
import VerifyEmailClient from "./verify-email-client";
import ShellPage from "@/components/auth/shell";

export default function VerifyEmailPage() {
  return (
    <ShellPage>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailClient />
      </Suspense>
    </ShellPage>
  );
}
