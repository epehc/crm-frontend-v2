import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from 'jsonwebtoken';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
        }),
    ],
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    callbacks:{
        async signIn({user, account}) {

            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL!}/auth/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: account?.providerAccountId,
                        email: user.email,
                        name: user.name,
                        accessToken: account?.id_token,
                    }),
                })

                if (!response.ok) {
                    console.error('Failed to create/update user:', await response.text())
                    return false
                }

                const userData = await response.json()
                user.roles = userData.roles
                user.id = userData.id

                return true
            }
            catch(error){
                console.error("Error during sign-in callback:", error);
                return false; // Deny access if an error occurs
            }
        },

        async jwt({token, user, account}) {
            if (user) {
                console.log('i made it in here')
                const enrichedToken = {
                    ...token,
                    id: user.id,
                    email: user.email,
                    roles: user.roles,
                }

                console.log('enrichedToken:', enrichedToken)
                token.accessToken = jwt.sign(enrichedToken, process.env.NEXT_PUBLIC_JWT_SECRET!, {
                    expiresIn: '1h'
                })

                token.id = user.id
                console.log("Token after jwt signing:", token)
            }

            if(token.id){
                try{
                    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL!}/auth/users/${token.id}`)
                    if(response.ok){
                        const userData = await response.json()
                        token.roles = userData.roles
                    }
                    else{
                        console.error('Failed to fetch user data:', await response.text())
                        return token
                    }
                }
                catch(error){
                    console.error("Error in jwt callback:", error);
                }
            }
            else{
                console.error("No user id found in token")
            }

            return token
        },

        async session({session, token}) {
            console.log('session Callback: ')
            console.log('session: ', session)
            console.log('token: ', token)

            if(token){
                session.user.roles = token.roles || []
                session.accessToken = token.accessToken
                console.log('Session:', session)
            }
            else{
                console.error('Token or user undefined')
            }

            return session
        },


    },
    pages: {
        signIn: '/login',
        error: '/login',
    }
})