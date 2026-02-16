import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // ⚠️ Change to your Render URL in production!
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
        },
      },
    }),
  ],
});

// Helper for type inference in components
export const { signIn, signUp, useSession } = authClient;
