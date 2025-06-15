// lib/authOptions.ts
import NextAuth, { User,NextAuthOptions  } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/models/lib/db";
import { compare } from "bcryptjs";
import { Jwt } from "jsonwebtoken";
import {loginAdminUser} from "@/models/lib/db/services/adminUsers"

type user={
    id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role_id: number;
}


declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    firstName: string;
    id: number;
    email: string;
    role_id: string;
    accessToken: string;
    password: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firstName: string;
    id: string | number;
    email: string;
    role_id: string;
    accessToken: string;
  }
}



export const authOptions:NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        const result = await loginAdminUser({
          email,
          password
        })
        if(result){
          const user = result;
        if (user && (await compare(password, user.password))) {
          
          return result;
        }
        }
        
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user ) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.role_id = user.role_id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.firstName ,
        email: token.email,
      
      };
      return session;
    },
  },
  pages: {
    signIn: "/adminUser/login",
  },
};

export default NextAuth(authOptions);
