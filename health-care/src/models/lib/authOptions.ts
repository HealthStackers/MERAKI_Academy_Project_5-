import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
 import { Login } from "./db/services/users";

//! This used to override the next-auth default types
declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    name: string;
    id: number;
    email: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    id: number | string;
    accessToken: string;
    email: string;
    serverProperty: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        const result = await Login({
          email,
          password,
        });
console.log(result)
        return result;
      },
    }),
  ],

  callbacks: {
    
    async jwt({ token, user , account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.serverProperty = "Server";
        
      }
       if (account) {
        token.accessToken = account.access_token as string;
      }

      return token;
    },
    // async jwt({ token, user, account, profile }) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   if (account) {
    //     token. = account.access_token;
    //   }
    //   return token;
    // },
    async session({ session, token }) {
      //! session: will contains the data that returned either via getServerSession() or via useSession()
      session.user = {
        id: +token.id,
        name: token.name,
        email: token.email,
        accessToken: token.accessToken,
      };

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
   secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;