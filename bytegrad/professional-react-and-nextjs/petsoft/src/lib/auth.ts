import prisma from "./db"
import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // Runs on every login
        const { email, password } = credentials

        console.log("credentials", credentials)

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) {
          console.log("User not found")
          return null
        }

        console.log("user.password", user.password)
        const passwordsMatch = await bcrypt.compare(password, user.password)

        if (!passwordsMatch) {
          console.log("Bad credentials")
          return null
        }

        return user
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user)
      const isAppAccess = request.nextUrl.pathname.includes("/app")

      if (isAppAccess && !isLoggedIn) return false

      return true
    },
  },
} satisfies NextAuthConfig

export const { auth, signIn } = NextAuth(config)
