import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prismadb'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim()
        const password = credentials?.password

        if (!email || !password) {
          throw new Error('missingEmailOrPassword')
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user?.password) {
          throw new Error('userNotFound')
        }

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) {
          throw new Error('invalidPassword')
        }

        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user && token?.sub) {
        ;(session.user as { id: string }).id = token.sub
      }

      return session
    },
  },
}
