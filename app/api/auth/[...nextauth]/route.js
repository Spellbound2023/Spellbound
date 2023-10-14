import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkLogin } from "@/utils/authUtils";

const handler = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await checkLogin(credentials);
        if (user) {
          return user;
        } else return null;
      },
    }),
  ],
  pages: {
    signIn: "/authentication/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    debug: true,
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // the user object is what returned from the Credentials login, it has `accessToken` from the server `/login` endpoint
  //     // assign the accessToken to the `token` object, so it will be available on the `session` callback
  //     // console.log("==== JWT cb Token: ", token);
  //     // console.log("==== JWT cb User: ", user);
  //     if (user) {
  //       token.accessToken = user.accessToken;
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     // the token object is what returned from the `jwt` callback, it has the `accessToken` that we assigned before
  //     // Assign the accessToken to the `session` object, so it will be available on our app through `useSession` hooks
  //     // console.log("==== session cb Token: ", token);
  //     // console.log("==== session cb Session: ", session);
  //     if (token) {
  //       session.accessToken = token.accessToken;
  //     }
  //     return session;
  //   },
  // },
});

export { handler as GET, handler as POST };

// References:
// https://next-auth.js.org/configuration/options
// https://next-auth.js.org/providers/credentials
