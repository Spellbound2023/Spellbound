import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // TODO: logic to retrieve user details from credentials
        const user = {
          username: credentials.username,
          password: credentials.password,
        };
        if (user) {
          return user;
        } else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    // TODO: specify the "pages" option with urls for custom Sign in, Sign up pages
    debug: true,
  },
});

export { handler as GET, handler as POST };

// References:
// https://next-auth.js.org/configuration/options
// https://next-auth.js.org/providers/credentials
