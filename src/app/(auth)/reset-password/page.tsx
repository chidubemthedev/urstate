import React, { Suspense } from "react";
import ResetPasswordClient from "./reset-password-client";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
};

export default ResetPasswordPage;
