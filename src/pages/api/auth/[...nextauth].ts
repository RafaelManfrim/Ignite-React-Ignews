import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

import { fauna } from "../../../services/fauna"
import { query } from "faunadb"

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                  scope: 'read:user'
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const { email } = user
            try {
                await fauna.query(
                    query.If(
                        query.Not(
                            query.Exists(
                                query.Match(
                                    query.Index('user_by_email'),
                                    query.Casefold(email)
                                )
                            )
                        ),
                        query.Create(
                            query.Collection('users'),
                            { data: { email }}
                        ),
                        query.Get(
                            query.Match(
                                query.Index('user_by_email'),
                                query.Casefold(email)
                            )
                        )
                    )
                    
                )
                return true
            } catch {
                return false
            }
        },
    }
})
